import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import ObjectPane from "./ObjectPane";
import DisplayPane from "./DisplayPane";
import { AppBar, Box, Grid } from "@material-ui/core";
import NavBar from "./NavBar";
import { IState } from "../redux/storeTypes";

const App = () => {
  // force rerender on any of these changing:
  const dataSources = useSelector((state: IState) => state.dataSources);
  const dataSourcePolls = useSelector((state: IState) => state.dataSourcePolls);
  const activeFinObj = useSelector((state: IState) => state.activeFinObj);
  const finObjs = useSelector((state: IState) => state.finObjs);
  return (
    <Container maxWidth="xl">
      <AppBar position="sticky">
        <NavBar />
      </AppBar>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        style={{ marginTop: 25 }}
      >
        <Grid item xs={2}>
          <ObjectPane />
        </Grid>
        <Grid item xs={10}>
          <DisplayPane />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
