// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  SET_ACTIVE_FINANCIAL_OBJECT_ID,
  FIN_OBJS_LOADED,
  STATISTICS_LOADED,
  RETURN_PLOT_LOADED,
  GET_ACTIVE_FINANCIAL_OBJECT_ID,
} from "./action-types";

const rootReducer = (state, action) => {
  switch (action.type) {
    case FIN_OBJS_LOADED:
      return Object.assign({}, state, {
        finObjs: state.finObjs.concat(action.payload),
      });
    case STATISTICS_LOADED:
      return Object.assign({}, state, {
        returnsChart: action.payload,
      });
    case SET_ACTIVE_FINANCIAL_OBJECT_ID:
      return Object.assign({}, state, {
        activeFinObjID: action.payload.activeFinObjID,
      });
    default:
      return state;
  }
};

export default rootReducer;
