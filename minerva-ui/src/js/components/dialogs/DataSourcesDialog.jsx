import React, { useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  Grid,
  TextField,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const DataSourcesDialog = (props) => {
  const apiRoot = process.env.API_ROOT || "http://127.0.0.1:5000";
  const [dataSourceAddOpen, setDataSourceAddOpen] = useState(false);

  const handleSourceAddOpen = () => {
    setDataSourceAddOpen(true);
  };
  const handleSourceAddClose = () => {
    setDataSourceAddOpen(false);
    window.location.reload(false);
  };

  const handleSubmitAdd = (event) => {
    event.preventDefault();
    let newSource = {
      name: event.target["dsnNew"].value,
      hierarchy_rank: props.dataSources.length + 1,
      api_key: "",
    };
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSource),
    };
    fetch(apiRoot + "/sources", request)
      .then((response) => response.json())
      .then(props.refreshDataSources());
    handleSourceAddClose();
  };

  const handleSubmitAll = (event) => {
    event.preventDefault();

    for (let source of props.dataSources) {
      let sourceUpdate = {
        name: event.target[`dsn${source.source_id}`].value,
        hierarchy_rank: event.target[`dsr${source.source_id}`].value,
        api_key: event.target[`dsk${source.source_id}`].value,
      };
      const request = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sourceUpdate),
      };
      fetch(
        apiRoot + "/sources/" + source.source_id,
        request
      ).then((response) => response.json());
    }
    props.refreshDataSources();
    props.handleClose();
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={props.open}
        onClose={props.handleClose}
      >
        <DialogTitle id="dataSourcesDialog">Data Source Management</DialogTitle>
        <DialogContent>
          <h3>Manage Data Sources</h3>
          <form onSubmit={handleSubmitAll} autoComplete="off">
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="baseline"
            >
              <Grid container item xs={12}>
                <Grid item xs={4}>
                  Data Source Name
                </Grid>
                <Grid item xs={4}>
                  Source Rank
                </Grid>
                <Grid item xs={4}>
                  API Key
                </Grid>
              </Grid>
              <br />
              {props.dataSources.map((el) => (
                <>
                  <Grid container item xs={12}>
                    <Grid item xs={4} spacing={3}>
                      <TextField
                        id={"dsn" + el.source_id}
                        key={"dsn" + el.source_id}
                        defaultValue={el.name}
                      />
                    </Grid>
                    <Grid item xs={4} spacing={3}>
                      <TextField
                        id={"dsr" + el.source_id}
                        key={"dsr" + el.source_id}
                        defaultValue={el.hierarchy_rank}
                      />
                    </Grid>
                    <Grid item xs={4} spacing={3}>
                      <TextField
                        id={"dsk" + el.source_id}
                        key={"dsk" + el.source_id}
                        defaultValue={el.api_key}
                      />
                    </Grid>
                  </Grid>
                </>
              ))}
              <DialogActions>
                <br />
                <Button onClick={props.handleClose} color="secondary">
                  Cancel
                </Button>
                <Button type="submit">Update</Button>
              </DialogActions>
            </Grid>
          </form>
          <br />
          <h3>Add New Data Source</h3>
          <Dialog open={dataSourceAddOpen} onClose={handleSourceAddClose}>
            {
              <form onSubmit={handleSubmitAdd}>
                <TextField id={"dsnNew"} key={"dsnNew"} />
                <Button type="submit">Add</Button>
              </form>
            }
          </Dialog>

          <Button variant="outlined" onClick={handleSourceAddOpen}>
            Add
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataSourcesDialog;