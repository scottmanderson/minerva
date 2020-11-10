import React, { useContext } from "react";
import { Context, Store } from "../context/Store";
import { getFinObjs, setActiveFinObjID } from "../context/actions";

const ObjectPane = () => {
  const { globalState, dispatch } = useContext(Context);

  return (
    <div>
      <h3>Database Objects</h3>
    </div>
  );
};

export default ObjectPane;
