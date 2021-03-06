import React, { useState, useEffect } from "react";
import { Button, Toolbar } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import Shuffle from "@material-ui/icons/Shuffle";
import DataSourcesDialog from "../components/dialogs/DataSourcesDialog";
import { useDispatch, useSelector } from "react-redux";
import { getDataSources } from "../redux/actions/actionCreators";
import SettingsDialog from "../components/dialogs/SettingsDialog";
import { IState } from "../redux/storeTypes";
import { makeStyles } from "@material-ui/core/styles";
import { PlayForWork } from "@material-ui/icons";
import DataSourcePollsDialog from "../components/dialogs/DataSourcePollsDialog";

const NavBar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dataSourcesOpen, setDataSourcesOpen] = useState(false);
  const [dataSourcePollsOpen, setDataSourcePollsOpen] = useState(false);
  const dataSources = useSelector((state: IState) => state.dataSources);
  const dataSourcePolls = useSelector((state: IState) => state.dataSourcePolls);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataSources());
  }, [dispatch]);

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  const handleDataSourcesOpen = () => {
    setDataSourcesOpen(true);
  };

  const handleDataSourcesClose = () => {
    setDataSourcesOpen(false);
  };

  const handleDataSourcePollsOpen = () => {
    setDataSourcePollsOpen(true);
  };

  const handleDataSourcePollsClose = () => {
    setDataSourcePollsOpen(false);
  };

  const refreshDataSources = () => {
    dispatch(getDataSources());
  };

  const useStyles = makeStyles((theme) => ({
    Button: {
      marginLeft: 32,
    },
  }));

  const styles = useStyles();

  return (
    <div>
      <Toolbar>
        <Button
          className={styles.Button}
          variant="outlined"
          startIcon={<SettingsIcon />}
          onClick={handleSettingsOpen}
        >
          Settings
        </Button>
        <Button
          className={styles.Button}
          variant="outlined"
          startIcon={<Shuffle />}
          onClick={handleDataSourcesOpen}
        >
          Data Sources
        </Button>

        <Button
          className={styles.Button}
          variant="outlined"
          startIcon={<PlayForWork />}
          onClick={handleDataSourcePollsOpen}
        >
          Data Source Feed Mapping
        </Button>
        <SettingsDialog open={settingsOpen} handleClose={handleSettingsClose} />
        <DataSourcesDialog
          dataSources={dataSources}
          open={dataSourcesOpen}
          handleClose={handleDataSourcesClose}
          refreshDataSources={refreshDataSources}
        />
        <DataSourcePollsDialog
          open={dataSourcePollsOpen}
          handleClose={handleDataSourcePollsClose}
          dataSources={dataSources}
          dataSourcePolls={dataSourcePolls}
        />
      </Toolbar>
    </div>
  );
};

export default NavBar;
