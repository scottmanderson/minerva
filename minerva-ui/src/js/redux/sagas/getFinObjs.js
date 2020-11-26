import { takeEvery, call, put, putResolve } from "redux-saga/effects";
import {
  FIN_OBJS_REQUESTED,
  FIN_OBJS_LOADED,
  API_ERRORED,
} from "../action-types";

const apiRoot = process.env.API_ROOT || "http://127.0.0.1:5000";

function getFinObjs() {
  return fetch(apiRoot + "/fo").then((response) => response.json());
}

export default function* watcherSaga() {
  yield takeEvery(FIN_OBJS_REQUESTED, workerSaga);
}

function* workerSaga() {
  try {
    const payload = yield call(getFinObjs);
    yield putResolve({ type: FIN_OBJS_LOADED, payload });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}
