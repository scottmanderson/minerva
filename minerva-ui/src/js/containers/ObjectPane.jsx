import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFinObjs, setActiveFinObjID } from "../redux/actions";

const ObjectPane = () => {
  return (
    <div>
      <h3>Database Objects</h3>
    </div>
  );
};

export default ObjectPane;
