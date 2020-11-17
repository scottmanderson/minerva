import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatistics, getActiveFinObjID } from "../redux/actions";
import StatisticsDisplay from "../components/StatisticsDisplay";

const DisplayPane = () => {
  const activeFinObj = useSelector((state) => state.activeFinObj);
  const statistics = useSelector((state) => state.statistics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatistics(activeFinObj.foid));
  }, [dispatch, activeFinObj.foid]);

  return (
    <StatisticsDisplay activeFinObj={activeFinObj} statistics={statistics} />
  );
};

export default DisplayPane;
