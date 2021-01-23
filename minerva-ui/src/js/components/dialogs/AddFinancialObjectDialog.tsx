import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";

import { apiRoot } from "../../helpers";

interface Props {
  handleClose: () => void;
  open: boolean;
}

const AddFinancialObjectDialog: React.FC<Props> = ({ handleClose, open }) => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    let newFO = {
      name: event.target["name"].value,
      report_name: event.target["report_name"].value,
      ticker: event.target["ticker"].value,
    };
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFO),
    };
    fetch(apiRoot + "/fo", request).then((response) => response.json());
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Financial Object</DialogTitle>
      <form onSubmit={handleSubmit} autoComplete="off">
        <DialogContent>
          <TextField id="name" label="Name" />
          <br />
          <TextField id="report_name" label="Report Name" />
          <br />
          <TextField id="ticker" label="Ticker" />
        </DialogContent>
        <DialogActions>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddFinancialObjectDialog;
