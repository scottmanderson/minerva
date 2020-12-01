import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { apiRoot } from "../helpers";

const GeneralDisplay = (props) => {
  const handleSubmitAddFeed = (event) => {
    event.preventDefault();
    let newDSP = {
      source_id: event.target["source_id"].value,
      foid: event.target["foid"].value,
      data_source_code: event.target["data_source_code"].value,
    };
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDSP),
    };
    fetch(
      apiRoot + "/sources/polls",
      request.then((response) => response.json())
    );
  };
  return (
    <div>
      <Typography>
        <h3>{props.activeFinObj.name}</h3>
        <p>Ticker: {props.activeFinObj.ticker}</p>
        <p>Default Benchmark: {props.activeFinObj.benchmark}</p>
        <Paper>
          <h4>Add Feed</h4>
          <form onSubmit={handleSubmitAddFeed}>
            <Select
              labelId="Data Source"
              id="dataSource"
              defaultValue="--Select One--"
            >
              <MenuItem id={"dsDefault"} value="--Select One--">
                --Select One--
              </MenuItem>
              {props.dataSources.map((ds) => (
                <MenuItem
                  key={"ds" + ds.source_id}
                  id={"ds" + ds.source_id}
                  value={ds.name}
                >
                  {ds.name}
                </MenuItem>
              ))}
            </Select>
            <br />
            <TextField
              id="data_source_code"
              label="Code"
              defaultValue={props.activeFinObj.ticker}
            />
            <Button type="submit">Add Feed</Button>
          </form>
        </Paper>
      </Typography>
    </div>
  );
};

export default GeneralDisplay;
