import React from "react";
import { Container, Grid, Typography } from "@mui/material";

export default function Login() {
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Typography variant="h1" component="h2">
            Login
          </Typography>
        </Grid>
      </Container>
    </>
  );
}
