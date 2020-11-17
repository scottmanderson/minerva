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
import { percentFormat } from "../helpers";

const TimeWindowReturns = (props) => {
  return (
    <>
      <Typography color="textPrimary">
        <h5>Time Window Returns</h5>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>MTD</TableCell>
                <TableCell>QTD</TableCell>
                <TableCell>YTD</TableCell>
                <TableCell>1 Year</TableCell>
                <TableCell>2 Year</TableCell>
                <TableCell>3 Year</TableCell>
                <TableCell>4 Year</TableCell>
                <TableCell>5 Year</TableCell>
                <TableCell>ITD</TableCell>
                <TableCell>ITD Volatility</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  {percentFormat(props.time_window_returns.mtd_return)}
                </TableCell>
                <TableCell>
                  {percentFormat(props.time_window_returns.qtd_return)}
                </TableCell>
                <TableCell>
                  {percentFormat(props.time_window_returns.ytd_return)}
                </TableCell>
                <TableCell>
                  {percentFormat(props.time_window_returns.one_year_return)}
                </TableCell>
                <TableCell>
                  {percentFormat(props.time_window_returns.two_year_return)}
                </TableCell>
                <TableCell>
                  {percentFormat(props.time_window_returns.three_year_return)}
                </TableCell>
                <TableCell>
                  {percentFormat(props.time_window_returns.four_year_return)}
                </TableCell>
                <TableCell>
                  {percentFormat(props.time_window_returns.five_year_return)}
                </TableCell>
                <TableCell>
                  {percentFormat(
                    props.time_window_returns.itd_annualized_return
                  )}
                </TableCell>
                <TableCell>
                  {percentFormat(
                    props.time_window_returns.itd_annualized_volatility
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Typography>
    </>
  );
};

export default TimeWindowReturns;
