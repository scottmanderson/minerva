import React from "react";
import Plot from "react-plotly.js";
import { useTheme } from "@material-ui/core";
import { IStatistics } from "../../redux/storeTypes";

interface Props {
  statistics: IStatistics;
}

const ReturnsChart: React.FC<Props> = ({ statistics }) => {
  const theme = useTheme();
  let x = statistics.cumulative_x;
  let y = statistics.cumulative_y;
  let yReturns = statistics.ts_y;

  let xBench = statistics.bm_cumulative_x;
  let yBench = statistics.bm_cumulative_y;

  return (
    <div>
      <Plot
        style={{ width: "95%", marginTop: "30px" }}
        data={[
          {
            name: "Growth of a Dollar",
            x: x,
            y: y,
            type: "scatter",
            line: { color: theme.palette.text.secondary },
          },
          {
            name: "Benchmark",
            x: xBench,
            y: yBench,
            type: "scatter",
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
          height: 650,
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
            hoverformat: ".2%",
          },
          legend: {
            x: 0.45,
            y: -0.3,
            font: {
              color: theme.palette.text.primary,
            },
          },
          title: {
            text: "Growth of a Dollar",
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
