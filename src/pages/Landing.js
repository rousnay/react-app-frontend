import React from "react";
import { Container, Grid, Typography } from "@mui/material";

export default function Landing() {
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Typography variant="h1" component="h2">
            Landing page
          </Typography>
        </Grid>
      </Container>
    </>
  );
}
