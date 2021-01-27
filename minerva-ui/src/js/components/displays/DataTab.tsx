import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState, ITSData } from "../../redux/storeTypes";
import { getTSData } from "../../redux/actions/actionCreators";
import { DataGrid } from "@material-ui/data-grid";

interface ITSDataTabRow extends ITSData {
  id: number | string;
}

const DataTab = () => {
  const activeFinObj = useSelector((state: IState) => state.activeFinObj);
  const tsDataActiveFinObj = useSelector(
    (state: IState) => state.tsDataActiveFinObj
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTSData(activeFinObj.foid as number));
  }, [dispatch, activeFinObj]);

  const columns = [
    { field: "tsid", headerName: "TS ID", width: 120 },
    { field: "dt", headerName: "Datetime", width: 250 },
    { field: "level", headerName: "Value", width: 250 },
    { field: "source", headerName: "Source", width: 250 },
  ];

  tsDataActiveFinObj.forEach((item, i) => {
    item.id = i + 1;
  });

  let rows: ITSDataTabRow[] = tsDataActiveFinObj;

  return (
    <div style={{ height: 800, width: "100%" }}>
      <DataGrid columns={columns} rows={tsDataActiveFinObj} pageSize={50} />
    </div>
  );
};

export default DataTab;
