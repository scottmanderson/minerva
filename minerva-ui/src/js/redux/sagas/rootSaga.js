import { all } from "redux-saga/effects";

import getFinObjs from "./getFinObjsSaga";
import getStat from "./getStatSaga";
import getDefaultBenchmarkStat from "./getDefaultBenchmarkStatSaga";
import getDataSources from "./getDataSourcesSaga";
import getDataSourcePolls from "./getDataSourcePollsSaga";
import getSettingsSaga from "./getSettingsSaga";

export default function* rootSaga() {
  yield all([
    getFinObjs(),
    getStat(),
    getDefaultBenchmarkStat(),
    getDataSources(),
    getDataSourcePolls(),
    getSettingsSaga(),
  ]);
}
