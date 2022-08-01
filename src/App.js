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

import PublicHeader from "./pages/Home/PublicHeader";

const Home = lazy(() => import("./pages/Home/Home"));
const Landing = lazy(() => import("./pages/Home/Landing"));
const Channel = lazy(() => import("./pages/Channel/Channel"));
const MetaTracks = lazy(() => import("./pages/MetaTracks/MetaTracks"));
const Tool = lazy(() => import("./pages/Tool/Tool"));
const Guide = lazy(() => import("./pages/Guide/Guide"));
const Support = lazy(() => import("./pages/Support/Support"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
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
              <Route path="/SignIn" element={<SignIn />} />

              <Route path="/Dashboard" element={<Dashboard />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
