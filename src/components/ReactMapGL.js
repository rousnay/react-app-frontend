import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import ReactMapGl from "react-map-gl";
import { MAP_BOX_TOKEN } from "../utils/Constants";
// import { MAPBOX_MAP_STYLES } from "../utils/mapTypes";

const initialViewport = {
  latitude: 38.91,
  longitude: -77.0305,
  zoom: 19,
};

const customTheme = {
  //   ...theme
};

export default function ReactMapGL() {
  const [viewport, setViewport] = useState(initialViewport);
  return (
    <ThemeProvider theme={customTheme}>
      <ReactMapGl
        mapboxApiAccessToken={MAP_BOX_TOKEN}
        mapStyle={"mapbox://styles/mapbox/streets-v9"} //+ MAPBOX_MAP_STYLES.STREET}
        height="100vh"
        width="100vw"
        {...viewport}
        onViewportChange={(newViewport) => setViewport(newViewport)}
      />
    </ThemeProvider>
  );
}
