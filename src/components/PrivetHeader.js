import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUserInfo";
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
} from "@mui/material";
import LogoWidthWhite from "../assets/logo-width-white.svg";

export default function PrivetHeader(props) {
  const navigate = useNavigate();
  const [user] = useUser();

  useEffect(() => {
    document.body.classList.remove("hasPublicHeader");
    document.body.classList.add("hasPrivetHeader");
  }, []);

  let totalBalance = "$99,000";

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleSignIn = () => {
    navigate("/SignIn");
  };

  let loginButton;
  if (user) {
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
              backgroundColor: `var(--logoBlack)`,
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
                    sx={{ flexGrow: 1, color: `var(--themeBlack)` }}
                  >
                    Welcome,{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {user ? user.username : "Guest"}
                    </span>
                  </Typography>

                  <div>
                    <span
                      style={{
                        color: `var(--themeYellow)`,
                        fontWeight: "bold",
                      }}
                    >
                      {user ? totalBalance : "$0,00"}
                    </span>
                    <IconButton onClick={handleMenu} color="inherit">
                      <Avatar src={user ? user.profilePhoto : ""} />
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
