import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import rootReducer from "./rootReducer";
import rootSaga from "./sagas/rootSaga";

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const sagaMiddleware = createSagaMiddleware();
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
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
  activeFinObjID: 1,
  statistics: {},
};

const store = createStore(
  rootReducer,
  initialState,
  storeEnhancers(applyMiddleware(sagaMiddleware, logger))
);

sagaMiddleware.run(rootSaga);

export default store;
