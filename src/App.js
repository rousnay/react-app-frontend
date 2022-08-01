import React, { lazy, Suspense } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
// import { Container, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AppTheme } from "./assets/AppTheme";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicHeader from "./layout-parts/PublicHeader";
const Home = lazy(() => import("./pages/Home"));
const Landing = lazy(() => import("./pages/Landing"));
const Channel = lazy(() => import("./pages/Channel"));
const MetaTracks = lazy(() => import("./pages/MetaTracks"));
const Tool = lazy(() => import("./pages/Tool"));
const Guide = lazy(() => import("./pages/Guide"));
const Support = lazy(() => import("./pages/Support"));
const Login = lazy(() => import("./pages/Login"));

// import DatePicker from "./components/DatePicker";

function App() {
  return (
    <>
      <ThemeProvider theme={AppTheme}>
        <BrowserRouter>
          <CssBaseline />
          <PublicHeader />
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Landing" element={<Landing />} />
              <Route path="/Channel" element={<Channel />} />
              <Route path="/MetaTracks" element={<MetaTracks />} />
              <Route path="/Tool" element={<Tool />} />
              <Route path="/Guide" element={<Guide />} />
              <Route path="/Support" element={<Support />} />
              <Route path="/Login" element={<Login />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
