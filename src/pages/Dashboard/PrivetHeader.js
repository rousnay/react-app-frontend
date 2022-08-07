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
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
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
            Welcome, {userData ? userData.username : "Guest"}
          </Typography>

          <div>
            <span style={{}}>{userData ? totalBalance : "$0,00"}</span>
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
    </>
  );
}
