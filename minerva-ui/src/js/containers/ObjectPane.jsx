import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFinObjs, setActiveFinObjID } from "../redux/actions";

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
    <div>
      <h3>Database Objects</h3>
      <h4>{activeFinObjID || "null"}</h4>
      <ul className="list-group list-group-flush">
        {finObjs.map((el) => (
          <li
            className="list-group-item"
            key={el.foid}
            id={"foid" + el.foid}
            onClick={(e) => handleListItemClick(e)}
          >
            {el.report_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ObjectPane;
