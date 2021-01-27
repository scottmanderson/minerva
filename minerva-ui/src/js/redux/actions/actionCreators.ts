import {
  DATA_SOURCE_POLLS_REQUESTED,
  DATA_SOURCES_REQUESTED,
  FIN_OBJS_REQUESTED,
  IDataSourcePollsRequested,
  IDataSourcesRequested,
  IFinObjsRequested,
  ISettingsRequested,
  IStatisticsRequested,
  ITSDataRequested,
  SET_ACTIVE_FINANCIAL_OBJECT,
  SETTINGS_REQUESTED,
  STATISTICS_REQUESTED,
  TS_DATA_REQUESTED,
} from "./action-types";
import { IFinObj } from "../storeTypes";

const apiRoot = process.env.API_ROOT;

export function getFinObjs(): IFinObjsRequested {
  return { type: FIN_OBJS_REQUESTED };
}

export function getDataSources(): IDataSourcesRequested {
  return { type: DATA_SOURCES_REQUESTED };
}

export function getDataSourcePolls(): IDataSourcePollsRequested {
  return { type: DATA_SOURCE_POLLS_REQUESTED };
}

export function getSettings(): ISettingsRequested {
  return { type: SETTINGS_REQUESTED };
}

export function getStatistics(
  foid: number,
  freq_code?: string,
  start?: string,
  end?: string,
  benchmark_foid?: number
): IStatisticsRequested {
  return {
    type: STATISTICS_REQUESTED,
    foid: foid,
    freq_code: freq_code || null,
    start: start || null,
    end: end || null,
    benchmark_foid: benchmark_foid || null,
  };
}

export function getTSData(foid: number): ITSDataRequested {
  return {
    type: TS_DATA_REQUESTED,
    foid: foid,
  };
}

export function setActiveFinObj(fo: IFinObj) {
  return {
    type: SET_ACTIVE_FINANCIAL_OBJECT,
    payload: { activeFinObj: fo },
  };
}
