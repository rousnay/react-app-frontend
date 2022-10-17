import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Logo from "../assets/logo.svg";

const MenuItem = styled("li")`
  list-style: none;
  margin: 0 10px;
  & > a {
    font-weight: 700;
    font-size: 17px;
    padding: 5px;
    color: var(--themeBlack);
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

const SignInStyles = {
  border: `1px solid var(--logoRed)`,
  borderRadius: "6px",
  color: `var(--logoRed)`,
  "&:hover": {
    backgroundColor: "#f73a6b",
    color: "white",
  },
};

export default function PublicHeader() {
  useEffect(() => {
    document.body.classList.remove("hasPrivetHeader");
    document.body.classList.add("hasPublicHeader");
  }, []);

  return (
    <>
      <Container maxWidth="100%">
        <Grid container sx={{ height: "78px", alignItems: "center" }}>
          <Grid item xs={12} md={4}>
            <Link to="/">
              <img src={Logo} alt="Logo" />
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
                <Link to="#">Meta Tracks</Link>
              </MenuItem>
              <MenuItem>
                <Link to="#">Tool</Link>
              </MenuItem>
              <MenuItem>
                <Link to="#">Guide</Link>
              </MenuItem>
              <MenuItem>
                <Link to="#">Support</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/SignIn" style={SignInStyles}>
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
