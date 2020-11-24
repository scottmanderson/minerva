import React from "react";
import Plot from "react-plotly.js";
import { useTheme } from "@material-ui/core";

const ReturnsChart = (props) => {
  const theme = useTheme();
  let x = props.statistics.cumulative_x;
  let y = props.statistics.cumulative_y;
  let yReturns = props.statistics.ts_y;

  return (
    <div>
      <Plot
        style={{ width: "100%" }}
        data={[
          {
            name: "Growth of a Dollar",
            x: x,
            y: y,
            type: "scatter",
            line: { color: theme.palette.text.secondary },
          },
          {
            name: "Returns",
            x: x,
            y: yReturns,
            yaxis: "y2",
            type: "bar",
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
            title: "Growth of a Dollar",
            color: theme.palette.text.primary,
          },
          yaxis2: {
            title: "Returns",
            color: theme.palette.text.primary,
            range: [-0.5, 0.5],
            tickformat: ",.0%",
            overlaying: "y",
            side: "right",
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
