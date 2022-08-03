import React from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";

export default function PrivetHeader(props) {
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
    window.location.href = "/Landing";
  };
  const handleSignIn = () => {
    window.location.href = "/SignIn";
  };

  const userData = props.loginInfo;

  let firstName;
  let profilePic;
  let loginButton;
  let totalBalance;

  if (userData) {
    firstName = userData.username;
    profilePic = userData.profilePhoto;
    loginButton = <MenuItem onClick={handleLogout}> Logout </MenuItem>;
    totalBalance = "$99,000";
  } else {
    firstName = "Guest";
    profilePic = "";
    loginButton = <MenuItem onClick={handleSignIn}> Sign in </MenuItem>;
    totalBalance = "$0,00";
  }

  return (
    <>
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
            Welcome, {firstName}
          </Typography>

          <div>
            <span style={{}}>{totalBalance}</span>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar src={profilePic} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {loginButton}
              {/* <MenuItem onClick={handleLogout}> Logout </MenuItem> */}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
