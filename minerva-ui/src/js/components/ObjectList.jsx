import React from "react";

const ObjectList = (props) => {
  return (
    <>
      <h3>Database Objects</h3>
      <h4>{props.activeFinObjID || "null"}</h4>
      <ul className="list-group list-group-flush">
        {props.finObjs.map((el) => (
          <li
            className="list-group-item"
            key={el.foid}
            id={"foid" + el.foid}
            onClick={(e) => props.handleListItemClick(e)}
          >
            {el.report_name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ObjectList;
