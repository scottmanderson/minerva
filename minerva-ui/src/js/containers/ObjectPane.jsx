import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFinObjs, setActiveFinObjID } from "../redux/actions";
import ObjectList from "../components/ObjectList";

const ObjectPane = () => {
  const finObjs = useSelector((state) => state.finObjs);
  const activeFinObjID = useSelector((state) => state.activeFinObjID);
  const dispatch = useDispatch();

  const handleListItemClick = (e) => {
    let foid = e.target.id.slice(4);
    dispatch(setActiveFinObjID(foid));
  };

  useEffect(() => {
    dispatch(getFinObjs());
  }, [dispatch]);

  return (
    <ObjectList
      finObjs={finObjs}
      activeFinObjID={activeFinObjID}
      handleListItemClick={handleListItemClick}
    />
  );
};

export default ObjectPane;
