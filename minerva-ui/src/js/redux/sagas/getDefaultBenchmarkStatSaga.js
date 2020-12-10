import { takeLatest, call, put, putResolve } from "redux-saga/effects";
import {
  BENCHMARK_DEFAULT_STATISTICS_LOADED,
  BENCHMARK_DEFAULT_STATISTICS_REQUESTED,
  API_ERRORED,
} from "../action-types";
import { nullBenchmarkDefaultStatistics } from "../nullStateStubs";

import { apiRoot } from "../../helpers";

export default function* watcherSaga() {
  console.log("statistics requested detected in watcher saga");
  yield takeLatest(BENCHMARK_DEFAULT_STATISTICS_REQUESTED, workerSaga);
}

function* workerSaga(action) {
  let foid = action.foid;
  let freq_code = action.freq_code;
  let start = action.start;
  let end = action.end;
  try {
    if (action.foid) {
      const payload = yield call(getStatistics, foid, freq_code, start, end);
      yield putResolve({ type: BENCHMARK_DEFAULT_STATISTICS_LOADED, payload });
    } else {
      const payload = nullBenchmarkDefaultStatistics;
      yield put({ type: BENCHMARK_DEFAULT_STATISTICS_LOADED, payload });
    }
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

function getStatistics(foid, freq_code, start, end) {
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
  return fetch(apiRoot + "/stat/" + foid + query_string).then((response) =>
    response.json()
  );
}
