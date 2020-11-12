import React, { useContext } from "react";
import { Context, Store } from "../redux/Store";
import { getFinObjs, setActiveFinObjID } from "../redux/actions";

const ObjectPane = () => {
  const { globalState, dispatch } = useContext(Context);

  return (
    <div>
      <h3>Database Objects</h3>
    </div>
  );
};

export default ObjectPane;
