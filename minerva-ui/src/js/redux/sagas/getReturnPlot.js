import { takeLatest, call, put } from "redux-saga/effects";
import {
  RETURN_PLOT_REQUESTED,
  RETURN_PLOT_LOADED,
  API_ERRORED,
} from "../action-types";

const apiRoot = process.env.API_ROOT;

export default function* watcherSaga() {
  console.log("statistics requested detected in watcher saga");
  yield takeLatest(RETURN_PLOT_REQUESTED, workerSaga);
}

function* workerSaga(action) {
  let foid = action.foid;
  let freq_code = action.freq_code;
  let start = action.start;
  let end = action.end;
  try {
    const payload = yield call(
      getReturnsChart,
      foid,
      (freq_code = "M"),
      (start = null),
      (end = null)
    );
    console.log("stat payload pre-put");
    console.log(payload);
    yield put({ type: RETURN_PLOT_LOADED, payload });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

function getReturnsChart(foid, freq_code, start, end) {
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
  return fetch(
    apiRoot + "/charts/returns/" + foid + query_string
  ).then((response) => response.json());
}
