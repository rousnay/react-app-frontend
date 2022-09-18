import { Link } from "react-router-dom";
import { Container, Grid, styled } from "@mui/material";
import PublicHeader from "../../components/PublicHeader";
import Colors from "../../components/Colors";
import logo from "../../assets/logo.svg";

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

export default function Landing() {
  return (
    <>
      <PublicHeader />
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
                  <Link to="/Home">Home</Link>
                </ListItem>
                <ListItem>
                  <Link to="/SignUp">Sign Up</Link>
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
                <ListItem>
                  <Link to="/CreateTrack">Create Track</Link>
                </ListItem>
                <ListItem>
                  <Link to="Management/Tracks">Manage Tracks</Link>
                </ListItem>
                <ListItem>
                  <Link to="Management/Comments">Manage Comments</Link>
                </ListItem>
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
