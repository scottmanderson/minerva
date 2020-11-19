import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";
import { percentFormat } from "../helpers";

const CalendarYearReturns = (props) => {
  return (
    <>
      <Typography color="textPrimary">
        <h5>Calendar Year Returns</h5>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Asset</TableCell>
                {Object.keys(props.calendar_year_returns).map((el) => (
                  <TableCell key={"cy" + el} id={"cy" + el}>
                    {el}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{props.activeFinObj.ticker}</TableCell>
                {Object.keys(props.calendar_year_returns).map((el) => (
                  <TableCell key={"cyr" + el} id={"cyr" + el}>
                    {percentFormat(props.calendar_year_returns[el])}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Benchmark</TableCell>
                {Object.keys(props.benchmarkCalendarYearReturns).map((el) => (
                  <TableCell key={"bmd" + el} id={"bmd" + el}>
                    {percentFormat(props.benchmarkCalendarYearReturns[el])}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Typography>
    </>
  );
};

export default CalendarYearReturns;
