import React from "react";
import ReturnsChart from "./ReturnsChart";
import StatisticsDisplay from "./StatisticsDisplay";

const GraphDisplay = (props) => {
  return (
    <div>
      <ReturnsChart
        activeFinObj={props.activeFinObj}
        activeBenchmarkDefaultFinObj={props.activeBenchmarkDefaultFinObj}
        statistics={props.statistics}
      />
    </div>
  );
};

export default GraphDisplay;
