import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  Grid,
  TextField,
} from "@material-ui/core";

import { apiRoot } from "../../helpers";

interface Props {
  handleClose: () => void;
  open: boolean;
}

const SettingsDialog: React.FC<Props> = ({ handleClose, open }) => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
  };
  return (
    <div>
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
        <DialogTitle id="Settings">Settings</DialogTitle>
        <DialogContent style={{ overflow: "hidden" }}>
          <form>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="baseline"
            >
              <Grid item container xs={12} spacing={3}>
                <Grid item xs={3}>
                  <FormLabel>Default Risk Free Asset</FormLabel>
                </Grid>
                <Grid item xs={3}>
                  <TextField id="defaultRiskFree" />
                </Grid>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Update</Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SettingsDialog;
