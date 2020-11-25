import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const DataSourcesDialog = (props) => {
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle id="dataSourcesDialog">Data Source Management</DialogTitle>
        <DialogContent>
          <DialogContentText>Data Source Ranking</DialogContentText>
          <form noValidate autoComplete="off">
            <DialogActions>
              <Button onClick={props.handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataSourcesDialog;
