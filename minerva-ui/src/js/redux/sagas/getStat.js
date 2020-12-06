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
  let query_string = "";
  if (freq_code) {
    query_string += "?freq_code=" + freq_code;
  }
  if (start) {
    query_string += "?start=" + start;
  }
  if (end) {
    query_string += "?end=" + end;
  }
  if (benchmark_foid) {
    query_string += "?benchmark_foid=" + benchmark_foid;
  }
  return fetch(apiRoot + "/stat/" + foid + query_string).then((response) =>
    response.json()
  );
}
