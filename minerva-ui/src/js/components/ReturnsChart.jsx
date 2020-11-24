import React from "react";
import Plot from "react-plotly.js";
import { useTheme } from "@material-ui/core";

const ReturnsChart = (props) => {
  const theme = useTheme();
  let x = props.statistics.cumulative_x;
  let y = props.statistics.cumulative_y;

  return (
    <div>
      <Plot
        style={{ width: "100%" }}
        data={[
          {
            x: x,
            y: y,
          },
        ]}
        layout={{
          plot_bgcolor: theme.palette.background.default,
          paper_bgcolor: theme.palette.background.paper,
          xaxis: {
            title: "Date",
            color: theme.palette.text.primary,
          },
          yaxis: {
            title: "Cumulative Return",
            color: theme.palette.text.primary,
          },
          legend: {
            font: {
              color: theme.palette.text.primary,
            },
          },
          title: {
            font: {
              color: theme.palette.text.primary,
            },
          },
          scene: {
            xaxis: {
              color: theme.palette.text.primary,
            },
            yaxis: {
              color: theme.palette.text.primary,
            },
            zaxis: {
              color: theme.palette.text.primary,
            },
          },
        }}
      />
    </div>
  );
};

export default ReturnsChart;
