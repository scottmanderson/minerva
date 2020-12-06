import {
  BENCHMARK_DEFAULT_STATISTICS_REQUESTED,
  FIN_OBJS_REQUESTED,
  STATISTICS_REQUESTED,
  SET_ACTIVE_FINANCIAL_OBJECT,
  SET_ACTIVE_BENCHMARK_DEFAULT_FINANCIAL_OBJECT,
  DATA_SOURCES_REQUESTED,
  DATA_SOURCE_POLLS_REQUESTED,
} from "./action-types";

const apiRoot = process.env.API_ROOT;

export function getFinObjs() {
  return { type: FIN_OBJS_REQUESTED };
}

export function getDataSources() {
  return { type: DATA_SOURCES_REQUESTED };
}

export function getDataSourcePolls() {
  return { type: DATA_SOURCE_POLLS_REQUESTED };
}

export function getStatistics(
  foid = null,
  freq_code = null,
  start = null,
  end = null,
  benchmark_foid = null
) {
  return {
    type: STATISTICS_REQUESTED,
    foid: foid,
    freq_code: freq_code,
    start: start,
    end: end,
    benchmark_foid: benchmark_foid,
  };
}

export function getBenchmarkDefaultStatistics(
  foid = null,
  freq_code = null,
  start = null,
  end = null
) {
  return {
    type: BENCHMARK_DEFAULT_STATISTICS_REQUESTED,
    foid: foid,
    freq_code: freq_code,
    start: start,
    end: end,
  };
}

export function setActiveFinObj(fo) {
  return {
    type: SET_ACTIVE_FINANCIAL_OBJECT,
    payload: { activeFinObj: fo },
  };
}

export function setActiveBenchmarkDefaultFinObj(fo) {
  return {
    type: SET_ACTIVE_BENCHMARK_DEFAULT_FINANCIAL_OBJECT,
    payload: { activeBenchmarkDefaultFinObj: fo },
  };
}
