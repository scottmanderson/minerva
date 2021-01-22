import {
  FIN_OBJS_REQUESTED,
  STATISTICS_REQUESTED,
  SET_ACTIVE_FINANCIAL_OBJECT,
  SET_ACTIVE_BENCHMARK_DEFAULT_FINANCIAL_OBJECT,
  DATA_SOURCES_REQUESTED,
  DATA_SOURCE_POLLS_REQUESTED,
  SETTINGS_REQUESTED,
  IFinObjsRequested,
  IDataSourcesRequested,
  IDataSourcePollsRequested,
  ISettingsRequested,
  IStatisticsRequested,
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
  foid = null,
  freq_code = null,
  start = null,
  end = null,
  benchmark_foid = null
): IStatisticsRequested {
  return {
    type: STATISTICS_REQUESTED,
    foid: foid,
    freq_code: freq_code,
    start: start,
    end: end,
    benchmark_foid: benchmark_foid,
  };
}

export function setActiveFinObj(fo: IFinObj) {
  return {
    type: SET_ACTIVE_FINANCIAL_OBJECT,
    payload: { activeFinObj: fo },
  };
}

export function setActiveBenchmarkDefaultFinObj(fo: IFinObj) {
  return {
    type: SET_ACTIVE_BENCHMARK_DEFAULT_FINANCIAL_OBJECT,
    payload: { activeBenchmarkDefaultFinObj: fo },
  };
}
