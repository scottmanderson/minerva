import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { getStatistics } from "../redux/actions/actionCreators";
import StatisticsDisplay from "../components/displays/StatisticsDisplay";
import GeneralDisplay from "../components/displays/GeneralDisplay";
import ReturnsChartDisplay from "../components/displays/ReturnsChartDisplay";
import VolatilityChart from "../components/displays/VolatilityChart";
import SharpeChart from "../components/displays/SharpeChart";
import { IState } from "../redux/storeTypes";
import { IFinObjLookup } from "../globalTypes";
import DataTab from "../components/displays/DataTab";
import { makeFinObjLookup } from "../helpers";

const DisplayPane = () => {
  const activeFinObj = useSelector((state: IState) => state.activeFinObj);
  const finObjs = useSelector((state: IState) => state.finObjs);
  const statistics = useSelector((state: IState) => state.statistics);
  const dataSources = useSelector((state: IState) => state.dataSources);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getStatistics(
        activeFinObj.foid as number,
        "M",
        undefined,
        undefined,
        activeFinObj.benchmark
      )
    );
  }, [dispatch, activeFinObj]);

  const [value, setValue] = React.useState("Statistics");

  const finObjLookup: IFinObjLookup = makeFinObjLookup(finObjs);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
      <TabContext value={value}>
        <TabList onChange={handleChange}>
          <Tab label="Statistics" value="Statistics" />
          <Tab label="Growth" value="Growth" />
          <Tab label="Volatility" value="Volatility" />
          <Tab label="Sharpe" value="Sharpe" />
          <Tab label="Data" value="Data" />
          <Tab label="Customize" value="Customize" />
        </TabList>
        <TabPanel value="Customize">
          <GeneralDisplay
            activeFinObj={activeFinObj}
            dataSources={dataSources}
            finObjsLookup={finObjLookup}
          />
        </TabPanel>
        <TabPanel value="Statistics">
          <StatisticsDisplay
            activeFinObj={activeFinObj}
            statistics={statistics}
          />
        </TabPanel>
        <TabPanel value="Growth">
          <ReturnsChartDisplay
            activeFinObj={activeFinObj}
            statistics={statistics}
          />
        </TabPanel>
        <TabPanel value="Volatility">
          <VolatilityChart
            activeFinObj={activeFinObj}
            finObjLookup={finObjLookup}
            statistics={statistics}
          />
        </TabPanel>
        <TabPanel value="Sharpe">
          <SharpeChart
            activeFinObj={activeFinObj}
            finObjLookup={finObjLookup}
            statistics={statistics}
          />
        </TabPanel>
        <TabPanel value="Data">
          <DataTab />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default DisplayPane;
