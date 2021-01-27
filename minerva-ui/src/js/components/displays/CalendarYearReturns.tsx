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
import { percentFormat } from "../../helpers";
import TableContext from "@material-ui/core/Table/TableContext";
import { IFinObj, IStatistics } from "../../redux/storeTypes";

interface Props {
  activeFinObj: IFinObj;
  statistics: IStatistics;
}

const CalendarYearReturns: React.FC<Props> = ({ activeFinObj, statistics }) => (
  <>
    <Typography color="textPrimary">
      <h5>Calendar Year Returns</h5>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset</TableCell>
              {Object.keys(
                statistics.absolute_statistics.calendar_year_returns
              ).map((el) => (
                <TableCell key={"cy" + el} id={"cy" + el}>
                  {el}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{activeFinObj.ticker}</TableCell>
              {Object.keys(
                statistics.absolute_statistics.calendar_year_returns
              ).map((el) => (
                <TableCell key={"cyr" + el} id={"cyr" + el}>
                  {percentFormat(
                    statistics.absolute_statistics.calendar_year_returns[
                      el
                    ] as number
                  )}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Benchmark</TableCell>
              {Object.keys(
                statistics.benchmark_statistics.calendar_year_returns
              ).map((el) => (
                <TableCell key={"cyrbd" + el} id={"cyrbd" + el}>
                  {percentFormat(
                    statistics.benchmark_statistics.calendar_year_returns[
                      el
                    ] as number
                  )}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Difference</TableCell>
              {Object.keys(
                statistics.relative_statistics.calendar_year_returns
              ).map((el) => (
                <TableCell key={"cyrap" + el} id={"cyrap" + el}>
                  {percentFormat(
                    statistics.relative_statistics.calendar_year_returns[
                      el
                    ] as number
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

CalendarYearReturns.propTypes = {};

export default CalendarYearReturns;
