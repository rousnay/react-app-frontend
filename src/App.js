import React, { lazy, Suspense } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import PublicHeader from "./template-parts/PublicHeader";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Channel = lazy(() => import("./pages/Channel"));

// import TestNav from "./components/TestNav";
// import PublicNav from "./components/PublicNav";
// import DatePicker from "./components/DatePicker";

const MenuItem = styled("li")`
  list-style: none;
  margin: 5px;
  & > a {
    background-color: #1976d2;
    padding: 10px 15px;
    color: white;
    text-decoration: none;
    &:hover {
      background-color: #65daf9;
      color: white;
    }
  }
  @media only screen and (max-width: 600px) {
    background-color: lightblue;
  }
`;

function App() {
  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <PublicHeader />

        {/* <TestNav /> */}

        <Container>
          <Grid container>
            <ul style={{ display: "flex", padding: 0 }}>
              <MenuItem>
                <Link to="/">Home</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/Login">Login</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/Channel">Channel</Link>
              </MenuItem>
            </ul>
          </Grid>
        </Container>

        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Login" element={<Login />} />
            <Route path="/Channel" element={<Channel />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
