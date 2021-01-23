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

import { apiRoot } from "../../helpers";
import { IDataSource } from "../../redux/storeTypes";

interface Props {
  dataSources: IDataSource[];
  handleClose: () => void;
  open: boolean;
  refreshDataSources: () => any;
}

const DataSourcesDialog: React.FC<Props> = ({
  dataSources,
  handleClose,
  open,
  refreshDataSources,
}) => {
  const [dataSourceAddOpen, setDataSourceAddOpen] = useState(false);

  const handleSourceAddOpen = () => {
    setDataSourceAddOpen(true);
  };
  const handleSourceAddClose = () => {
    setDataSourceAddOpen(false);
  };

  const handleSubmitAdd = (event: any) => {
    event.preventDefault();
    let newSource = {
      name: event.target["dsnNew"].value,
      hierarchy_rank: dataSources.length + 1,
      api_key: "",
    };
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSource),
    };
    fetch(apiRoot + "/sources", request)
      .then((response) => response.json())
      .then(refreshDataSources());
    handleSourceAddClose();
  };

  const handleSubmitAll = (event: any) => {
    event.preventDefault();

    for (let source of dataSources) {
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
    refreshDataSources();
    handleClose();
  };

  return (
    <div>
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
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
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={4}>
                  Data Source Name
                </Grid>
                <Grid item xs={2}>
                  Source Rank
                </Grid>
                <Grid item xs={5}>
                  API Key
                </Grid>
              </Grid>
              <br />
              {dataSources.map((el) => (
                <>
                  <Grid container item xs={12} spacing={3}>
                    <Grid item xs={4}>
                      <TextField
                        id={"dsn" + el.source_id}
                        key={"dsn" + el.source_id}
                        defaultValue={el.name}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField
                        id={"dsr" + el.source_id}
                        key={"dsr" + el.source_id}
                        defaultValue={el.hierarchy_rank}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        id={"dsk" + el.source_id}
                        key={"dsk" + el.source_id}
                        defaultValue={el.api_key}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </>
              ))}
              <DialogActions>
                <br />
                <Button type="submit">Update</Button>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
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
