from app import app, db, ma
from app.models import (
    FinancialObject,
    FinancialObjectSchema,
    TSData,
    TSDataSchema,
    DataSource,
    DataSourcePoll,
)
from shared_functions import fetch_all_data_sources
from bokeh.embed import json_item
from bokeh.io import output_file
from bokeh.models import ColumnDataSource, LinearAxis, Range1d
from bokeh.plotting import figure, show
from config import basedir
from calendar import leapdays, monthrange
from datetime import datetime, timedelta
import flask
import json
import numpy as np
import pandas as pd


all_data_sources = fetch_all_data_sources()
ts_hierarchy = {source.name: source.hierarchy_rank for source in all_data_sources}


class TSCalc(object):
    def __init__(
        self,
        foid,
        freq_code="M",
        start=None,
        end=None,
        benchmark=None,
        div_id_target=None,
    ):
        self.foid = foid
        self.freq_code = freq_code
        # self.start and self.end will be set by generate_time_series function if not set here
        self.start: datetime = datetime.fromisoformat(start) if start else None
        self.end: datetime = datetime.fromisoformat(end) if end else None
        self.benchmark = benchmark

        # div_id_target is a stub for mounting bokeh charts on the client side
        self.div_id_target = None

        self.periodicity = None
        if self.freq_code == "A":
            self.periodicity = 1
        elif self.freq_code == "Q":
            self.periodicity = 4
        elif self.freq_code == "M":
            self.periodicity = 12
        elif self.freq_code == "D":
            self.periodicity = 365

        self.level, self.ts = self.generate_time_series()
        self.cumulative: pd.DataFrame = (
            self.compute_cumulative_return(self.ts).resample(self.freq_code).ffill()
        )

        self.calculate()

    def generate_time_series(self):
        """return a time series of levels of ts data (appropriate for graphing economic indicators and growth of a
        dollar return charts"""
        all_tsi_fo = TSData.query.filter(TSData.foid == self.foid)
        df = pd.read_sql(all_tsi_fo.statement, all_tsi_fo.session.bind)

        sources = set([source for source in df["source"]])
        df["rank"] = df.apply(lambda x: ts_hierarchy[x["source"]], axis=1)

        if len(sources) > 1:
            df["best"] = df.groupby("dt")["rank"].transform(lambda x: x.min())
        else:
            df["best"] = df["rank"]

        returns = (
            df.pivot(index="dt", columns="rank", values="level")
            .resample(self.freq_code)
            .ffill()
            .pct_change()
            .reset_index()
            .melt(id_vars="dt")
        )

        if len(sources) > 1:
            returns["best"] = returns.groupby("dt")["rank"].transform(lambda x: x.min())
        else:
            returns["best"] = returns["rank"]
        returns = returns[returns["rank"] == returns["best"]]
        returns.set_index("dt", inplace=True)
        returns.drop(["rank", "best"], axis=1, inplace=True)
        returns.columns = ["returns"]

        df = df[df["rank"] == df["best"]]
        df.set_index("dt", inplace=True)
        if returns.index.max() > df.index.max():
            returns.drop(returns.tail(1).index, inplace=True)

        if not self.start:
            self.start = returns.index.min()
        if not self.end:
            self.end = returns.index.max()

        df.dropna()

        return (
            df["level"],
            returns["returns"][self.start : self.end],
        )

    def calculate(self):
        self.mtd_return = self.ts[self.ts.index.max()]
        self.qtd_return = (
            np.product(
                self.ts[
                    (
                        self.find_previous_quarter_end(self.end) + timedelta(days=1)
                    ) : self.end
                ].apply(lambda x: x + 1)
            )
            - 1
        )
        self.ytd_return = (
            np.product(
                self.ts[
                    (
                        self.find_previous_year_end(self.end) + timedelta(days=1)
                    ) : self.end
                ].apply(lambda x: x + 1)
            )
            - 1
        )
        # must compensate for leap years, handled below by constructing a datetime
        self.one_year_return = self.calculate_geometric_annualized_return(
            begin=datetime(self.end.year - 1, self.end.month, self.end.day),
            through=self.end,
        )
        self.two_year_return = self.calculate_geometric_annualized_return(
            begin=datetime(self.end.year - 2, self.end.month, self.end.day),
            through=self.end,
        )
        self.three_year_return = self.calculate_geometric_annualized_return(
            begin=datetime(self.end.year - 3, self.end.month, self.end.day),
            through=self.end,
        )
        self.four_year_return = self.calculate_geometric_annualized_return(
            begin=datetime(self.end.year - 4, self.end.month, self.end.day),
            through=self.end,
        )
        self.five_year_return = self.calculate_geometric_annualized_return(
            begin=datetime(self.end.year - 5, self.end.month, self.end.day),
            through=self.end,
        )
        self.itd_annualized_return = self.calculate_geometric_annualized_return(
            begin=self.start, through=self.end
        )
        # Here begins time window returns (default ITD)
        self.itd_annualized_volatility = self.ts.std() * np.sqrt(self.periodicity)
        self.calendar_year_returns = {
            self.end.year: self.cumulative.loc[self.cumulative.index.max()]
            / self.cumulative.loc[
                datetime(self.end.year - 1, 12, 31).date().isoformat()
            ]
            - 1,
            self.end.year - 1: self.calculate_calendar_year_return(self.end.year - 1),
            self.end.year - 2: self.calculate_calendar_year_return(self.end.year - 2),
            self.end.year - 3: self.calculate_calendar_year_return(self.end.year - 3),
            self.end.year - 4: self.calculate_calendar_year_return(self.end.year - 4),
            self.end.year - 5: self.calculate_calendar_year_return(self.end.year - 5),
            self.end.year - 6: self.calculate_calendar_year_return(self.end.year - 6),
            self.end.year - 7: self.calculate_calendar_year_return(self.end.year - 7),
            self.end.year - 8: self.calculate_calendar_year_return(self.end.year - 8),
            self.end.year - 9: self.calculate_calendar_year_return(self.end.year - 9),
            self.end.year - 10: self.calculate_calendar_year_return(self.end.year - 10),
        }
        # self.bokeh_ts_level_plot = self.generate_bokeh_ts_level_plot()
        # self.bokeh_return_plot = self.generate_bokeh_return_plot()

    @staticmethod
    def find_previous_quarter_end(dt: datetime):
        if dt.month < 3:
            return datetime(dt.year - 1, 12, 31)
        elif dt.month < 6:
            return datetime(dt.year, 3, 31)
        elif dt.month < 9:
            return datetime(dt.year, 6, 30)
        else:
            return datetime(dt.year, 9, 30)

    @staticmethod
    def find_previous_year_end(dt: datetime):
        return datetime(dt.year - 1, 12, 31)

    @staticmethod
    def compute_cumulative_return(ts):
        """Makes cumulative return timeseries from returns; expects a NaN at beginning, countermeasures pending"""
        cumulative = ts.apply(lambda x: x + 1)
        cumulative.iloc[0] = 1
        cumulative = cumulative.cumprod()
        return cumulative

    def calculate_annualized_return(self, years: int):
        indexable_denominator = (
            self.end.replace(
                self.end.year - years,
                self.end.month,
                monthrange(self.end.year - years, self.end.month)[1],
            )
            .date()
            .isoformat()
        )
        ret = (
            self.cumulative[self.end.date().isoformat()]
            / self.cumulative[indexable_denominator]
        )
        return ret ** (365 / (365 * years)) - 1

    def calculate_geometric_annualized_return(self, begin, through):
        begin_iso = (begin + timedelta(days=1)).date().isoformat()
        # item at index for begin is outside of calculation range for this method, must instead take next item in index
        begin_iloc_value = self.cumulative.index.get_loc(begin_iso, "backfill")
        through_iso = through.date().isoformat()
        print(
            f"begin={begin_iso} through={through_iso}  periodicity={self.periodicity}  len={len(self.cumulative[begin_iso:through_iso])}"
        )
        return (
            self.cumulative.loc[through_iso] / self.cumulative.iloc[begin_iloc_value]
        ) ** (self.periodicity / len(self.cumulative[begin_iso:through_iso])) - 1

    def calculate_calendar_year_return(self, year: int):
        return (
            self.cumulative.loc[datetime(year, 12, 31).date().isoformat()]
            / self.cumulative.loc[datetime(year - 1, 12, 31).date().isoformat()]
            - 1
        )

    def generate_bokeh_ts_level_plot(self):
        p = figure(x_axis_type="datetime")
        p.line(self.level.index.values, self.level.values)

    def generate_bokeh_return_plot(self):
        p = figure(x_axis_type="datetime")
        p.line(self.cumulative.index.values, self.cumulative.values)
        p.extra_y_ranges = {"returns": Range1d()}
        p.add_layout(
            LinearAxis(
                y_range_name="returns",
            ),
            "right",
        )
        p.vbar(
            x=self.ts.dropna().index.values,
            top=self.ts.dropna().values,
            width=1,
            y_range_name="returns",
        )
        return json_item(p, "bokehReturnPlot")


class TSCalcSchema(ma.Schema):
    """Serialize calculations for a time series"""

    class Meta:
        fields = (
            "foid",
            "mtd_return",
            "qtd_return",
            "ytd_return",
            "one_year_return",
            "two_year_return",
            "three_year_return",
            "four_year_return",
            "five_year_return",
            "calendar_year_returns",
            "itd_annualized_return",
            "itd_annualized_volatility",
        )
