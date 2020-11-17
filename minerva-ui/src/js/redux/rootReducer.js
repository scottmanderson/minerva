// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  SET_ACTIVE_FINANCIAL_OBJECT,
  FIN_OBJS_LOADED,
  STATISTICS_LOADED,
  BENCHMARK_DEFAULT_STATISTICS_LOADED,
  RETURN_PLOT_LOADED,
  GET_ACTIVE_FINANCIAL_OBJECTD,
} from "./action-types";

const rootReducer = (state, action) => {
  switch (action.type) {
    case BENCHMARK_DEFAULT_STATISTICS_LOADED:
      return Object.assign({}, state, {
        benchmarkDefaultStatistics: action.payload,
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
    default:
      return state;
  }
};

export default rootReducer;
