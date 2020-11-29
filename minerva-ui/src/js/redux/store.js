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
  activeBenchmarkDefaultFinObj: {
    foid: "",
    name: "Benchmark",
    report_name: "Benchmark",
    ticker: "Benchmark",
  },
  statistics: {
    bokeh_return_plot:
      '{"target_id": "bokehReturnPlot", "root_id": "1144", "doc": {"roots": {"references": [{"attributes": {}, "id": "1332", "type": "Selection"}, {"attributes": {}, "id": "1161", "type": "PanTool"}, {"attributes": {}, "id": "1162", "type": "WheelZoomTool"}, {"attributes": {"mantissas": [1, 2, 5], "max_interval": 500.0, "num_minor_ticks": 0}, "id": "1181", "type": "AdaptiveTicker"}, {"attributes": {}, "id": "1363", "type": "BasicTickFormatter"}, {"attributes": {"base": 60, "mantissas": [1, 2, 5, 10, 15, 20, 30], "max_interval": 1800000.0, "min_interval": 1000.0, "num_minor_ticks": 0}, "id": "1182", "type": "AdaptiveTicker"}, {"attributes": {"days": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]}, "id": "1184", "type": "DaysTicker"}, {"attributes": {"base": 24, "mantissas": [1, 2, 4, 6, 8, 12], "max_interval": 43200000.0, "min_interval": 3600000.0, "num_minor_ticks": 0}, "id": "1183", "type": "AdaptiveTicker"}, {"attributes": {"overlay": {"id": "1167"}}, "id": "1163", "type": "BoxZoomTool"}, {"attributes": {"active_drag": "auto", "active_inspect": "auto", "active_multi": null, "active_scroll": "auto", "active_tap": "auto", "tools": [{"id": "1161"}, {"id": "1162"}, {"id": "1163"}, {"id": "1164"}, {"id": "1165"}, {"id": "1166"}]}, "id": "1168", "type": "Toolbar"}, {"attributes": {"months": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}, "id": "1188", "type": "MonthsTicker"}, {"attributes": {"months": [0, 2, 4, 6, 8, 10]}, "id": "1189", "type": "MonthsTicker"}, {"attributes": {}, "id": "1165", "type": "ResetTool"}, {"attributes": {"days": [1, 4, 7, 10, 13, 16, 19, 22, 25, 28]}, "id": "1185", "type": "DaysTicker"}, {"attributes": {}, "id": "1164", "type": "SaveTool"}, {"attributes": {"data_source": {"id": "1308"}, "glyph": {"id": "1309"}, "hover_glyph": null, "muted_glyph": null, "nonselection_glyph": {"id": "1310"}, "selection_glyph": null, "view": {"id": "1312"}}, "id": "1311", "type": "GlyphRenderer"}, {"attributes": {"days": [1, 15]}, "id": "1187", "type": "DaysTicker"}, {"attributes": {"axis": {"id": "1157"}, "dimension": 1, "ticker": null}, "id": "1160", "type": "Grid"}, {"attributes": {"months": [0, 6]}, "id": "1191", "type": "MonthsTicker"}, {"attributes": {}, "id": "1166", "type": "HelpTool"}, {"attributes": {"days": [1, 8, 15, 22]}, "id": "1186", "type": "DaysTicker"}, {"attributes": {}, "id": "1192", "type": "YearsTicker"}, {"attributes": {}, "id": "1179", "type": "BasicTickFormatter"}, {"attributes": {"below": [{"id": "1153"}], "center": [{"id": "1156"}, {"id": "1160"}], "extra_y_ranges": {"returns": {"id": "1334"}}, "left": [{"id": "1157"}], "renderers": [{"id": "1311"}], "right": [{"id": "1356"}], "title": {"id": "1176"}, "toolbar": {"id": "1168"}, "x_range": {"id": "1145"}, "x_scale": {"id": "1149"}, "y_range": {"id": "1147"}, "y_scale": {"id": "1151"}}, "id": "1144", "subtype": "Figure", "type": "Plot"}, {"attributes": {"months": [0, 4, 8]}, "id": "1190", "type": "MonthsTicker"}, {"attributes": {}, "id": "1334", "type": "Range1d"}, {"attributes": {}, "id": "1177", "type": "DatetimeTickFormatter"}, {"attributes": {"line_color": "#1f77b4", "x": {"field": "x"}, "y": {"field": "y"}}, "id": "1309", "type": "Line"}, {"attributes": {"formatter": {"id": "1177"}, "ticker": {"id": "1154"}}, "id": "1153", "type": "DatetimeAxis"}, {"attributes": {"text": ""}, "id": "1176", "type": "Title"}, {"attributes": {"data": {"x": [0, 1], "y": [0, 1]}, "selected": {"id": "1332"}, "selection_policy": {"id": "1331"}}, "id": "1308", "type": "ColumnDataSource"}, {"attributes": {}, "id": "1147", "type": "DataRange1d"}, {"attributes": {"formatter": {"id": "1363"}, "ticker": {"id": "1364"}, "y_range_name": "returns"}, "id": "1356", "type": "LinearAxis"}, {"attributes": {"formatter": {"id": "1179"}, "ticker": {"id": "1158"}}, "id": "1157", "type": "LinearAxis"}, {"attributes": {}, "id": "1331", "type": "UnionRenderers"}, {"attributes": {"bottom_units": "screen", "fill_alpha": 0.5, "fill_color": "lightgrey", "left_units": "screen", "level": "overlay", "line_alpha": 1.0, "line_color": "black", "line_dash": [4, 4], "line_width": 2, "right_units": "screen", "top_units": "screen"}, "id": "1167", "type": "BoxAnnotation"}, {"attributes": {}, "id": "1145", "type": "DataRange1d"}, {"attributes": {"num_minor_ticks": 5, "tickers": [{"id": "1181"}, {"id": "1182"}, {"id": "1183"}, {"id": "1184"}, {"id": "1185"}, {"id": "1186"}, {"id": "1187"}, {"id": "1188"}, {"id": "1189"}, {"id": "1190"}, {"id": "1191"}, {"id": "1192"}]}, "id": "1154", "type": "DatetimeTicker"}, {"attributes": {"source": {"id": "1308"}}, "id": "1312", "type": "CDSView"}, {"attributes": {}, "id": "1364", "type": "BasicTicker"}, {"attributes": {}, "id": "1158", "type": "BasicTicker"}, {"attributes": {"line_alpha": 0.1, "line_color": "#1f77b4", "x": {"field": "x"}, "y": {"field": "y"}}, "id": "1310", "type": "Line"}, {"attributes": {"axis": {"id": "1153"}, "ticker": null}, "id": "1156", "type": "Grid"}, {"attributes": {}, "id": "1149", "type": "LinearScale"}, {"attributes": {}, "id": "1151", "type": "LinearScale"}], "root_ids": ["1144"]}, "title": "", "version": "2.2.3"}}',
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
    cumulative_json: "",
    cumulative_x: [0],
    cumulative_y: [0],
    ts_y: [0],
  },
  benchmarkDefaultStatistics: {
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
  dataSources: [
    {
      source_id: 1,
      name: "local-master",
      hierarchy_rank: 1,
      api_key: "",
    },
  ],
  dataSourcePolls: [],
};

const store = createStore(
  rootReducer,
  initialState,
  storeEnhancers(applyMiddleware(sagaMiddleware, logger))
);

sagaMiddleware.run(rootSaga);

export default store;
