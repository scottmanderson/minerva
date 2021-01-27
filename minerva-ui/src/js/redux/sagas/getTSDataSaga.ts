import { takeLatest, call, put, putResolve } from "redux-saga/effects";
import {
  TS_DATA_LOADED,
  TS_DATA_REQUESTED,
  API_ERRORED,
  IStatisticsRequested,
  ITSDataRequested,
} from "../actions/action-types";

import { apiRoot } from "../../helpers";

function getTSData(foid: number) {
  return fetch(apiRoot + "/ts_returns/" + foid).then((response) =>
    response.json()
  );
}

function* workerSaga(action: ITSDataRequested) {
  let foid = action.foid;
  try {
    const payload = yield call(getTSData, foid);
    yield putResolve({ type: TS_DATA_LOADED, payload });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
    console.log(e);
  }
}

export default function* watcherSaga() {
  yield takeLatest(TS_DATA_REQUESTED, workerSaga);
}
