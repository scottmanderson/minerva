from app import app, db
from app.models import TSData, DataSource, DataSourcePoll
from config import basedir
from shared_functions import fetch_all_data_sources, fetch_all_data_source_polls

from datetime import datetime
import json
import numpy as np
import pandas as pd
import pandas_datareader as pdr


auto_update_ts_file = open(basedir + "/auto_update_ts.json")
auto_update_ts_old = json.loads(auto_update_ts_file.read())

all_data_sources = fetch_all_data_sources()
ds_lookup = {ds.source_id: ds.name for ds in all_data_sources}
api_keys = {source.name: source.api_key for source in all_data_sources}
ts_hierarchy = {source.name: source.hierarchy_rank for source in all_data_sources}

all_data_source_polls = fetch_all_data_source_polls()
auto_update_ts = {k: [] for k in ds_lookup.values()}
for dsp in all_data_source_polls:
    auto_update_ts[ds_lookup[dsp.source_id]].append(
        {"foid": dsp.foid, "code": dsp.data_source_code}
    )


class TSExtraction(object):
    def __init__(self, foid, ticker, start=datetime(1920, 12, 31), end=datetime.now()):
        self.foid = foid
        self.ticker = ticker
        self.start = start
        self.end = end

    def ts_update(self, new_ts, source_code):
        query_before = TSData.query.filter(TSData.foid == self.foid)
        before = pd.read_sql(query_before.statement, query_before.session.bind)
        new_ts["foid"] = self.foid
        new_ts["source"] = source_code
        new_ts.index.name = "dt"
        new_ts.reset_index(inplace=True)

        for row in new_ts.iterrows():
            tsi = TSData()

            tsi.dt = row[1]["dt"]
            tsi.foid = row[1]["foid"]
            tsi.level = row[1]["value"]
            tsi.source = row[1]["source"]

            if before.loc[
                (before["foid"] == tsi.foid)
                & (before["dt"] == tsi.dt)
                & (before["source"] == tsi.source)
            ].empty:
                db.session.add(tsi)
                db.session.commit()
            else:
                db.session.commit()

    def update_av_daily_data(self, api_key=api_keys["av-daily-adjusted"]):
        av_code = self.ticker
        source_code = "av-daily-adjusted"
        try:
            new_data = pdr.DataReader(
                av_code, source_code, start=self.start, end=self.end, api_key=api_key
            )
        except Exception:
            print("alphavantage api call failed; check internet connection")
            new_data = None
        new_data = pd.DataFrame(new_data["adjusted close"])
        new_data.columns = ["value"]
        self.ts_update(new_data, source_code)

    def update_fred(self):
        fred_code = self.ticker
        source_code = "fred"
        try:
            new_data = pdr.DataReader(
                fred_code, source_code, start=self.start, end=self.end
            )
        except Exception:
            print("FRED api call failed, check internet connection")
            new_data = None
        new_data.columns = ["value"]
        self.ts_update(new_data, source_code)


class TSAutoUpdater:
    @staticmethod
    def add_symbol(foid, code, source):
        if source not in auto_update_ts:
            auto_update_ts[source] = []
        auto_update_ts[source].append({"foid": int(foid), "code": code})
        with open(basedir + "/auto_update_ts.json", "w") as outfile:
            json.dump(auto_update_ts, outfile)

    @staticmethod
    def update_all():
        # av-daily-adjusted
        for fo in auto_update_ts["av-daily-adjusted"]:
            TSExtraction(fo["foid"], fo["code"]).update_av_daily_data()
        # fred
        for fo in auto_update_ts["fred"]:
            TSExtraction(fo["foid"], fo["code"]).update_fred()


if __name__ == "__main__":
    TSAutoUpdater.update_all()
