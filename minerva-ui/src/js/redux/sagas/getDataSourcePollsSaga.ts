import { takeEvery, call, put, putResolve } from "redux-saga/effects";
import {
  API_ERRORED,
  DATA_SOURCE_POLLS_LOADED,
  DATA_SOURCE_POLLS_REQUESTED,
} from "../actions/action-types";
import { apiRoot } from "../../helpers";

function getDataSourcePolls() {
  return fetch(apiRoot + "/sources/polls").then((response) => response.json());
}

function* workerSaga() {
  try {
    const payload = yield call(getDataSourcePolls);
    yield putResolve({ type: DATA_SOURCE_POLLS_LOADED, payload });
  } catch (e) {
    yield put({ type: API_ERRORED });
  }
}

export default function* watcherSaga() {
  yield takeEvery(DATA_SOURCE_POLLS_REQUESTED, workerSaga);
}
