import {
  ActionTypesMain,
  DATA_SOURCE_POLLS_LOADED,
  DATA_SOURCES_LOADED,
  FIN_OBJS_LOADED,
  SET_ACTIVE_FINANCIAL_OBJECT,
  SETTINGS_LOADED,
  STATISTICS_LOADED,
  TS_DATA_LOADED,
} from "./actions/action-types";
import { IState } from "./storeTypes";
import { initialState } from "./store";

const rootReducer = (state = initialState, action: ActionTypesMain): IState => {
  switch (action.type) {
    case DATA_SOURCES_LOADED:
      return Object.assign({}, state, {
        dataSources: action.payload,
      });
    case DATA_SOURCE_POLLS_LOADED:
      return Object.assign({}, state, {
        dataSourcePolls: action.payload,
      });
    case SETTINGS_LOADED:
      return Object.assign({}, state, {
        settings: action.payload,
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
    case TS_DATA_LOADED:
      return Object.assign({}, state, {
        tsDataActiveFinObj: action.payload,
      });
    default:
      return state;
  }
};

export default rootReducer;
