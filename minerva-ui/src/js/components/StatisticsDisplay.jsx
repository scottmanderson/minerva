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
          statistics={props.statistics}
        />
      </Paper>
      <br />

      <Paper style={{ padding: 5 }} elevation={5}>
        <CalendarYearReturns
          activeFinObj={props.activeFinObj}
          activeBenchmarkDefaultFinObj={props.activeBenchmarkDefaultFinObj}
          statistics={props.statistics}
        />
      </Paper>
      <br />
      <Paper style={{ padding: 5 }} elevation={5}>
        <ReturnsChart statistics={props.statistics} />
      </Paper>
    </>
  );
};

export default StatisticsDisplay;
