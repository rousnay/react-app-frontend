import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PublicHeader from "../../components/PublicHeader";
import LandingBgImage from "../../assets/landing-bg-black.jpg";
import LogoSquareWhite from "../../assets/logo-square-white.png";

const LandingContainer = styled("div")`
  background-image: url(${LandingBgImage});
  height: 100%;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default function ChannelProfile() {
  return (
    <>
      <PublicHeader />
      <LandingContainer>
        <Container maxWidth="xl" sx={{ height: "calc(100vh - 78px)" }}>
          <Grid container>
            <Grid item sm={12} md={12} sx={{ padding: `100px 0` }}>
              <img src={LogoSquareWhite} alt="Logo" />
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  fontWeight: 500,
                  padding: `50px`,
                  paddingLeft: `0px`,
                  lineHeight: "1.5em",
                }}
              >
                Welcome to your{" "}
                <span style={{ color: `var(--logoRed)`, fontWeight: 700 }}>
                  {" "}
                  Channel
                </span>
              </Typography>
              <Link to="/CreateTrack">
                <Button variant="outlined" size="large" color="logoBlue">
                  Create a Meta Track
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </LandingContainer>
    </>
  );
}
