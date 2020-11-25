import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ObjectPane from "./ObjectPane";
import DisplayPane from "./DisplayPane";
import { Grid } from "@material-ui/core";
import NavBar from "./NavBar";

const App = () => {
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
