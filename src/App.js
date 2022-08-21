import React, { lazy, Suspense } from "react";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";
// import { Container, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AppTheme } from "./assets/AppTheme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicHeader from "./pages/Home/PublicHeader";

const Home = lazy(() => import("./pages/Home/Home"));
const Landing = lazy(() => import("./pages/Home/Landing"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const MobileVerification = lazy(() =>
  import("./pages/SignUp/MobileVerification")
);
const AddUserInformation = lazy(() =>
  import("./pages/SignUp/AddUserInformation")
);
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Channel = lazy(() => import("./pages/Channel/Channel"));

const CreateTrack = lazy(() => import("./pages/MetaTracks/CreateTrack"));
const GPXupload = lazy(() => import("./pages/MetaTracks/GPXupload"));
const ReactMapDraw = lazy(() => import("./pages/MetaTracks/ReactMapDraw"));
const MetaTracks = lazy(() => import("./pages/MetaTracks/MetaTracks"));
const Tool = lazy(() => import("./pages/Tool/Tool"));
const Guide = lazy(() => import("./pages/Guide/Guide"));
const Support = lazy(() => import("./pages/Support/Support"));

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
              <Route path="/SignUp" element={<SignUp />} />
              <Route
                path="/MobileVerification"
                element={<MobileVerification />}
              />
              <Route
                path="/AddUserInformation"
                element={<AddUserInformation />}
              />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Channel" element={<Channel />} />

              <Route path="/CreateTrack" element={<CreateTrack />} />
              <Route path="/GPXupload" element={<GPXupload />} />
              <Route path="/ReactMapDraw" element={<ReactMapDraw />} />
              <Route path="/MetaTracks" element={<MetaTracks />} />
              <Route path="/Tool" element={<Tool />} />
              <Route path="/Guide" element={<Guide />} />
              <Route path="/Support" element={<Support />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
