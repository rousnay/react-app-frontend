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
import MapGL, {
  Source,
  Layer,
  Marker,
  ScaleControl,
  NavigationControl,
} from "@urbica/react-map-gl";
import Draw from "@urbica/react-map-gl-draw";
import * as turf from "@turf/turf";
import swal from "sweetalert";
import { LayerStyle1, LayerStyle2, LayerStyle3 } from "./LayerStyle";
import MetaInfoPinList from "./MetaInfoPinList";
import { TrackInfoFormStyled } from "./MetaTracksStyles";
import PrivetSideBar from "../../components/PrivetSideBar";
import PrivetHeader from "../../components/PrivetHeader";
import TrackCreationNav from "./TrackCreationNav";
import { onMapClick, onDataDelete, onDataChange } from "./InteractionHandler";
import MetaInfoForm from "./MetaInfoForm";
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

var line = turf.lineString(GeoCoordinates);
// console.log(line);

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmludXRzcyIsImEiOiJja3BvdjJwdWYwcHQ3Mm9udXo4M3Nod3YzIn0.OMVZjImaogKth_ApsJTlNg";

const baseURL = "https://api.finutss.com";

export default function TrackReview() {
  // ===============================
  // Async GET REQ STARTs
  // ===============================
  const [trackInfoData, setTrackInfoData] = useState({});
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
    getTrackInfo()
      .then((res) => {
        swal("Success", "Pin point lists loaded", "success", {
          buttons: false,
          timer: 1000,
        }).then((value) => {
          setTrackInfoData(res.data);
        });
      })
      .catch((e) => {
        swal("Oops!", e.message, "error", {
          buttons: true,
        }).then((value) => {});
      });
  }, []);
  // ===============================
  // Async GET REQ ENDSs
  // ===============================

  console.log(trackInfoData);
  console.log(trackInfoData.name);
  // console.log(trackInfoData.description);
  // console.log(trackInfoData.tags);
  // console.log(trackInfoData.previewImage);
  // console.log(trackInfoData.privacy);
  // console.log(trackInfoData.pinPoints.pinPointArray);
  // console.log(trackInfoData.rawGpx);

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
          <h1>{trackInfoData.name}</h1>>
        </Grid>
      </Container>
    </>
  );
}
