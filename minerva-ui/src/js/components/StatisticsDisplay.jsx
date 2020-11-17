import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
} from "@material-ui/core";
import { percentFormat } from "../helpers";
import TimeWindowReturns from "./TimeWindowReturns";
import CalendarYearReturns from "./CalendarYearReturns";

const StatisticsDisplay = (props) => {
  return (
    <>
      <TimeWindowReturns statistics={props.statistics} />
      <br />
      <CalendarYearReturns
        calendar_year_returns={props.statistics.calendar_year_returns}
      />
    </>
  );
};

export default StatisticsDisplay;
