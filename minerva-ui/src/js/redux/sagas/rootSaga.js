import { all } from "redux-saga/effects";

import getFinObjs from "./getFinObjs";
import getStat from "./getStat";

export default function* rootSaga() {
  yield all([getFinObjs(), getStat()]);
}
