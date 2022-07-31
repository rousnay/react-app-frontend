import React from "react";
import { Container, Grid, Box, Typography, Button } from "@mui/material";

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
          <Box
            sx={{
              fontFamily: "TTNormsRegular",
            }}
          >
            Raleway
          </Box>
          <p>this is test text for font family check</p>
          <b>this is test text for font family check</b>
        </Grid>
      </Container>
    </>
  );
}
