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

const StatisticsDisplay = (props) => {
  return (
    <>
      <Typography color="textPrimary">
        <h3>Statistics View</h3>
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
                  {percentFormat(props.statistics.mtd_return)}
                </TableCell>
                <TableCell>
                  {percentFormat(props.statistics.qtd_return)}
                </TableCell>
                <TableCell>
                  {percentFormat(props.statistics.ytd_return)}
                </TableCell>
                <TableCell>
                  {percentFormat(props.statistics.one_year_return)}
                </TableCell>
                <TableCell>
                  {percentFormat(props.statistics.two_year_return)}
                </TableCell>
                <TableCell>
                  {percentFormat(props.statistics.three_year_return)}
                </TableCell>
                <TableCell>
                  {percentFormat(props.statistics.four_year_return)}
                </TableCell>
                <TableCell>
                  {percentFormat(props.statistics.five_year_return)}
                </TableCell>
                <TableCell>
                  {percentFormat(props.statistics.itd_annualized_return)}
                </TableCell>
                <TableCell>
                  {percentFormat(props.statistics.itd_annualized_volatility)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Typography>
    </>
  );
};

export default StatisticsDisplay;
