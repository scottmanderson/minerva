import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFinObjs, setActiveFinObj } from "../redux/actions";
import ObjectList from "../components/ObjectList";

const ObjectPane = () => {
  const finObjs = useSelector((state) => state.finObjs);
  const activeFinObj = useSelector((state) => state.activeFinObj);
  const dispatch = useDispatch();

  const handleListItemClick = (e) => {
    let foid = Number(e.target.id.slice(4));
    let new_fo = finObjs.find((obj) => obj.foid === foid);
    dispatch(setActiveFinObj(new_fo));
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
