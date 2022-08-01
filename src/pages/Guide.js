import React from "react";
import { Container, Grid, Typography } from "@mui/material";

export default function Guide() {
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Typography variant="h1" component="h2">
            Guide
          </Typography>
        </Grid>
      </Container>
    </>
  );
}
