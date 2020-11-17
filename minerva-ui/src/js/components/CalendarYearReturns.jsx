import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
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
                {Object.keys(props.calendar_year_returns).map((el) => (
                  <TableCell key={"cy" + el} id={"cy" + el}>
                    {el}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {Object.keys(props.calendar_year_returns).map((el) => (
                  <TableCell key={"cyr" + el} id={"cyr" + el}>
                    {percentFormat(props.calendar_year_returns[el])}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Typography>
    </>
  );
};

export default CalendarYearReturns;
