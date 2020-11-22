import React from "react";
import Plot from "react-plotly.js";
import { parse } from "dotenv";

const ReturnsChart = (props) => {
  let x = props.statistics.cumulative_x;
  let y = props.statistics.cumulative_y;

  return (
    <div>
      <Plot
        data={[
          {
            x: x,
            y: y,
          },
        ]}
      />
    </div>
  );
};

export default ReturnsChart;
