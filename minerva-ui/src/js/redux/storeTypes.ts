export interface IFinObj {
  foid: number | string;
  name: string;
  report_name: string;
  ticker: string;
  benchmark?: number;
}

export interface ICalendarYearReturns {
  [key: string]: number | string | null;
}

export interface ITimeWindowReturns {
  [key: string]: number | string | null;
}

export interface ISubStatistics {
  time_window_returns: ITimeWindowReturns;
  calendar_year_returns: ICalendarYearReturns;
}

export interface IRollStat {
  rolling_vol_x: string[];
  rolling_vol_y: (number | null)[];
  rolling_sharpe_x?: string[];
  rolling_sharpe_y?: (number | null)[];
}

export interface IStatistics {
  foid: string;
  absolute_statistics: ISubStatistics;
  benchmark_statistics: ISubStatistics;
  relative_statistics: ISubStatistics;
  roll_stat?: IRollStat;
  cumulative_x: string[];
  cumulative_y: number[];
  ts_y: number[];
  bm_cumulative_x?: string[];
  bm_cumulative_y?: number[];
  bm_roll_stat?: IRollStat;
}

export interface IDataSource {
  source_id: number;
  name: string;
  hierarchy_rank: number;
  api_key?: string;
}

export interface IDataSourcePoll {
  ds_poll_id: number;
  data_source_code: string;
}

export interface ISetting {
  setting_id: number;
  key: string;
  value: string;
}

export interface ITSData {
  dt: string;
  source: string;
  level: number;
  tsid: number;
}

export interface IState {
  finObjs: IFinObj[];
  activeFinObj: IFinObj;
  statistics: IStatistics;
  dataSources: IDataSource[];
  dataSourcePolls: IDataSourcePoll[];
  settings: ISetting[];
  tsDataActiveFinObj?: ITSData[];
}
