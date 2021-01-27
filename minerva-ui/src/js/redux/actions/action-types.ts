import {
  IDataSource,
  IDataSourcePoll,
  IFinObj,
  ISetting,
  IStatistics,
} from "../storeTypes";

export const FIN_OBJS_REQUESTED = "FIN_OBJS_REQUESTED";
export interface IFinObjsRequested {
  type: typeof FIN_OBJS_REQUESTED;
}
export const FIN_OBJS_LOADED = "FIN_OBJS_LOADED";
export interface IFinObjsLoaded {
  type: typeof FIN_OBJS_LOADED;
  payload: IFinObj[];
}

export const DATA_SOURCES_REQUESTED = "DATA_SOURCES_REQUESTED";
export interface IDataSourcesRequested {
  type: typeof DATA_SOURCES_REQUESTED;
}
export const DATA_SOURCES_LOADED = "DATA_SOURCES_LOADED";
export interface IDataSourcesLoaded {
  type: typeof DATA_SOURCES_LOADED;
  payload: IDataSource[];
}

export const DATA_SOURCE_POLLS_REQUESTED = "DATA_SOURCE_POLLS_REQUESTED";
export interface IDataSourcePollsRequested {
  type: typeof DATA_SOURCE_POLLS_REQUESTED;
}
export const DATA_SOURCE_POLLS_LOADED = "DATA_SOURCE_POLLS_LOADED";
export interface IDataSourcePollsLoaded {
  type: typeof DATA_SOURCE_POLLS_LOADED;
  payload: IDataSourcePoll[];
}

export const SETTINGS_REQUESTED = "SETTINGS_REQUESTED";
export interface ISettingsRequested {
  type: typeof SETTINGS_REQUESTED;
}
export const SETTINGS_LOADED = "SETTINGS_LOADED";
export interface ISettingsLoaded {
  type: typeof SETTINGS_LOADED;
  payload: ISetting[];
}

export const STATISTICS_REQUESTED = "STATISTICS_REQUESTED";
export interface IStatisticsRequested {
  type: typeof STATISTICS_REQUESTED;
  foid: number | null;
  freq_code: string | null;
  start: string | null;
  end: string | null;
  benchmark_foid: number | null;
}
export const STATISTICS_LOADED = "STATISTICS_LOADED";
export interface IStatisticsLoaded {
  type: typeof STATISTICS_LOADED;
  payload: IStatistics;
}

export const SET_ACTIVE_FINANCIAL_OBJECT = "SET_ACTIVE_FINANCIAL_OBJECT";
export interface ISetActiveFinancialObject {
  type: typeof SET_ACTIVE_FINANCIAL_OBJECT;
  payload: {
    activeFinObj: IFinObj;
  };
}

export const API_ERRORED = "API_ERRORED";
export interface IApiErrored {
  type: typeof API_ERRORED;
  payload: any;
}

export type ActionTypesMain =
  | IFinObjsRequested
  | IFinObjsLoaded
  | IDataSourcesRequested
  | IDataSourcesLoaded
  | IDataSourcePollsRequested
  | IDataSourcePollsLoaded
  | ISettingsRequested
  | ISettingsLoaded
  | IStatisticsRequested
  | IStatisticsLoaded
  | ISetActiveFinancialObject
  | IApiErrored;
