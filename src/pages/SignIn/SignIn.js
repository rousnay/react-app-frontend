import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import PostRequest from "../../components/PostRequest";
// import { styled } from "@mui/material/styles";
import TreadmillBg from "../../assets/treadmill-bg.svg";

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

export default function SignIn() {
  return (
    <>
      <Container maxWidth="xl" sx={{}}>
        <Grid container>
          <Grid item sm={12} md={6}>
            <Typography variant="h2" color="logoblue">
              Login page
            </Typography>

            <Box component="form" noValidate style={{ marginTop: "50px" }}>
              <div>
                <TextField
                  id="filled-basic"
                  label="Your email"
                  variant="filled"
                />
              </div>
              <div>
                <TextField
                  id="filled-basic"
                  label="Password"
                  variant="filled"
                />
              </div>
            </Box>

            <Button variant="contained" color="logoblue">
              SIGN IN
            </Button>
            <div style={{ marginTop: "50px" }}>
              <PostRequest />
            </div>
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
              padding: "50px",
            }}
          >
            <img
              style={{
                alignSelf: "center",
                width: "100%",
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
