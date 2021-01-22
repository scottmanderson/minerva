import React from "react";
import {
  Box,
  Button,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { apiRoot } from "../../helpers";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 10,
    padding: 10,
  },
}));

const GeneralDisplay = (props) => {
  const styles = useStyles();
  const handleSubmitAddFeed = (event) => {
    event.preventDefault();
    let sourceMatch = props.dataSources.find(
      (obj) => obj.name === event.target["dataSourceName"].value
    );
    let newDSP = {
      source_id: sourceMatch.source_id,
      foid: props.activeFinObj.foid,
      data_source_code: event.target["data_source_code"].value,
    };
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDSP),
    };
    fetch(apiRoot + "/sources/polls", request).then((response) =>
      response.json()
    );
  };
  return (
    <div>
      <Typography>
        <Paper className={styles.paper}>
          <h3>{props.activeFinObj.name}</h3>
          <p>Ticker: {props.activeFinObj.ticker}</p>
          <p>
            Default Benchmark:{" "}
            {props.finObjsLookup[props.activeFinObj.benchmark]}
          </p>
        </Paper>
        <Paper className={styles.paper}>
          <h4>Add Feed</h4>
          <form onSubmit={handleSubmitAddFeed}>
            <Select
              labelId="Data Source"
              id="dataSourceName"
              name="dataSourceName"
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
