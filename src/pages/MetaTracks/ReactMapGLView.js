import React from "react";
import { Container, Grid, Typography } from "@mui/material";

import ReactMapGL from "../../components/ReactMapGL";

// mapboxgl.accessToken =
//   "pk.eyJ1Ijoicm91c25heSIsImEiOiJjbDZxYmhtdnMwYzA0M2ttaG45b2FxMGR3In0.kuDFvp9QAHL5W8u_JAbxbA";

// const MAPBOX_TOKEN =
//   "pk.eyJ1Ijoicm91c25heSIsImEiOiJjbDZxYmhtdnMwYzA0M2ttaG45b2FxMGR3In0.kuDFvp9QAHL5W8u_JAbxbA";

export default function ReactMapGLView() {
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Typography variant="h1" component="h2">
            Create Track
          </Typography>

          <Grid item sm={12}>
            <ReactMapGL />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
