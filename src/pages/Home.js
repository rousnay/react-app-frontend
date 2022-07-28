import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import logo from "../assets/logo.svg";
import Colors from "../components/Colors";

export default function Home() {
  return (
    <>
      <Container>
        <Grid container className="App">
          <Grid item xs={12}>
            <img src={logo} className="App-logo" alt="logo" />
            <Box>Anyone can create their own Path & become a Creator</Box>
            <Typography variant="h1" component="h2">
              FINUTSS
            </Typography>
            <h3>Finutss Color Palette</h3>
            <Colors />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
