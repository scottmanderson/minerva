import { all } from "redux-saga/effects";

import getFinObjs from "./getFinObjs";
import getStat from "./getStat";
import getDefaultBenchmarkStat from "./getDefaultBenchmarkStat";
import getDataSources from "./getDataSources";

export default function* rootSaga() {
  yield all([
    getFinObjs(),
    getStat(),
    getDefaultBenchmarkStat(),
    getDataSources(),
  ]);
}
