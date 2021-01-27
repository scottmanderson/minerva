import { all } from "redux-saga/effects";

import getFinObjs from "./getFinObjsSaga";
import getStat from "./getStatSaga";
import getDataSources from "./getDataSourcesSaga";
import getDataSourcePolls from "./getDataSourcePollsSaga";
import getSettingsSaga from "./getSettingsSaga";
import getTSDataSaga from "./getTSDataSaga";

export default function* rootSaga() {
  yield all([
    getFinObjs(),
    getStat(),
    getDataSources(),
    getDataSourcePolls(),
    getSettingsSaga(),
    getTSDataSaga(),
  ]);
}
