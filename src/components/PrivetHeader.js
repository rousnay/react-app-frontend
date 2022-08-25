import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  styled,
} from "@mui/material";
import LogoWidthWhite from "../assets/logo-width-white.svg";

export default function PrivetHeader(props) {
  useEffect(() => {
    document.body.classList.remove("hasPublicHeader");
    document.body.classList.add("hasPrivetHeader");
  }, []);

  const userData = props.loginInfo;
  let totalBalance = "$99,000";

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/Landing";
  };
  const handleSignIn = () => {
    window.location.href = "/SignIn";
  };

  let loginButton;
  if (userData) {
    loginButton = <MenuItem onClick={handleLogout}> Logout </MenuItem>;
  } else {
    loginButton = <MenuItem onClick={handleSignIn}> Sign in </MenuItem>;
  }

  return (
    <>
      <Container
        maxWidth="100%"
        sx={{ width: "100%", padding: `0!important`, backgroundColor: "white" }}
      >
        <Container maxWidth="xl" sx={{ display: " flex" }}>
          <Grid
            container
            sx={{
              width: "230px",
              paddingTop: "30px",
              display: "flex",
              justifyContent: "center",
              backgroundColor: `var(--logoblack)`,
            }}
          >
            <Link to="/" style={{ height: "fit-content" }}>
              <img src={LogoWidthWhite} alt="Logo" />
            </Link>
          </Grid>

          <Grid
            container
            sx={{
              width: "calc(100% - 230px)",
              display: "flex",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <AppBar
                className="PrivetHeader"
                position="static"
                sx={{ backgroundColor: "white", boxShadow: "none" }}
              >
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  ></IconButton>

                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, color: `var(--themeblack)` }}
                  >
                    Welcome,{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {userData ? userData.username : "Guest"}
                    </span>
                  </Typography>

                  <div>
                    <span
                      style={{
                        color: `var(--themeyellow)`,
                        fontWeight: "bold",
                      }}
                    >
                      {userData ? totalBalance : "$0,00"}
                    </span>
                    <IconButton onClick={handleMenu} color="inherit">
                      <Avatar src={userData ? userData.profilePhoto : ""} />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                      {loginButton}
                    </Menu>
                  </div>
                </Toolbar>
              </AppBar>
            </Box>
          </Grid>
        </Container>
      </Container>
    </>
  );
}
