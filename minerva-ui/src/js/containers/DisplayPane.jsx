import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatistics, getBenchmarkDefaultStatistics } from "../redux/actions";
import StatisticsDisplay from "../components/StatisticsDisplay";

const DisplayPane = () => {
  const activeFinObj = useSelector((state) => state.activeFinObj);
  const statistics = useSelector((state) => state.statistics);
  const benchmarkDefaultStatistics = useSelector(
    (state) => state.benchmarkDefaultStatistics
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatistics(activeFinObj.foid));
    if (activeFinObj.benchmark) {
      dispatch(getBenchmarkDefaultStatistics(activeFinObj.benchmark));
    }
  }, [dispatch, activeFinObj]);

  return (
    <StatisticsDisplay
      activeFinObj={activeFinObj}
      statistics={statistics}
      benchmarkDefultStatistics={benchmarkDefaultStatistics}
    />
  );
};

export default DisplayPane;
