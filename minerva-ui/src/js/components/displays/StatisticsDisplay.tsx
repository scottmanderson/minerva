import React from "react";
import { Grid, Paper } from "@material-ui/core";
import TimeWindowReturns from "./TimeWindowReturns";
import CalendarYearReturns from "./CalendarYearReturns";
import { IFinObj, IStatistics } from "../../redux/storeTypes";

interface Props {
  activeFinObj: IFinObj;
  statistics: IStatistics;
}

const StatisticsDisplay: React.FC<Props> = ({ activeFinObj, statistics }) => {
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
              statistics={statistics}
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper style={{ padding: 5 }} elevation={5}>
            <CalendarYearReturns
              activeFinObj={activeFinObj}
              statistics={statistics}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default StatisticsDisplay;
