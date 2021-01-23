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
        <DialogContent>
          <form>
            <FormLabel>Default Risk Free Asset</FormLabel>
            <TextField id="defaultRiskFree" />
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
