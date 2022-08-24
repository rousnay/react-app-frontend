import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  styled,
} from "@mui/material";
// import { styled } from "@mui/material/styles";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import LogoSquareWhite from "../assets/logo-square-white.svg";

const ListItem = styled("li")`
  list-style: none;
  width: 100%;
  margin: 8px 0;
  & > a {
    display: block;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 8px 15px;
    color: white;
    background-color: var(--logoblack);
    text-decoration: none;
    &:hover {
      background-color: var(--logored);
      color: white;
    }
  }
  @media only screen and (max-width: 600px) {
    // background-color: lightblue;
  }
`;

export default function PrivetSideBar() {
  return (
    <>
      <Grid
        item
        sm={12}
        md={12}
        sx={{
          height: "calc(100vh - 68px)",
          // width: "230px",
          // display: "flex",
          justifyContent: "center",
        }}
      >
        {/* <Link to="/">
          <img src={LogoSquareWhite} alt="Logo" />
        </Link> */}
        <Link to="/CreateTrack">
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="logoblue"
            className="createTrackButton"
            sx={{
              width: "80%",
              margin: "40px 10% 0",
            }}
          >
            Create Track
          </Button>
        </Link>

        <ul
          style={{
            display: "flex",
            padding: "15px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <ListItem>
            <Link to="/">Home Page</Link>
          </ListItem>
          <ListItem>
            <Link to="/Dashboard">Dashboard</Link>
          </ListItem>
          <ListItem>
            <Link to="#">Management</Link>
          </ListItem>
          <ListItem>
            <Link to="#">Statistics</Link>
          </ListItem>
          <ListItem>
            <Link to="#">Customer</Link>
          </ListItem>
        </ul>
      </Grid>
    </>
  );
}
