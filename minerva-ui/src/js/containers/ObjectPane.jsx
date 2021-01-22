import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import {
  getFinObjs,
  setActiveFinObj,
  setActiveBenchmarkDefaultFinObj,
} from "../redux/actions/actionCreators";
import ObjectList from "../components/displays/ObjectList";
import { nullActiveBenchmarkDefaultFinObj } from "../redux/nullStateStubs";
import Typography from "@material-ui/core/Typography";
import AddFinancialObjectDialog from "../components/dialogs/AddFinancialObjectDialog";

const ObjectPane = () => {
  const [addOpen, setAddOpen] = useState(false);
  const finObjs = useSelector((state) => state.finObjs);
  const activeFinObj = useSelector((state) => state.activeFinObj);
  const activeBenchmarkDefaultFinObj = useSelector(
    (state) => state.activeBenchmarkDefaultFinObj
  );
  const dispatch = useDispatch();

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setTimeout(dispatch(getFinObjs()), 500);
    setAddOpen(false);
  };

  const handleListItemClick = (event) => {
    let foid = Number(event.target.id.slice(4));
    let newFo = finObjs.find((obj) => obj.foid === foid);
    dispatch(setActiveFinObj(newFo));
    if (newFo.benchmark) {
      let newBmFo = finObjs.find((obj) => obj.foid === newFo.benchmark);
      dispatch(setActiveBenchmarkDefaultFinObj(newBmFo));
    } else {
      dispatch(
        setActiveBenchmarkDefaultFinObj(nullActiveBenchmarkDefaultFinObj)
      );
    }
  };

  useEffect(() => {
    dispatch(getFinObjs());
  }, [dispatch, addOpen]);

  return (
    <>
      <h3>Database Objects</h3>
      <Button onClick={handleAddOpen} variant="outlined">
        Add New
      </Button>
      <AddFinancialObjectDialog open={addOpen} handleClose={handleAddClose} />
      <ObjectList
        finObjs={finObjs}
        activeFinObj={activeFinObj}
        handleListItemClick={handleListItemClick}
      />
    </>
  );
};

export default ObjectPane;
