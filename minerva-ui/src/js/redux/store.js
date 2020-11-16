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
  statistics: {
    mtd_return: 0,
    qtd_return: 0,
    ytd_return: 0,
    one_year_ret: 0,
    two_year_return: 0,
    three_year_return: 0,
    four_year_return: 0,
    five_year_return: 0,
    itd_annualized_return: 0,
    itd_annualized_volatility: 0,
  },
};

const store = createStore(
  rootReducer,
  initialState,
  storeEnhancers(applyMiddleware(sagaMiddleware, logger))
);

sagaMiddleware.run(rootSaga);

export default store;
