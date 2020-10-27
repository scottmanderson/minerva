from app import app, db
from app.models import TSData, DataSource, DataSourcePoll
from config import basedir

from datetime import datetime
import json
import numpy as np
import pandas as pd
import pandas_datareader as pdr


auto_update_ts_file = open(basedir + '/auto_update_ts.json')
auto_update_ts = json.loads(auto_update_ts_file.read())

all_data_sources = DataSource.query.all()
all_data_source_polls = DataSourcePoll.query.all()
api_keys = {source.name: source.api_key for source in all_data_sources}
ts_hierarchy = {source.name: source.hierarchy_rank for source in all_data_sources}


class TSHierarchy(object):
    """Creates a ranking of different data providers to resolve conflicts"""
    pass


class TSExtraction(object):

    def __init__(self, foid, ticker, start=datetime(1920, 12, 31), end=datetime.now()):
        self.foid = foid
        self.ticker = ticker
        self.start = start
        self.end = end

    def ts_update(self, new_ts, source_code):
        query_before = TSData.query.filter(TSData.foid == self.foid)
        before = pd.read_sql(query_before.statement, query_before.session.bind)
        new_ts['foid'] = self.foid
        new_ts['source'] = source_code
        new_ts.index.name = 'dt'
        new_ts.reset_index(inplace=True)

        for row in new_ts.iterrows():
            tsi = TSData()

            tsi.dt = row[1]['dt']
            tsi.foid = row[1]['foid']
            tsi.level = row[1]['value']
            tsi.source = row[1]['source']

            #if ((before['foid'] == tsi.foid) & (before['dt'] == tsi.dt) & (before['source'] == tsi.source)).any():
            #    db.session.commit()
            #else:
            #    db.session.add(tsi)
            #    db.session.commit()

            if before\
                    [before['foid'] == tsi.foid]\
                    [before['dt'] == tsi.dt]\
                    [before['source'] == tsi.source].empty:
                db.session.add(tsi)
                db.session.commit()
            else:
                db.session.commit()

    def update_av_daily_data(self, api_key=api_keys['av-daily-adjusted']):
        av_code = self.ticker  # TODO: Add lookup for unorthodox references
        source_code = 'av-daily-adjusted'
        try:
            new_data = pdr.DataReader(av_code, source_code, start=self.start, end=self.end, api_key=api_key)
        except Exception:
            print("alphavantage api call failed; check internet connection")
            new_data = None
        new_data = pd.DataFrame(new_data['adjusted close'])
        new_data.columns = ['value']
        self.ts_update(new_data, source_code)

    def update_fred(self):
        fred_code = self.ticker # TODO: expand to support divergent ticker names
        source_code = 'fred'
        try:
            new_data = pdr.DataReader(fred_code, source_code, start=self.start, end=self.end)
        except Exception:
            print("FRED api call failed, check internet connection")
            new_data = None
        new_data.columns = ['value']
        self.ts_update(new_data, source_code)


class TSAutoUpdater:
    @staticmethod
    def add_symbol(foid, code, source):
        if source not in auto_update_ts:
            auto_update_ts[source] = []
        auto_update_ts[source].append({
            "foid": int(foid),
            "code": code}
        )
        with open(basedir + '/auto_update_ts.json', 'w') as outfile:
            json.dump(auto_update_ts, outfile)

    @staticmethod
    def update_all():
        # av-daily-adjusted
        for fo in auto_update_ts['av-daily-adjusted']:
            TSExtraction(fo['foid'], fo['code']).update_av_daily_data()
        # fred
        for fo in auto_update_ts['fred']:
            TSExtraction(fo['foid'], fo['code']).update_fred()


if __name__ == '__main__':
    TSAutoUpdater.update_all()
