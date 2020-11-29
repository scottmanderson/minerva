// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  SET_ACTIVE_FINANCIAL_OBJECT,
  SET_ACTIVE_BENCHMARK_DEFAULT_FINANCIAL_OBJECT,
  FIN_OBJS_LOADED,
  STATISTICS_LOADED,
  BENCHMARK_DEFAULT_STATISTICS_LOADED,
  DATA_SOURCES_LOADED,
  DATA_SOURCE_POLLS_LOADED,
} from "./action-types";

const rootReducer = (state, action) => {
  switch (action.type) {
    case BENCHMARK_DEFAULT_STATISTICS_LOADED:
      return Object.assign({}, state, {
        benchmarkDefaultStatistics: action.payload,
      });
    case DATA_SOURCES_LOADED:
      return Object.assign({}, state, {
        dataSources: action.payload,
      });
    case DATA_SOURCE_POLLS_LOADED:
      return Object.assign({}, state, {
        dataSources: action.payload,
      });
    case FIN_OBJS_LOADED:
      return Object.assign({}, state, {
        finObjs: action.payload,
      });
    case STATISTICS_LOADED:
      return Object.assign({}, state, {
        statistics: action.payload,
      });
    case SET_ACTIVE_FINANCIAL_OBJECT:
      return Object.assign({}, state, {
        activeFinObj: action.payload.activeFinObj,
      });
    case SET_ACTIVE_BENCHMARK_DEFAULT_FINANCIAL_OBJECT:
      return Object.assign({}, state, {
        activeBenchmarkDefaultFinObj:
          action.payload.activeBenchmarkDefaultFinObj,
      });
    default:
      return state;
  }
};

export default rootReducer;
