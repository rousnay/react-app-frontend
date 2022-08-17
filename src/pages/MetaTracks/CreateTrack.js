import React, { useState, useEffect, useRef } from "react";
import { Container, Grid, Typography } from "@mui/material";
// import { GeoData } from "./SampleGeoJSON";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import "mapbox-gl/dist/mapbox-gl.css";
// import "./index.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoicm91c25heSIsImEiOiJjbDZxYmhtdnMwYzA0M2ttaG45b2FxMGR3In0.kuDFvp9QAHL5W8u_JAbxbA";

// const MAPBOX_TOKEN =
//   "pk.eyJ1Ijoicm91c25heSIsImEiOiJjbDZxYmhtdnMwYzA0M2ttaG45b2FxMGR3In0.kuDFvp9QAHL5W8u_JAbxbA";

export default function CreateTrack() {
  // for the initial latitude, longitude, and zoom of the map
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  // The Mapbox map is initialized within a React Effect hook
  // you also created a map useRef to store the initialize the map. The ref will prevent the map from reloading when the user interacts with the map.
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      // center: [lng, lat],
      center: [127.078539, 37.511692],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Typography variant="h1" component="h2">
            Create Track
          </Typography>

          <Grid item sm={12}>
            <div className="sidebar">
              Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
          </Grid>

          <Grid item sm={12}>
            <div ref={mapContainer} className="map-container" />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
