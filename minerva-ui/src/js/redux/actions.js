import {
  BENCHMARK_DEFAULT_STATISTICS_REQUESTED,
  FIN_OBJS_LOADED,
  FIN_OBJS_REQUESTED,
  STATISTICS_REQUESTED,
  SET_ACTIVE_FINANCIAL_OBJECT_ID,
} from "./action-types";

const apiRoot = process.env.API_ROOT;

export function getFinObjs() {
  return { type: FIN_OBJS_REQUESTED };
}

export function getStatistics(
  foid = null,
  freq_code = null,
  start = null,
  end = null
) {
  console.log(
    "getStatistics action creator acknowledges request, pre intercept.  passed with foid="
  );
  console.log(foid);
  return {
    type: STATISTICS_REQUESTED,
    foid: foid,
    freq_code: freq_code,
    start: start,
    end: end,
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

export function setActiveFinObjID(foid) {
  return {
    type: SET_ACTIVE_FINANCIAL_OBJECT_ID,
    payload: { activeFinObjID: foid },
  };
}
