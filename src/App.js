import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Channel from "./pages/Channel";
import PublicHeader from "./template-parts/PublicHeader";
import TestNav from "./components/TestNav";

// import PublicNav from "./components/PublicNav";
// import DatePicker from "./components/DatePicker";

function App() {
  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <PublicHeader />
        <TestNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="/Channel" element={<Channel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
