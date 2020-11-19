import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatistics, getBenchmarkDefaultStatistics } from "../redux/actions";
import StatisticsDisplay from "../components/StatisticsDisplay";

const DisplayPane = () => {
  const activeFinObj = useSelector((state) => state.activeFinObj);
  const activeBenchmarkDefaultFinObj = useSelector(
    (state) => state.activeBenchmarkDefaultFinObj
  );
  const statistics = useSelector((state) => state.statistics);
  const benchmarkDefaultStatistics = useSelector(
    (state) => state.benchmarkDefaultStatistics
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatistics(activeFinObj.foid));
    dispatch(getBenchmarkDefaultStatistics(activeBenchmarkDefaultFinObj.foid));
  }, [dispatch, activeFinObj, activeBenchmarkDefaultFinObj]);

  return (
    <StatisticsDisplay
      activeFinObj={activeFinObj}
      activeBenchmarkDefaultFinObj={activeBenchmarkDefaultFinObj}
      statistics={statistics}
      benchmarkDefaultStatistics={benchmarkDefaultStatistics}
    />
  );
};

export default DisplayPane;
