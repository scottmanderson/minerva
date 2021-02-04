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
import { IFinObj, IDataSource } from "../../redux/storeTypes";
import { IFinObjLookup } from "../../globalTypes";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 10,
    padding: 10,
  },
}));

interface Props {
  activeFinObj: IFinObj;
  dataSources: IDataSource[];
  finObjsLookup: IFinObjLookup;
}

const GeneralDisplay: React.FC<Props> = ({
  activeFinObj,
  dataSources,
  finObjsLookup,
}) => {
  const styles = useStyles();
  const handleSubmitAddFeed = (event: any) => {
    let newDSP = {
      source_id: event.target["dataSourceName"].value,
      foid: activeFinObj.foid,
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
          <form>
            <h3>{activeFinObj.name}</h3>
            <p>Ticker: {activeFinObj.ticker}</p>
            <p>
              Default Benchmark:{" "}
              {activeFinObj.benchmark
                ? finObjsLookup[activeFinObj.benchmark]
                : "None"}
            </p>
          </form>
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
              {dataSources.map((ds) => (
                <MenuItem
                  key={"ds" + ds.source_id}
                  id={"ds" + ds.source_id}
                  value={ds.source_id}
                >
                  {ds.name}
                </MenuItem>
              ))}
            </Select>
            <br />
            <TextField
              id="data_source_code"
              label="Code"
              defaultValue={activeFinObj.ticker}
            />
            <Button type="submit">Add Feed</Button>
          </form>
        </Paper>
      </Typography>
    </div>
  );
};

export default GeneralDisplay;
