import React from "react";
import { Container, Grid, Typography, Button } from "@mui/material";

export default function Login() {
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Typography variant="h1" component="h2" color="logoblue">
            Login page
          </Typography>
        </Grid>

        <Grid container spacing={2}>
          <Button variant="contained" color="logoblue">
            MUI Button contained
          </Button>
          <Button variant="outlined" size="small" color="logoblue">
            MUI Button outlineds
          </Button>
          <Button variant="contained" size="medium" color="logored">
            MUI Button outlineds
          </Button>
          <Button variant="outlined" size="medium" color="logored">
            MUI Button outlineds
          </Button>
        </Grid>
      </Container>
    </>
  );
}
