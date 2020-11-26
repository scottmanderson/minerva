import React from "react";
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
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="md"
        open={props.open}
        onClose={props.handleClose}
      >
        <DialogTitle id="dataSourcesDialog">Data Source Management</DialogTitle>
        <DialogContent>
          <form autoComplete="off">
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
                      <TextField key={"dsl" + el} defaultValue={el.name} />
                    </Grid>
                    <Grid item xs={4} spacing={3}>
                      <TextField
                        key={"dsr" + el}
                        defaultValue={el.hierarchy_rank}
                      />
                    </Grid>
                    <Grid item xs={4} spacing={3}>
                      <TextField key={"dsk" + el} defaultValue={el.api_key} />
                    </Grid>
                  </Grid>
                </>
              ))}
              <DialogActions>
                <Button onClick={props.handleClose} color="secondary">
                  Cancel
                </Button>
                <Button type="submit">Update</Button>
              </DialogActions>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataSourcesDialog;
