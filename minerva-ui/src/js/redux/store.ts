import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import rootReducer from "./rootReducer";
import rootSaga from "./sagas/rootSaga";
import { nullStatStub } from "./nullStateStubs";
import { IState } from "./storeTypes";

const reduxDevTools =
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const sagaMiddleware = createSagaMiddleware();
// @ts-ignore
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState: IState = {
  finObjs: [
    {
      foid: 1,
      name: "SPDR S&P 500 Index ETF",
      report_name: "SPY",
      ticker: "SPY",
    },
    {
      foid: 2,
      name: "Vanguard Emerging Markets ETF",
      report_name: "VWO",
      ticker: "VWO",
    },
  ],
  activeFinObj: {
    foid: 1,
    name: "SPDR S&P 500 Index ETF",
    report_name: "S&P 500 ETF",
    ticker: "SPY",
    benchmark: 11,
  },
  statistics: {
    foid: "1",
    absolute_statistics: nullStatStub,
    benchmark_statistics: nullStatStub,
    relative_statistics: nullStatStub,
    cumulative_x: ["2019-12-31", "2020-01-01"],
    cumulative_y: [1, 1.005],
    ts_y: [0],
    bm_cumulative_x: [],
    bm_cumulative_y: [],
  },
  dataSources: [
    {
      source_id: 1,
      name: "local-master",
      hierarchy_rank: 1,
      api_key: "",
    },
  ],
  dataSourcePolls: [],
  settings: [],
  tsDataActiveFinObj: [
    { id: 1, tsid: 0, dt: "No Data", level: 0, source: "Source Not Loaded" },
  ],
};

const store = createStore(
  rootReducer,
  initialState,
  storeEnhancers(applyMiddleware(sagaMiddleware, logger))
);

sagaMiddleware.run(rootSaga);

export default store;
