import { takeEvery, call, put, putResolve } from "redux-saga/effects";
import {
  API_ERRORED,
  DATA_SOURCES_LOADED,
  DATA_SOURCES_REQUESTED,
  SETTINGS_LOADED,
  SETTINGS_REQUESTED,
} from "../actions/action-types";

import { apiRoot } from "../../helpers";

function getSettings() {
  return fetch(apiRoot + "/settings").then((response) => response.json());
}

function* workerSaga() {
  try {
    const payload = yield call(getSettings);
    yield putResolve({ type: SETTINGS_LOADED });
  } catch (e) {
    yield put({ type: API_ERRORED });
  }
}

export default function* watcherSaga() {
  yield takeEvery(SETTINGS_REQUESTED, workerSaga);
}
