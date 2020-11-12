import { takeEvery, call, put } from "redux-saga/effects";
import { FIN_OBJS_REQUESTED, FIN_OBJS_LOADED } from "../action-types";
import { putResolve } from "redux-saga/dist/redux-saga-effects.esmodules-browsers";

const apiRoot = process.env.API_ROOT;

export default function* watcherSaga() {
  yield takeEvery(FIN_OBJS_REQUESTED, workerSaga);
}
function* workerSaga() {
  try {
    const payload = yield call(getFinObjs);
    // yield put({ type: FIN_OBJS_LOADED, payload }); original, non-blocking version
    yield putResolve({ type: FIN_OBJS_LOADED, payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function getFinObjs() {
  return fetch(apiRoot + "/fo").then((response) => response.json());
}
