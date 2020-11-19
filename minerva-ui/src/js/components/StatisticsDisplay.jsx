import React from "react";
import TimeWindowReturns from "./TimeWindowReturns";
import CalendarYearReturns from "./CalendarYearReturns";
import BokehReturnsChart from "./BokehReturnsChart";

const StatisticsDisplay = (props) => {
  return (
    <>
      <TimeWindowReturns
        activeFinObj={props.activeFinObj}
        time_window_returns={props.statistics.time_window_returns}
      />
      <br />
      <CalendarYearReturns
        activeFinObj={props.activeFinObj}
        activeBenchmarkDefaultFinObj={props.activeBenchmarkDefaultFinObj}
        calendar_year_returns={props.statistics.calendar_year_returns}
        benchmarkCalendarYearReturns={
          props.benchmarkDefaultStatistics.calendar_year_returns
        }
      />
      <BokehReturnsChart bokehReturnPlot={props.statistics.bokeh_return_plot} />
    </>
  );
};

export default StatisticsDisplay;
