import { takeLatest, call, put, putResolve } from "redux-saga/effects";
import {
  STATISTICS_LOADED,
  STATISTICS_REQUESTED,
  API_ERRORED,
} from "../action-types";

import { apiRoot } from "../../helpers";

export default function* watcherSaga() {
  console.log("statistics requested detected in watcher saga");
  yield takeLatest(STATISTICS_REQUESTED, workerSaga);
}

function* workerSaga(action) {
  let foid = action.foid;
  let freq_code = action.freq_code;
  let start = action.start;
  let end = action.end;
  let benchmark_foid = action.benchmark_foid;
  try {
    const payload = yield call(
      getStatistics,
      foid,
      freq_code,
      start,
      end,
      benchmark_foid
    );
    yield putResolve({ type: STATISTICS_LOADED, payload });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

function getStatistics(foid, freq_code, start, end, benchmark_foid) {
  let queryString = freq_code || start || end || benchmark_foid ? "?" : "";
  if (freq_code) {
    queryString += "freq_code=" + freq_code + "&";
  }
  if (start) {
    queryString += "start=" + start + "&";
  }
  if (end) {
    queryString += "end=" + end + "&";
  }
  if (benchmark_foid) {
    queryString += "benchmark_foid=" + benchmark_foid + "&";
  }
  // trim trailing ampersand from queryString
  queryString = queryString.endsWith("&")
    ? queryString.slice(0, queryString.length - 1)
    : queryString;
  return fetch(apiRoot + "/stat/" + foid + queryString).then((response) =>
    response.json()
  );
}
