import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { getFinObjs, setActiveFinObj } from "../redux/actions/actionCreators";
import ObjectList from "../components/displays/ObjectList";
import AddFinancialObjectDialog from "../components/dialogs/AddFinancialObjectDialog";
import { IState, IFinObj } from "../redux/storeTypes";

const ObjectPane = () => {
  const [addOpen, setAddOpen] = useState(false);
  const finObjs = useSelector((state: IState) => state.finObjs);
  const activeFinObj = useSelector((state: IState) => state.activeFinObj);
  const dispatch = useDispatch();

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    // @ts-ignore
    setTimeout(dispatch(getFinObjs()), 500);
    setAddOpen(false);
  };

  const handleListItemClick = (event: any) => {
    let foid = Number(event.target.id.slice(4));
    let newFo = finObjs.find((obj) => obj.foid === foid);
    if (newFo) {
      dispatch(setActiveFinObj(newFo));
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
