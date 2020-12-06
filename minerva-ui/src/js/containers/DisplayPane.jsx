import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { getStatistics, getBenchmarkDefaultStatistics } from "../redux/actions";
import StatisticsDisplay from "../components/StatisticsDisplay";
import GeneralDisplay from "../components/GeneralDisplay";
import { nullBenchmarkDefaultStatistics } from "../redux/nullStateStubs";

const DisplayPane = () => {
  const activeFinObj = useSelector((state) => state.activeFinObj);
  const activeBenchmarkDefaultFinObj = useSelector(
    (state) => state.activeBenchmarkDefaultFinObj
  );
  const statistics = useSelector((state) => state.statistics);
  const benchmarkDefaultStatistics = useSelector(
    (state) => state.benchmarkDefaultStatistics
  );
  const dataSources = useSelector((state) => state.dataSources);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getStatistics(
        activeFinObj.foid,
        "M",
        null,
        null,
        activeBenchmarkDefaultFinObj.foid
      )
    );
  }, [dispatch, activeFinObj, activeBenchmarkDefaultFinObj]);

  useEffect(() => {
    dispatch(
      getBenchmarkDefaultStatistics(
        activeBenchmarkDefaultFinObj.foid,
        null,
        statistics.cumulative_x[0]
      )
    );
  }, [dispatch, activeBenchmarkDefaultFinObj, statistics.cumulative_x]);

  const [value, setValue] = React.useState("2");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <TabContext value={value}>
        <TabList onChange={handleChange}>
          <Tab label="General" value="1" />
          <Tab label="Statistics" value="2" />
        </TabList>
        <TabPanel value="1">
          <GeneralDisplay
            activeFinObj={activeFinObj}
            dataSources={dataSources}
          />
        </TabPanel>
        <TabPanel value="2">
          <StatisticsDisplay
            activeFinObj={activeFinObj}
            activeBenchmarkDefaultFinObj={activeBenchmarkDefaultFinObj}
            statistics={statistics}
            benchmarkDefaultStatistics={benchmarkDefaultStatistics}
          />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default DisplayPane;
