import React from "react";
// import { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Card,
  Box,
  CardContent,
  Avatar,
} from "@mui/material";
// import { styled } from "@mui/material/styles";
import TreadmillBg from "../../assets/treadmill-bg.svg";

// async function loginUser(credentials) {
//   return fetch("http://13.124.197.107:3000/user/info", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   }).then((data) => data.json());
// }

export default function Dashboard() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  //   console.log(userData);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.location.href = "/SignIn";
  };

  //   const isLoggedIn = props.isLoggedIn;
  //   if (isLoggedIn) {
  //     return <UserGreeting />;
  //   }
  //   return <GuestGreeting />;

  return (
    <>
      <Container maxWidth="xl" sx={{}}>
        <Grid container>
          <Grid item sm={12} sx={{}}>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static" color="logored">
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  ></IconButton>

                  <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    Welcome, {userData.firstName}
                  </Typography>

                  <div>
                    <span style={{}}>$99,000</span>
                    <IconButton onClick={handleMenu} color="inherit">
                      <Avatar src={userData.profilePhoto} />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleLogout}> Logout </MenuItem>
                    </Menu>
                  </div>
                </Toolbar>
              </AppBar>
            </Box>
          </Grid>

          <Grid item sm={12} md={6} sx={{ padding: "30px 30px 0 0" }}>
            <h2>Profile information </h2>

            <Card className="">
              <CardContent>
                <img
                  style={{
                    width: "100%",
                    maxWidth: "350px",
                  }}
                  src={userData.profilePhoto}
                  alt={userData.firstName}
                />

                <p>
                  <span style={{ fontWeight: "bold" }}>Username: </span>
                  {userData.username}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Email: </span>
                  {userData.email}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Mobile: </span>
                  {userData.countryCode}
                  {userData.phoneNumber}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Address: </span>
                  {userData.addressLine1}, {userData.addressLine2},{" "}
                  {userData.city}, {userData.state} - {userData.zipCode}.
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Country: </span>
                  {userData.country}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Account Type: </span>
                  {userData.accountType}
                </p>
                {/* {Object.keys(userData).map((key, idx) => (
                  <p key={idx}>{userData[key]}</p>
                ))} */}
              </CardContent>
            </Card>
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
