import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { IFinObj } from "../../redux/storeTypes";

interface Props {
  activeFinObj: IFinObj;
  finObjs: IFinObj[];
  handleListItemClick: (arg0: any) => void;
}

const ObjectList: React.FC<Props> = ({
  activeFinObj,
  finObjs,
  handleListItemClick,
}) => (
  <>
    <Typography color="textPrimary">
      <List>
        {finObjs.map((el) => (
          <ListItem
            button
            key={el.foid}
            id={"foid" + el.foid}
            selected={activeFinObj.foid.toString() === el.foid.toString()}
            onClick={(e) => handleListItemClick(e)}
          >
            {el.report_name}
          </ListItem>
        ))}
      </List>
    </Typography>
  </>
);

export default ObjectList;
