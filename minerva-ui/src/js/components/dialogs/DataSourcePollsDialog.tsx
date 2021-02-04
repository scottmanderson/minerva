import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IDataSource, IDataSourcePoll, IState } from "../../redux/storeTypes";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { getDataSourcePolls } from "../../redux/actions/actionCreators";
import {
  apiRoot,
  makeDataSourceLookup,
  makeDataSourceReverseLookup,
  makeFinObjLookup,
  makeFinObjReverseLookup,
} from "../../helpers";

interface Props {
  open: boolean;
  handleClose: () => void;
  dataSources: IDataSource[];
  dataSourcePolls: IDataSourcePoll[];
}

interface IFormState {
  [key: string]: string | number;
}

const DataSourcePollsDialog: React.FC<Props> = ({
  open,
  handleClose,
  dataSources,
  dataSourcePolls,
}) => {
  const finObjs = useSelector((state: IState) => state.finObjs);
  const dispatch = useDispatch();

  const finObjsLookup = makeFinObjLookup(finObjs);
  const reverseFinObjsLookup = makeFinObjReverseLookup(finObjs);
  const dataSourceLookup = makeDataSourceLookup(dataSources);
  const reverseDataSourceLookup = makeDataSourceReverseLookup(dataSources);

  const handleSubmitAll = (event: any) => {
    event.preventDefault();
    for (let dsp of dataSourcePolls) {
      console.log(dsp);
      console.log(event);
      let sourcePollUpdate = {
        source_id: event.target[`dsps${dsp.ds_poll_id}`].value,
        foid: event.target[`dspf${dsp.ds_poll_id}`].value,
        data_source_code: event.target[`dspc${dsp.ds_poll_id}`].value,
      };
      const request = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sourcePollUpdate),
      };
      fetch(
        apiRoot + "/sources/polls/" + dsp.ds_poll_id,
        request
      ).then((response) => response.json());
    }
    handleClose();
  };

  useEffect(() => {
    dispatch(getDataSourcePolls());
  }, [dispatch]);

  return (
    <div>
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
        <DialogTitle id="dataSourcePollsDialog">
          Data Source Updates Mapping
        </DialogTitle>
        <DialogContent>
          <h3>Manage Update Data Source Update Mappings</h3>
          <form onSubmit={handleSubmitAll} autoComplete="off">
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="baseline"
            >
              <Grid item xs={4}>
                Asset
              </Grid>
              <Grid item xs={4}>
                Data Source
              </Grid>
              <Grid item xs={4}>
                Data Source Asset Code
              </Grid>
            </Grid>
            {dataSourcePolls.map((el) => (
              <Grid
                container
                item
                xs={12}
                spacing={3}
                key={"dspgrid" + el.ds_poll_id}
              >
                <Grid item xs={4}>
                  <TextField
                    id={"dspf" + el.ds_poll_id}
                    key={"dspf" + el.ds_poll_id}
                    select
                    value={el.foid}
                    defaultValue={el.foid}
                    fullWidth
                  >
                    {finObjs.map((fo) => (
                      <MenuItem key={"fomu" + fo.foid} value={fo.foid}>
                        {fo.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id={"dsps" + el.ds_poll_id}
                    key={"dsps" + el.ds_poll_id}
                    select
                    value={el.source_id}
                    defaultValue={el.source_id}
                    fullWidth
                  >
                    {dataSources.map((ds) => (
                      <MenuItem
                        key={"dsmu" + ds.source_id}
                        value={ds.source_id}
                      >
                        {ds.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id={"dspc" + el.ds_poll_id}
                    key={"dspc" + el.ds_poll_id}
                    defaultValue={el.data_source_code}
                    fullWidth
                  />
                </Grid>
              </Grid>
            ))}
            <DialogActions>
              <br />
              <Button type="submit">Update</Button>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataSourcePollsDialog;
