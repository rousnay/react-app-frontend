import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
// import map from "mapbox-gl";
import {
  Container,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

import * as turf from "@turf/turf";
import swal from "sweetalert";
import toGeoJson from "@mapbox/togeojson";
import TrackReviewPinList from "./TrackReviewPinList";
import TrackReviewPinPoint from "./TrackReviewPinPoint";
import { MetaInfoFormStyled } from "./MetaTracksStyles";
import PrivetSideBar from "../../components/PrivetSideBar";
import PrivetHeader from "../../components/PrivetHeader";
import TrackCreationNav from "./TrackCreationNav";
import { onMapClick, onDataDelete, onDataChange } from "./InteractionHandler";
import TrackReviewContent from "./TrackReviewContent";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";

import "./style.css";

const userInfo = JSON.parse(localStorage.getItem("userData")) || null;
const localUserToken = localStorage.token;
const localCurrentTrackId = localStorage.currentTrackId;
const localCurrentTrackName = localStorage.currentTrackName;

const localGeoJSONLineData = JSON.parse(
  localStorage.getItem("geoJSONLineLocal")
);
const localLineCentralCoordinate = JSON.parse(
  localStorage.getItem("centralLineCoordinateLocal")
);
const GeoCoordinates = localGeoJSONLineData.features[0].geometry.coordinates;
const theMiddle = Math.floor(GeoCoordinates.length / 2);
const theMiddleCoordinates = GeoCoordinates[theMiddle];

// console.log(line);
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmludXRzcyIsImEiOiJja3BvdjJwdWYwcHQ3Mm9udXo4M3Nod3YzIn0.OMVZjImaogKth_ApsJTlNg";
const baseURL = "https://api.finutss.com";

export default function ManageTracks() {
  // ===============================
  // Async GET REQ
  // ===============================
  const [trackInfoData, setTrackInfoData] = useState({});
  const [trackingTags, setTrackingTags] = useState([]);
  const [pointFeatures, setPointFeatures] = useState([]);
  const [pointFeaturesCollection, setPointFeaturesCollection] = useState({});

  const getTrackInfo = async () => {
    const response = await fetch(
      `${baseURL}/track/${localCurrentTrackId}/info`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localUserToken,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  };
  useEffect(() => {
    // getTrackInfo()
    //   .then((res) => {
    //     swal("Success", "Pin point lists loaded", "success", {
    //       buttons: false,
    //       timer: 1000,
    //     }).then((value) => {
    //       setTrackInfoData(res.data);
    //       setTrackingTags(res.data.tags.split(","));
    //       convertToGeoJSON(res.data.rawGpx);
    //       convertToPointFeatures(res.data.pinPoints.pinPointArray);
    //     });
    //   })
    //   .catch((e) => {
    //     swal("Oops!", e.message, "error", {
    //       buttons: true,
    //     }).then((value) => {});
    //   });
  }, []);

  // ===============================
  // Convert GET RES to Map data
  // ===============================

  // ===============================
  // Data grid
  // ===============================
  const rows: GridRowsProp = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
  ];

  const columns: GridColDef[] = [
    { field: "col1", headerName: "Column 1", width: 150 },
    { field: "col2", headerName: "Column 2", width: 150 },
  ];

  return (
    <>
      <PrivetHeader loginInfo={userInfo} />

      <Container maxWidth="xl" sx={{ display: " flex" }}>
        <Grid
          container
          sx={{
            width: "230px",
            display: "flex",
            backgroundColor: `var(--logoblack)`,
          }}
        >
          <PrivetSideBar />
        </Grid>

        <Grid
          container
          sx={{
            width: "calc(100% - 230px)",
            padding: "30px",
            display: "flex",
          }}
        >
          <TrackCreationNav />

          <MetaInfoFormStyled>
            <div style={{ height: 300, width: "100%" }}>
              <DataGrid rows={rows} columns={columns} />
            </div>
          </MetaInfoFormStyled>
        </Grid>
      </Container>
    </>
  );
}
