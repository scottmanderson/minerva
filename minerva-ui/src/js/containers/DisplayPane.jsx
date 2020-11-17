import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStatistics,
  getActiveFinObjID,
  getBenchmarkDefaultStatistics,
} from "../redux/actions";
import StatisticsDisplay from "../components/StatisticsDisplay";

const DisplayPane = () => {
  const activeFinObj = useSelector((state) => state.activeFinObj);
  const statistics = useSelector((state) => state.statistics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatistics(activeFinObj.foid));
    if (activeFinObj.benchmark) {
      dispatch(getBenchmarkDefaultStatistics(activeFinObj.benchmark));
    }
  }, [dispatch, activeFinObj]);

  return (
    <StatisticsDisplay activeFinObj={activeFinObj} statistics={statistics} />
  );
};

export default DisplayPane;
