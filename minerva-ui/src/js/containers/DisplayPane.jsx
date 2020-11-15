import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatistics, getActiveFinObjID } from "../redux/actions";
import StatisticsDisplay from "../components/StatisticsDisplay";

const DisplayPane = () => {
  const activeFinObjID = useSelector((state) => state.activeFinObjID);
  const statistics = useSelector((state) => state.statistics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatistics(activeFinObjID));
  }, [dispatch, activeFinObjID]);

  return (
    <StatisticsDisplay
      activeFinObjID={activeFinObjID}
      statistics={statistics}
    />
  );
};

export default DisplayPane;
