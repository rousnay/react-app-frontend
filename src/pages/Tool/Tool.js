import React from "react";
import { Container, Grid, Typography, Button } from "@mui/material";

export default function Tool() {
  return (
    <>
      <Container>
        <Grid container>
          <Grid item sm={12} md={6}>
            <Typography variant="h1" component="h2" color="logoblue">
              Tool
            </Typography>
          </Grid>

          <Grid item sm={12} md={6}>
            <Button variant="contained" color="logoblue">
              Sample Button contained
            </Button>
            <Button variant="outlined" size="small" color="logoblue">
              Sample Button outlined
            </Button>
            <Button variant="contained" size="medium" color="logored">
              Sample Button contained
            </Button>
            <Button variant="outlined" size="medium" color="logored">
              Sample Button outlined
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
