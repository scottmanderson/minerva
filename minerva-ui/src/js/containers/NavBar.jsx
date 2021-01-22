import React, { useState, useEffect } from "react";
import { AppBar, Button, Modal, Toolbar } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import Shuffle from "@material-ui/icons/Shuffle";
import DataSourcesDialog from "../components/dialogs/DataSourcesDialog";
import { useDispatch, useSelector } from "react-redux";
import { getDataSources } from "../redux/actions/actionCreators";
import SettingsDialog from "../components/dialogs/SettingsDialog";

const NavBar = () => {
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [dataSourcesOpen, setDataSourcesOpen] = useState(false);
  const dataSources = useSelector((state) => state.dataSources);
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

  const refreshDataSources = () => {
    dispatch(getDataSources());
  };

  return (
    <div>
      <Toolbar>
        <Button
          style={{ marginLeft: 32 }}
          variant="outlined"
          startIcon={<SettingsIcon />}
          onClick={handleSettingsOpen}
        >
          Settings
        </Button>
        <SettingsDialog open={settingsOpen} handleClose={handleSettingsClose} />
        <Button
          style={{ marginLeft: 32 }}
          variant="outlined"
          startIcon={<Shuffle />}
          onClick={handleDataSourcesOpen}
        >
          Data Sources
        </Button>
        <DataSourcesDialog
          dataSources={dataSources}
          open={dataSourcesOpen}
          handleOpen={handleDataSourcesOpen}
          handleClose={handleDataSourcesClose}
          refreshDataSources={refreshDataSources}
        />
      </Toolbar>
    </div>
  );
};

export default NavBar;
