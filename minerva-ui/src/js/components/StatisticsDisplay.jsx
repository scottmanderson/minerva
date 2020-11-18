import React from "react";
import TimeWindowReturns from "./TimeWindowReturns";
import CalendarYearReturns from "./CalendarYearReturns";
import BokehReturnsChart from "./BokehReturnsChart";

const StatisticsDisplay = (props) => {
  return (
    <>
      <TimeWindowReturns
        time_window_returns={props.statistics.time_window_returns}
      />
      <br />
      <CalendarYearReturns
        calendar_year_returns={props.statistics.calendar_year_returns}
      />
      <BokehReturnsChart bokehReturnPlot={props.statistics.bokeh_return_plot} />
    </>
  );
};

export default StatisticsDisplay;
