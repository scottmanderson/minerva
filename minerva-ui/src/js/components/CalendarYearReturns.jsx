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
                {Object.keys(
                  props.statistics.absolute_statistics.calendar_year_returns
                ).map((el) => (
                  <TableCell key={"cy" + el} id={"cy" + el}>
                    {el}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{props.activeFinObj.ticker}</TableCell>
                {Object.keys(
                  props.statistics.absolute_statistics.calendar_year_returns
                ).map((el) => (
                  <TableCell key={"cyr" + el} id={"cyr" + el}>
                    {percentFormat(
                      props.statistics.absolute_statistics
                        .calendar_year_returns[el]
                    )}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>
                  {props.activeBenchmarkDefaultFinObj.ticker}
                </TableCell>
                {Object.keys(
                  props.statistics.benchmark_statistics.calendar_year_returns
                ).map((el) => (
                  <TableCell key={"cyrbd" + el} id={"cyrbd" + el}>
                    {percentFormat(
                      props.statistics.benchmark_statistics
                        .calendar_year_returns[el]
                    )}
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
