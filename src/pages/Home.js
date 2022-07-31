import React from "react";
import { Container, Grid, Box } from "@mui/material";
import logo from "../assets/logo.svg";
import Colors from "../components/Colors";

export default function Home() {
  return (
    <>
      <Container>
        <Grid container className="App">
          <Grid item xs={12}>
            <Box sx={{ marginTop: "20vh" }}>
              Anyone can create their own Path & become a Creator
            </Box>
            <img src={logo} className="App-logo" alt="logo" />
            <h3>Finutss Color Palette</h3>
            <Colors />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
