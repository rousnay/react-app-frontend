import React from "react";
import { Container, Grid } from "@mui/material";
import logo from "../../assets/logo.svg";
import Colors from "../../components/Colors";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const ListItem = styled("li")`
  list-style: none;
  margin: 8px 4px;
  & > a {
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

export default function Home() {
  return (
    <>
      <Container>
        <Grid container className="App">
          <Grid item xs={12}>
            <img src={logo} className="App-logo" alt="logo" />
            <h3 style={{ marginTop: "50px" }}>Finutss Color Palette</h3>
            <Colors />

            <h3 style={{ marginTop: "50px" }}>Working Pages</h3>

            <Grid item xs={12}>
              <ul
                style={{
                  display: "flex",
                  padding: 0,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <ListItem>
                  <Link to="/Landing">Landing</Link>
                </ListItem>
                <ListItem>
                  <Link to="/SignUp">Sign Up</Link>
                </ListItem>
                <ListItem>
                  <Link to="/MobileVerification">OTP Verification</Link>
                </ListItem>
                <ListItem>
                  <Link to="/AddUserInformation">Add User Information</Link>
                </ListItem>
                <ListItem>
                  <Link to="/SignIn">Sing In</Link>
                </ListItem>
                <ListItem>
                  <Link to="/Dashboard">Dashboard</Link>
                </ListItem>
                <ListItem>
                  <Link to="/Channel">Channel</Link>
                </ListItem>
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
