import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../redux/storeTypes";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { getDataSourcePolls } from "../../redux/actions/actionCreators";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const DataSourcePollsDialog: React.FC<Props> = ({ open, handleClose }) => {
  const dataSourcePolls = useSelector((state: IState) => state.dataSourcePolls);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataSourcePolls());
  }, [dispatch]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="dataSourcePollsDialog">
          Data Source Updates Mapping
        </DialogTitle>
        <DialogContent>
          <h3>Manage Update Data Source Update Mappings</h3>
          <form></form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataSourcePollsDialog;
