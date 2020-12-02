import React from "react";
import Paper from "@material-ui/core/Paper";
import TimeWindowReturns from "./TimeWindowReturns";
import CalendarYearReturns from "./CalendarYearReturns";
import ReturnsChart from "./ReturnsChart";

const StatisticsDisplay = (props) => {
  return (
    <>
      <Paper style={{ padding: 5 }} elevation={5}>
        <TimeWindowReturns
          activeFinObj={props.activeFinObj}
          activeBenchmarkDefaultFinObj={props.activeBenchmarkDefaultFinObj}
          timeWindowReturns={props.statistics.time_window_returns}
          benchmarkTimeWindowReturns={
            props.benchmarkDefaultStatistics.time_window_returns
          }
        />
      </Paper>
      <br />

      <Paper style={{ padding: 5 }} elevation={5}>
        <CalendarYearReturns
          activeFinObj={props.activeFinObj}
          activeBenchmarkDefaultFinObj={props.activeBenchmarkDefaultFinObj}
          calendarYearReturns={props.statistics.calendar_year_returns}
          benchmarkCalendarYearReturns={
            props.benchmarkDefaultStatistics.calendar_year_returns
          }
        />
      </Paper>
      <br />
      <Paper style={{ padding: 5 }} elevation={5}>
        <ReturnsChart
          statistics={props.statistics}
          benchmarkDefaultStatistics={props.benchmarkDefaultStatistics}
        />
      </Paper>
    </>
  );
};

export default StatisticsDisplay;
