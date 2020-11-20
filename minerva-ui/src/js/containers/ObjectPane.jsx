import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFinObjs,
  setActiveFinObj,
  setActiveBenchmarkDefaultFinObj,
} from "../redux/actions";
import ObjectList from "../components/ObjectList";
import { nullActiveBenchmarkDefaultFinObj } from "../redux/nullStateStubs";

const ObjectPane = () => {
  const finObjs = useSelector((state) => state.finObjs);
  const activeFinObj = useSelector((state) => state.activeFinObj);
  const activeBenchmarkDefaultFinObj = useSelector(
    (state) => state.activeBenchmarkDefaultFinObj
  );
  const dispatch = useDispatch();

  const handleListItemClick = (e) => {
    let foid = Number(e.target.id.slice(4));
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
  }, [dispatch]);

  return (
    <ObjectList
      finObjs={finObjs}
      activeFinObj={activeFinObj}
      handleListItemClick={handleListItemClick}
    />
  );
};

export default ObjectPane;
