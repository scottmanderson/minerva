import React from "react";
import { Typography } from "@material-ui/core";

const StatisticsDisplay = (props) => {
  return (
    <>
      <Typography color="textPrimary">
        <h3>Statistics View</h3>
        <div>
          <table>
            <tr>
              <th>MTD</th>
              <th>QTD</th>
              <th>YTD</th>
              <th>1 Year</th>
              <th>2 Year</th>
              <th>3 Year</th>
              <th>4 Year</th>
              <th>5 Year</th>
              <th>ITD</th>
              <th>ITD Volatility</th>
            </tr>
            <tr>
              <td>{props.statistics.mtd_return || "N/A"}</td>
              <td>{props.statistics.qtd_return || "N/A"}</td>
              <td>{props.statistics.ytd_return || "N/A"}</td>
              <td>{props.statistics.one_year_return || "N/A"}</td>
              <td>{props.statistics.two_year_return || "N/A"}</td>
              <td>{props.statistics.three_year_return || "N/A"}</td>
              <td>{props.statistics.four_year_return || "N/A"}</td>
              <td>{props.statistics.five_year_return || "N/A"}</td>
              <td>{props.statistics.itd_annualized_return || "N/A"}</td>
              <td>{props.statistics.itd_annualized_volatility || "N/A"}</td>
            </tr>
          </table>
        </div>
      </Typography>
    </>
  );
};

export default StatisticsDisplay;
