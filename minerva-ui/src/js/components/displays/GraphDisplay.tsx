import React from "react";
import ReturnsChart from "./ReturnsChart";
import { IFinObj, IStatistics } from "../../redux/storeTypes";

interface Props {
  activeBenchmarkDefaultFinObj: IFinObj;
  activeFinObj: IFinObj;
  statistics: IStatistics;
}

const GraphDisplay: React.FC<Props> = ({
  activeBenchmarkDefaultFinObj,
  activeFinObj,
  statistics,
}) => (
  <div>
    <ReturnsChart statistics={statistics} />
  </div>
);

export default GraphDisplay;
