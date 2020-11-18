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
  activeFinObj: {
    foid: 1,
    name: "SPDR S&P 500 ETF",
    report_name: "S&P 500 ETF",
    ticker: "SPY",
  },
  statistics: {
    calendar_year_returns: {
      2010: "N/A",
      2011: "N/A",
      2012: "N/A",
      2013: "N/A",
      2014: "N/A",
      2015: "N/A",
      2016: "N/A",
      2017: "N/A",
      2018: "N/A",
      2019: "N/A",
      2020: "N/A",
    },
    time_window_returns: {
      mtd_return: "N/A",
      qtd_return: "N/A",
      ytd_return: "N/A",
      one_year_ret: "N/A",
      two_year_return: "N/A",
      three_year_return: "N/A",
      four_year_return: "N/A",
      five_year_return: "N/A",
      itd_annualized_return: "N/A",
      itd_annualized_volatility: "N/A",
    },
  },
  benchmarkDefaultStatistics: {
    calendar_year_returns: {
      2019: "N/A",
      2020: "N/A",
    },
    time_window_returns: {
      mtd_return: "N/A",
      qtd_return: "N/A",
      ytd_return: "N/A",
      one_year_ret: "N/A",
      two_year_return: "N/A",
      three_year_return: "N/A",
      four_year_return: "N/A",
      five_year_return: "N/A",
      itd_annualized_return: "N/A",
      itd_annualized_volatility: "N/A",
    },
  },
};

const store = createStore(
  rootReducer,
  initialState,
  storeEnhancers(applyMiddleware(sagaMiddleware, logger))
);

sagaMiddleware.run(rootSaga);

export default store;
