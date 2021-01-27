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
import { IFinObj, IStatistics } from "../../redux/storeTypes";

interface Props {
  activeFinObj: IFinObj;
  statistics: IStatistics;
}

interface IHeadingLookup {
  [key: string]: string;
}

const TimeWindowReturns: React.FC<Props> = ({ activeFinObj, statistics }) => {
  const headingLookup: IHeadingLookup = {
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
                  statistics.absolute_statistics.time_window_returns
                ).map((el) => (
                  <TableCell key={"tw" + el} id={"el" + el}>
                    {headingLookup[el]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{activeFinObj.ticker}</TableCell>
                {Object.keys(
                  statistics.absolute_statistics.time_window_returns
                ).map((el) => (
                  <TableCell key={"twr" + el} id={"twr" + el}>
                    {percentFormat(
                      statistics.absolute_statistics.time_window_returns[
                        el
                      ] as number
                    )}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Benchmark</TableCell>
                {Object.keys(
                  statistics.benchmark_statistics.time_window_returns
                ).map((el) => (
                  <TableCell key={"twrbd" + el} id={"twrbd" + el}>
                    {percentFormat(
                      statistics.benchmark_statistics.time_window_returns[
                        el
                      ] as number
                    )}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Difference</TableCell>
                {Object.keys(
                  statistics.relative_statistics.time_window_returns
                ).map((el) => (
                  <TableCell key={"twrap" + el} id={"twrap" + el}>
                    {percentFormat(
                      statistics.relative_statistics.time_window_returns[
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
};

export default TimeWindowReturns;
