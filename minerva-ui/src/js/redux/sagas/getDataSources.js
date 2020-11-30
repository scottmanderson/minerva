import { takeEvery, call, put, putResolve } from "redux-saga/effects";
import {
  API_ERRORED,
  DATA_SOURCES_LOADED,
  DATA_SOURCES_REQUESTED,
} from "../action-types";

const apiRoot = process.env.REACT_APP_API_ROOT || "http://127.0.0.1:5000";

function getDataSources() {
  return fetch(apiRoot + "/sources").then((response) => response.json());
}

export default function* watcherSaga() {
  yield takeEvery(DATA_SOURCES_REQUESTED, workerSaga);
}

function* workerSaga() {
  try {
    const payload = yield call(getDataSources);
    yield putResolve({ type: DATA_SOURCES_LOADED, payload });
  } catch (e) {
    yield put({ type: API_ERRORED });
  }
}
