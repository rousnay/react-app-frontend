import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const MenuItem = styled("li")`
  list-style: none;
  margin: 5px;
  & > a {
    font-weight: 700;
    font-size: 17px;
    padding: 10px 15px;
    color: var(--themeblack);
    text-decoration: none;
    // &:hover {
    //   background-color: #65daf9;
    //   color: white;
    // }
  }
  @media only screen and (max-width: 600px) {
    background-color: lightblue;
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
      <Container maxWidth="xl">
        <Grid container sx={{ height: "78px", alignItems: "center" }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h3">
              <Link to="/">
                <img src={logo} alt="Logo" />
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <ul style={{ display: "flex", padding: 0 }}>
              <MenuItem>
                <Link to="/Landing">Landing</Link>
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