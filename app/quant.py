from app import ma
from app.models import (
    TSData,
    DataSource,
    Settings,
)
from json_manipulations import json_nan_to_none
from shared_functions import fetch_all_data_sources
from calendar import monthrange
from datetime import datetime, timedelta
import numpy as np
import pandas as pd

all_data_sources = fetch_all_data_sources() or DataSource.query.all()
ts_hierarchy = {source.name: source.hierarchy_rank for source in all_data_sources}
default_risk_free_rate_id = Settings.query.filter(Settings.key == "default_risk_free")[
    0
].value

null_stat = {
    "time_window_returns": {
        "mtd_return": None,
        "qtd_return": None,
        "ytd_return": None,
        "one_year_return": None,
        "two_year_return": None,
        "three_year_return": None,
        "four_year_return": None,
        "five_year_return": None,
        "itd_annualized_return": None,
        "itd_annualized_volatility": None,
    },
    "calendar_year_returns": {
        "2020": None,
        "2019": None,
        "2018": None,
        "2017": None,
        "2016": None,
        "2015": None,
        "2014": None,
        "2013": None,
        "2012": None,
        "2011": None,
    },
}


class TSCalc(object):
    def __init__(
            self,
            foid,
            freq_code="M",
            start=None,
            end=None,
            benchmark_foid=None,
            risk_free_rate_id=None,
            roll_window=None,
    ):
        self.has_data = False  # Will be set to true in return in self.generate_time_series if data exists
        self.has_benchmark_data = False
        self.foid = foid
        self.freq_code = freq_code
        # self.start and self.end will be set by generate_time_series function if not set here
        self.start: datetime = datetime.fromisoformat(start) if start else None
        self.end: datetime = datetime.fromisoformat(end) if end else None
        self.benchmark_foid = benchmark_foid
        self.risk_free_rate_foid = (
                risk_free_rate_id or default_risk_free_rate_id or None
        )

        self.periodicity = self.set_periodicity()
        self.roll_window = roll_window or 3 * self.periodicity

        self.level, self.ts, self.cumulative = self.generate_time_series(self.foid)

        self.cumulative_x = [x.date().isoformat() for x in self.cumulative.index]
        self.ts_y = [x for x in self.ts.fillna(0)]
        self.cumulative_y = [x for x in self.cumulative]
        self.rf_ts = self.generate_time_series(self.risk_free_rate_foid)[1]
        self.roll_stat = self.generate_rolling_statistics(
            self.ts, self.rf_ts, self.roll_window
        )
        self.absolute_statistics = self.generate_statistics(self.ts, self.cumulative)

        if self.benchmark_foid:
            self.bm_level, self.bm_ts, self.bm_cumulative = self.generate_time_series(
                self.benchmark_foid
            )
            self.bm_cumulative_x = [
                x.date().isoformat() for x in self.bm_cumulative.index
            ]
            self.bm_ts_y = [x for x in self.bm_ts.fillna(0)]
            self.bm_cumulative_y = [x for x in self.bm_cumulative]
            self.benchmark_statistics = self.generate_statistics(
                self.bm_ts, self.bm_cumulative
            )
        else:
            self.benchmark_statistics = null_stat
        if self.has_benchmark_data:
            self.rel_ts = self.generate_benchmark_relative_ts()
            self.rel_cumulative = self.compute_cumulative_return(self.rel_ts)
            self.relative_statistics = self.generate_relative_statistics()
            self.bm_roll_stat = self.generate_rolling_statistics(
                self.bm_ts, self.rf_ts, self.roll_window
            )
        else:
            self.relative_statistics = null_stat

    def set_periodicity(self):
        if self.freq_code == "A":
            return 1
        elif self.freq_code == "Q":
            return 4
        elif self.freq_code == "M":
            return 12
        elif self.freq_code == "D":
            return 365

    def generate_benchmark_relative_ts(self):
        df = pd.concat([self.ts, self.bm_ts], axis=1)
        df["relative"] = df.apply(lambda x: x[0] - x[1], axis=1)
        return df["relative"]

    def generate_time_series(self, foid):
        """return a time series of levels of ts data (appropriate for graphing economic indicators and growth of a
        dollar return charts"""
        all_tsi_fo = TSData.query.filter(TSData.foid == foid)
        df = pd.read_sql(all_tsi_fo.statement, all_tsi_fo.session.bind)

        # must only run on initial foid run, not for supplementary (e.g. benchmark time series)
        if df.empty and foid == self.foid:
            self.end = datetime.now()
            self.start = datetime.now()
            return (df, df, df)

        if foid == self.foid:
            self.has_data = True
        elif foid == self.benchmark_foid:
            self.has_benchmark_data = True

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

        cumulative = (
            self.compute_cumulative_return(returns["returns"][self.start: self.end])
                .resample(self.freq_code)
                .ffill()
        )
        return df["level"], returns["returns"][self.start: self.end], cumulative

    def generate_statistics(self, ts, cumulative):
        statistics = {
            "time_window_returns": {
                "mtd_return": (
                                      cumulative[-1]
                                      / cumulative[
                                          cumulative.index.get_loc(
                                              self.find_previous_month_end(cumulative.index.max())
                                                  .date()
                                                  .isoformat(),
                                              "backfill",
                                          )
                                      ]
                              )
                              - 1
                if self.has_data
                else None,
                "qtd_return": (
                                      cumulative[-1]
                                      / cumulative[
                                          cumulative.index.get_loc(
                                              self.find_previous_quarter_end(cumulative.index.max())
                                                  .date()
                                                  .isoformat(),
                                          )
                                      ]
                              )
                              - 1
                if self.has_data
                else None,
                "ytd_return": (
                    cumulative[-1]
                    / cumulative[
                        cumulative.index.get_loc(
                            self.find_previous_year_end(cumulative.index.max())
                                .date()
                                .isoformat(),
                            "backfill",
                        )
                    ]
                    - 1
                    if self.has_data
                    else None
                ),
                "one_year_return": self.calculate_geometric_annualized_return(
                    begin=datetime(self.end.year - 1, self.end.month, self.end.day),
                    through=self.end,
                    cumulative=cumulative,
                )
                if self.has_data
                else None,
                "two_year_return": self.calculate_geometric_annualized_return(
                    begin=datetime(self.end.year - 2, self.end.month, self.end.day),
                    through=self.end,
                    cumulative=cumulative,
                )
                if self.has_data
                else None,
                "three_year_return": self.calculate_geometric_annualized_return(
                    begin=datetime(self.end.year - 3, self.end.month, self.end.day),
                    through=self.end,
                    cumulative=cumulative,
                )
                if self.has_data
                else None,
                "four_year_return": self.calculate_geometric_annualized_return(
                    begin=datetime(self.end.year - 4, self.end.month, self.end.day),
                    through=self.end,
                    cumulative=cumulative,
                )
                if self.has_data
                else None,
                "five_year_return": self.calculate_geometric_annualized_return(
                    begin=datetime(self.end.year - 5, self.end.month, self.end.day),
                    through=self.end,
                    cumulative=cumulative,
                )
                if self.has_data
                else None,
                "itd_annualized_return": self.calculate_geometric_annualized_return(
                    begin=self.start, through=self.end, cumulative=cumulative
                )
                if self.has_data
                else None,
                "itd_annualized_volatility": ts.std() * np.sqrt(self.periodicity)
                if self.has_data
                else None,
            },
            "calendar_year_returns": {
                self.end.year: (
                        (
                                cumulative.loc[cumulative.index.max()]
                                / cumulative.iloc[
                                    cumulative.index.get_loc(
                                        datetime(self.end.year - 1, 12, 31).date().isoformat(),
                                        "backfill",
                                    )
                                ]
                        )
                        - 1
                )
                if self.has_data
                else None,
                self.end.year
                - 1: self.calculate_calendar_year_return(self.end.year - 1, cumulative)
                if self.has_data
                else None,
                self.end.year
                - 2: self.calculate_calendar_year_return(self.end.year - 2, cumulative)
                if self.has_data
                else None,
                self.end.year
                - 3: self.calculate_calendar_year_return(self.end.year - 3, cumulative)
                if self.has_data
                else None,
                self.end.year
                - 4: self.calculate_calendar_year_return(self.end.year - 4, cumulative)
                if self.has_data
                else None,
                self.end.year
                - 5: self.calculate_calendar_year_return(self.end.year - 5, cumulative)
                if self.has_data
                else None,
                self.end.year
                - 6: self.calculate_calendar_year_return(self.end.year - 6, cumulative)
                if self.has_data
                else None,
                self.end.year
                - 7: self.calculate_calendar_year_return(self.end.year - 7, cumulative)
                if self.has_data
                else None,
                self.end.year
                - 8: self.calculate_calendar_year_return(self.end.year - 8, cumulative)
                if self.has_data
                else None,
                self.end.year
                - 9: self.calculate_calendar_year_return(self.end.year - 9, cumulative)
                if self.has_data
                else None,
            },
        }
        return statistics

    def generate_relative_statistics(self):
        if not self.has_benchmark_data or not self.has_data:
            return null_stat

        statistics = {
            "time_window_returns": {
                k: self.absolute_statistics["time_window_returns"][k] -
                   self.benchmark_statistics["time_window_returns"][k] for k in
                self.absolute_statistics["time_window_returns"]
            },
            "calendar_year_returns": {
                k: self.absolute_statistics["calendar_year_returns"][k] -
                   self.benchmark_statistics["calendar_year_returns"][k] for k in
                self.absolute_statistics["calendar_year_returns"]
            }
        }
        return statistics

    def generate_rolling_statistics(self, ts, rf_ts, roll_window):
        rolling_vol = self.calculate_rolling_annualized_volatility(ts, roll_window)
        rolling_sharpe = self.calculate_rolling_sharpe_ratio(ts, rf_ts, roll_window)
        roll_dict = {
            "rolling_vol_x": [x.date().isoformat() for x in rolling_vol.index],
            "rolling_vol_y": [x for x in rolling_vol],
            "rolling_sharpe_x": [x.date().isoformat() for x in rolling_sharpe.index],
            "rolling_sharpe_y": [x for x in rolling_sharpe],
        }
        return json_nan_to_none(roll_dict)

    @staticmethod
    def find_previous_month_end(dt: datetime):
        return datetime(dt.year, dt.month, 1) - timedelta(days=1)

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

    def calculate_annualized_return(self, years: int, cumulative):
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
                cumulative[self.end.date().isoformat()] / cumulative[indexable_denominator]
        )
        return ret ** (365 / (365 * years)) - 1

    def calculate_geometric_annualized_return(self, begin, through, cumulative):
        begin_iso = begin.date().isoformat()
        # item at index for begin is outside of calculation range for this method, must instead take next item in index
        begin_iloc_value = cumulative.index.get_loc(begin_iso, "backfill")
        through_iso = through.date().isoformat()
        return (cumulative.loc[through_iso] / cumulative.iloc[begin_iloc_value]) ** (
                self.periodicity / (len(cumulative[begin_iso:through_iso]) - 1)
        ) - 1

    @staticmethod
    def calculate_calendar_year_return(year: int, cumulative):
        return (
                   cumulative.loc[datetime(year, 12, 31).date().isoformat()]
                   if datetime(year, 12, 31).date().isoformat() in cumulative.index
                   else np.nan
               ) / (
                   cumulative.loc[datetime(year - 1, 12, 31).date().isoformat()]
                   if datetime(year - 1, 12, 31).date().isoformat() in cumulative.index
                   else np.nan
               ) - 1

    def calculate_rolling_annualized_volatility(self, ts, lookback_window):
        ts.dropna(inplace=True)
        return (
            ts.rolling(lookback_window)
                .std()
                .apply(lambda x: x * np.sqrt(self.periodicity))
                .dropna()
        )

    def calculate_rolling_sharpe_ratio(
            self, asset_ts, risk_free_rate_ts, lookback_window
    ):
        """Implementation note:  this approach reports the modern excess sharpe approach,
        where the time series is net of risk free rate in the denominator
        as well as the numerator
        (William Sharpe's original implementation uses absolute returns in denominator)
        """
        df = pd.concat([asset_ts, risk_free_rate_ts], axis=1)
        df["excess"] = df.apply(lambda x: x[0] - x[1], axis=1)
        roll = df["excess"].rolling(lookback_window)
        return (np.sqrt(self.periodicity) * roll.mean() / roll.std()).dropna()


class TSCalcSchema(ma.Schema):
    """Serialize calculations for a time series"""

    class Meta:
        fields = (
            "foid",
            "roll_window",
            "absolute_statistics",
            "benchmark_statistics",
            "relative_statistics",
            "cumulative_x",
            "roll_stat",
            "ts_y",
            "cumulative_y",
            "bm_ts_y",
            "bm_cumulative_x",
            "bm_cumulative_y",
            "bm_roll_stat",
        )
