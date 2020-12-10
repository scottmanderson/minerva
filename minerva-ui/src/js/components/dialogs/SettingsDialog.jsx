import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  TextField,
} from "@material-ui/core";

import { apiRoot } from "../../helpers";

const SettingsDialog = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={props.open}
        onClose={props.handleClose}
      >
        <DialogTitle id="Settings">Settings</DialogTitle>
        <DialogContent>
          <form>
            <FormLabel>Default Benchmark</FormLabel>
            <TextField id="defaultBenchmark" />
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Update</Button>
          <Button onClick={props.handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SettingsDialog;
