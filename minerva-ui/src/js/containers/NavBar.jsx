import React, { useState, useEffect } from "react";
import { AppBar, Button, Modal, Toolbar } from "@material-ui/core";
import DataSourcesDialog from "../components/dialogs/DataSourcesDialog";
import { useDispatch, useSelector } from "react-redux";
import { getDataSources } from "../redux/actions";

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

  const settingsBody = (
    <div>
      <h2>Settings</h2>
    </div>
  );

  const handleDataSourcesOpen = () => {
    setDataSourcesOpen(true);
  };

  const handleDataSourcesClose = () => {
    setDataSourcesOpen(false);
    dispatch(getDataSources());
  };

  return (
    <div>
      <Toolbar>
        <Button
          style={{ marginLeft: 32 }}
          variant="outlined"
          onClick={handleSettingsOpen}
        >
          Settings
        </Button>
        <Modal open={settingsOpen} onClose={handleSettingsClose}>
          {settingsBody}
        </Modal>
        <Button
          style={{ marginLeft: 32 }}
          variant="outlined"
          onClick={handleDataSourcesOpen}
        >
          Data Feeds
        </Button>
        <DataSourcesDialog
          dataSources={dataSources}
          open={dataSourcesOpen}
          handleOpen={handleDataSourcesOpen}
          handleClose={handleDataSourcesClose}
        />
      </Toolbar>
    </div>
  );
};

export default NavBar;
