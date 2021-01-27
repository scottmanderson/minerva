import React from "react";
import { Grid, Paper } from "@material-ui/core";
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
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        spacing={8}
        style={{ marginTop: 10 }}
      >
        <Grid item>
          <Paper style={{ padding: 5 }} elevation={5}>
            <TimeWindowReturns
              activeFinObj={activeFinObj}
              activeBenchmarkDefaultFinObj={activeBenchmarkDefaultFinObj}
              statistics={statistics}
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper style={{ padding: 5 }} elevation={5}>
            <CalendarYearReturns
              activeFinObj={activeFinObj}
              activeBenchmarkDefaultFinObj={activeBenchmarkDefaultFinObj}
              statistics={statistics}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default StatisticsDisplay;
