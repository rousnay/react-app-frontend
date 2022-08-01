import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import PostRequest from "../components/PostRequest";
// import { styled } from "@mui/material/styles";
import TreadmillBg from "../assets/treadmill-bg.svg";

// const LoginRightContainer = {
//   backgroundImage: `url( ${TreadmillBg} )`,
//   height: "100%",
//   width: "100%",
//   backgroundPosition: "center",
//   backgroundRepeat: "no-repeat",
//   backgroundSize: "cover",
// };

// const LoginRightContainer = {
//   backgroundImage: `url( ${TreadmillBg} )`,
//   height: "100%",
//   width: "100%",
//   backgroundPosition: "center",
//   backgroundRepeat: "no-repeat",
//   backgroundSize: "cover",
// };

export default function Login() {
  return (
    <>
      <Container>
        <Grid container>
          <Grid item sm={12} md={6}>
            <Typography variant="h1" component="h2" color="logoblue">
              Login page
            </Typography>

            <Box component="form" noValidate autoComplete="off">
              <div>
                <TextField id="filled-basic" label="Filled" variant="filled" />
              </div>
              <div>
                <TextField id="filled-basic" label="Filled" variant="filled" />
              </div>
            </Box>

            <Button variant="contained" color="logoblue">
              SIGN IN
            </Button>
            <div style={{ marginTop: "50px" }}>
              <Button variant="outlined" size="small" color="logoblue">
                Sample Button
              </Button>
              <Button variant="contained" size="medium" color="logored">
                Sample Button
              </Button>
              <Button variant="outlined" size="medium" color="logored">
                Sample Button
              </Button>
            </div>

            <PostRequest />
          </Grid>

          <Grid
            item
            sm={12}
            md={6}
            sx={{
              backgroundColor: ` var(--logoblack)`,
              height: "calc(100vh - 78px)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                alignSelf: "center",
              }}
              src={TreadmillBg}
              alt="App Preview"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
