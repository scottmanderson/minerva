import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { percentFormat } from "../../helpers";

const TimeWindowReturns = (props) => {
  const headingLookup = {
    mtd_return: "MTD",
    qtd_return: "QTD",
    ytd_return: "YTD",
    one_year_return: "1 Year",
    two_year_return: "2 Year",
    three_year_return: "3 Year",
    four_year_return: "4 Year",
    five_year_return: "5 Year",
    itd_annualized_return: "ITD",
    itd_annualized_volatility: "Volatility",
  };

  return (
    <>
      <Typography color="textPrimary">
        <h5>Time Window Returns</h5>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Asset</TableCell>
                {Object.keys(
                  props.statistics.absolute_statistics.time_window_returns
                ).map((el) => (
                  <TableCell key={"tw" + el} id={"el" + el}>
                    {headingLookup[el]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{props.activeFinObj.ticker}</TableCell>
                {Object.keys(
                  props.statistics.absolute_statistics.time_window_returns
                ).map((el) => (
                  <TableCell key={"twr" + el} id={"twr" + el}>
                    {percentFormat(
                      props.statistics.absolute_statistics.time_window_returns[
                        el
                      ]
                    )}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>
                  {props.activeBenchmarkDefaultFinObj.ticker}
                </TableCell>
                {Object.keys(
                  props.statistics.benchmark_statistics.time_window_returns
                ).map((el) => (
                  <TableCell key={"twrbd" + el} id={"twrbd" + el}>
                    {percentFormat(
                      props.statistics.benchmark_statistics.time_window_returns[
                        el
                      ]
                    )}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Difference</TableCell>
                {Object.keys(
                  props.statistics.relative_statistics.time_window_returns
                ).map((el) => (
                  <TableCell key={"twrap" + el} id={"twrap" + el}>
                    {percentFormat(
                      props.statistics.relative_statistics.time_window_returns[
                        el
                      ]
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

export default TimeWindowReturns;
