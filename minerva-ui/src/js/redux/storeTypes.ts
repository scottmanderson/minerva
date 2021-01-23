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
  mtd_return: number | string | null;
  qtd_return: number | string | null;
  ytd_return: number | string | null;
  one_year_return: number | string | null;
  two_year_return: number | string | null;
  three_year_return: number | string | null;
  four_year_return: number | string | null;
  five_year_return: number | string | null;
  itd_annualized_return: number | string | null;
  itd_annualized_volatility: number | string | null;
}

export interface ISubStatistics {
  time_window_returns: ITimeWindowReturns;
  calendar_year_returns: ICalendarYearReturns;
}

export interface IStatistics {
  foid: string;
  absolute_statistics: ISubStatistics;
  benchmark_statistics: ISubStatistics;
  relative_statistics: ISubStatistics;
  cumulative_x: string[];
  cumulative_y: number[];
  ts_y: number[];
  bm_cumulative_x?: string[];
  bm_cumulative_y?: number[];
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

export interface IState {
  finObjs: IFinObj[];
  activeFinObj: IFinObj;
  activeBenchmarkDefaultFinObj: IFinObj;
  statistics: IStatistics;
  dataSources: IDataSource[];
  dataSourcePolls: IDataSourcePoll[];
  settings: ISetting[];
}
