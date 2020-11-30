import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";

const AddFinancialObjectDialog = (props) => {
  const apiRoot = process.env.API_ROOT || "http://127.0.0.1:5000";

  const handleSubmit = (event) => {
    event.preventDefault();
    let newFO = {
      name: event.target["name"].value,
      report_name: event.target["report_name"].value,
      ticker: event.target["ticker"].value,
      benchmark: event.target["benchmark"].value,
    };
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFO),
    };
    fetch(apiRoot + "/fo", request).then((response) => response.json());
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Add Financial Object</DialogTitle>
      <form onSubmit={handleSubmit} autoComplete="off">
        <DialogContent>
          <TextField id="name" label="Name" />
          <br />
          <TextField id="report_name" label="Report Name" />
          <br />
          <TextField id="ticker" label="Ticker" />
          <br />
          <TextField id="benchmark" label="Benchmark" />
        </DialogContent>
        <DialogActions>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddFinancialObjectDialog;