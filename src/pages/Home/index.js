import { Link } from "react-router-dom";
import { Container, Grid, Button, Typography, styled } from "@mui/material";
import PublicHeader from "../../components/PublicHeader";
import LandingBgImage from "../../assets/landing-bg-black.jpg";
import LogoSquareWhite from "../../assets/logo-square-white.png";
import AppPreview from "../../assets/app-preview.png";

const LandingContainer = styled("div")`
  background-image: url(${LandingBgImage});
  height: 100%;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default function Home() {
  return (
    <>
      <PublicHeader />
      <LandingContainer>
        <Container maxWidth="xl" sx={{}}>
          <Grid container>
            <Grid item sm={12} md={6} sx={{ padding: `100px 0` }}>
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
                Anyone can create their own Path & become a <br />{" "}
                <span style={{ color: `var(--logored)`, fontWeight: 700 }}>
                  CREATOR
                </span>
              </Typography>
              <Link to="/SignUp">
                <Button variant="contained" size="large" color="logoblue">
                  GET STARTED
                </Button>
              </Link>
            </Grid>

            <Grid
              item
              sm={12}
              md={6}
              sx={{
                height: "calc(100vh - 78px)",
                display: "flex",
                justifyContent: "right",
              }}
            >
              <img
                style={{
                  alignSelf: "flex-end",
                }}
                src={AppPreview}
                alt="App Preview"
              />
            </Grid>
          </Grid>
        </Container>
      </LandingContainer>
    </>
  );
}
