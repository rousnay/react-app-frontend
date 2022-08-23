import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import "../assets/PublicStyles.css";
import logo from "../assets/logo.svg";

const MenuItem = styled("li")`
  list-style: none;
  margin: 0 10px;
  & > a {
    font-weight: 700;
    font-size: 17px;
    padding: 5px;
    color: var(--themeblack);
    text-decoration: none;
    // &:hover {
    //   background-color: #65daf9;
    //   color: white;
    // }
  }
  @media only screen and (max-width: 600px) {
    // background-color: lightblue;
  }
`;

const SigninStyles = {
  border: `1px solid var(--logored)`,
  borderRadius: "6px",
  color: `var(--logored)`,
  "&:hover": {
    backgroundColor: "#f73a6b",
    color: "white",
  },
};

export default function PublicHeader() {
  return (
    <>
      <Container maxWidth="100%">
        <Grid container sx={{ height: "78px", alignItems: "center" }}>
          <Grid item xs={12} md={4}>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </Grid>
          <Grid item xs={12} md={8}>
            <ul
              style={{
                display: "flex",
                padding: 0,
                justifyContent: "right",
                flexWrap: "wrap",
              }}
            >
              <MenuItem>
                <Link to="/">Home</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/MetaTracks">Meta Tracks</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/Tool">Tool</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/Guide">Guide</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/Support">Support</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/SignIn" style={SigninStyles}>
                  SIGN IN
                </Link>
              </MenuItem>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}