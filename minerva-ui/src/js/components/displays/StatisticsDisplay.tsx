import React from "react";
import Paper from "@material-ui/core/Paper";
import TimeWindowReturns from "./TimeWindowReturns";
import CalendarYearReturns from "./CalendarYearReturns";
import ReturnsChart from "./ReturnsChart";
import { IFinObj, IStatistics } from "../../redux/storeTypes";

interface Props {
  activeBenchmarkDefaultFinObj: IFinObj;
  activeFinObj: IFinObj;
  statistics: IStatistics;
}

const StatisticsDisplay: React.FC<Props> = ({
  activeBenchmarkDefaultFinObj,
  activeFinObj,
  statistics,
}) => {
  return (
    <>
      <Paper style={{ padding: 5 }} elevation={5}>
        <TimeWindowReturns
          activeFinObj={activeFinObj}
          activeBenchmarkDefaultFinObj={activeBenchmarkDefaultFinObj}
          statistics={statistics}
        />
      </Paper>
      <br />

      <Paper style={{ padding: 5 }} elevation={5}>
        <CalendarYearReturns
          activeFinObj={activeFinObj}
          activeBenchmarkDefaultFinObj={activeBenchmarkDefaultFinObj}
          statistics={statistics}
        />
      </Paper>
      <br />
    </>
  );
};

export default StatisticsDisplay;
