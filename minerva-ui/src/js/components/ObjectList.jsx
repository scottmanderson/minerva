import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

const ObjectList = (props) => {
  return (
    <>
      <Typography color="textPrimary">
        <h3>Database Objects</h3>
        <List>
          {props.finObjs.map((el) => (
            <ListItem
              button
              key={el.foid}
              id={"foid" + el.foid}
              selected={props.activeFinObj === el.foid.toString()}
              onClick={(e) => props.handleListItemClick(e)}
            >
              {el.report_name}
            </ListItem>
          ))}
        </List>
      </Typography>
    </>
  );
};

export default ObjectList;
