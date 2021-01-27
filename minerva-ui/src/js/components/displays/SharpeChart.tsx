import React from "react";
import Plot from "react-plotly.js";
import { useTheme } from "@material-ui/core";
import { IFinObj, IStatistics } from "../../redux/storeTypes";
import { IFinObjLookup } from "../../globalTypes";

interface Props {
  statistics: IStatistics;
  activeFinObj: IFinObj;
  finObjLookup: IFinObjLookup;
}

const SharpChart: React.FC<Props> = ({
  finObjLookup,
  activeFinObj,
  statistics,
}) => {
  const theme = useTheme();
  let x = statistics.roll_stat?.rolling_sharpe_x;
  let y = statistics.roll_stat?.rolling_sharpe_y;

  let xBench = statistics.bm_roll_stat?.rolling_sharpe_x;
  let yBench = statistics.bm_roll_stat?.rolling_sharpe_y;

  return (
    <div>
      <Plot
        style={{ width: "95%", marginTop: "30px" }}
        data={[
          {
            name: activeFinObj.report_name,
            x: x,
            y: y,
            type: "scatter",
            line: { color: theme.palette.secondary.main },
          },
          {
            name: activeFinObj.benchmark
              ? finObjLookup[activeFinObj.benchmark] + " (Benchmark)"
              : "Benchmark",
            x: xBench,
            y: yBench,
            type: "scatter",
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
            title: "Sharpe Ratio",
            color: theme.palette.text.primary,
          },
          legend: {
            x: 0.45,
            y: -0.3,
            font: {
              color: theme.palette.text.primary,
            },
          },
          title: {
            text: "Asset Sharpe Ratio",
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

export default SharpChart;
