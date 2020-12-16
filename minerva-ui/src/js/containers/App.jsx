import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import ObjectPane from "./ObjectPane";
import DisplayPane from "./DisplayPane";
import { Grid } from "@material-ui/core";
import NavBar from "./NavBar";

const App = () => {
  // force rerender on any of these changing:
  const dataSources = useSelector((state) => state.dataSources);
  const dataSourcePolls = useSelector((state) => state.dataSourcePolls);
  const finObjs = useSelector((state) => state.finObjs);
  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={12}>
          <NavBar />
        </Grid>
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
