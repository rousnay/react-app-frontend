import React, { useState, useEffect, useRef, useCallback } from "react";
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
import Uploader from "./uploader";
import PinList from "./PinList";
import PinPoint from "./PinPoint";
import PinInfo from "./PinInfo";
import { TrackInfoFormStyled } from "./MetaTracksStyles";
import PrivetSideBar from "../../components/PrivetSideBar";
import PrivetHeader from "../../components/PrivetHeader";
import TrackCreationNav from "./TrackCreationNav";
import { onMapClick, onDataDelete, onDataChange } from "./InteractionHandler";
import MetaInfoForm from "./MetaInfoForm";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";

import "./style.css";
import { CloseFullscreenOutlined } from "@mui/icons-material";

const userInfo = JSON.parse(localStorage.getItem("userData")) || null;

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

const initialFeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      id: "Initial_pin_ID",
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: theMiddleCoordinates,
        type: "Point",
      },
    },
  ],
};

const localUserData = JSON.parse(localStorage.getItem("userData"));
const localUserToken = localStorage.token;
const localChannelId = localUserData.channelId;
const localCurrentTrackId = localStorage.currentTrackId;
const localCurrentTrackName = localStorage.currentTrackName;

const localGeoJSONPointData =
  JSON.parse(localStorage.getItem("geoJSONPointLocal")) ||
  initialFeatureCollection;

const geoPointCoordinates =
  localGeoJSONPointData.features[0].geometry.coordinates;
// console.log(geoPointCoordinates);

// const turfFeatures = turf.points(geoPointCoordinates);
// const centerFeatures = turf.center(turfFeatures);
// const centralFeaturesCoordinates = centerFeatures.geometry.coordinates;

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmludXRzcyIsImEiOiJja3BvdjJwdWYwcHQ3Mm9udXo4M3Nod3YzIn0.OMVZjImaogKth_ApsJTlNg";

export default function MetaInfo() {
  const [geoJSONLine, setGeoJSONLine] = useState(localGeoJSONLineData);
  const [geoJSONPoint, setGeoJSONPoint] = useState(localGeoJSONPointData);
  // const [geoJSONFeatures, setgeoJSONFeatures] = useState(localGeoJSONPointData);

  useEffect(() => {
    localStorage.setItem("geoJSONPointLocal", JSON.stringify(geoJSONPoint));
    setFeature(JSON.stringify(geoJSONPoint));
    setPinId(geoJSONPoint.features[0].id);
    setLon(geoJSONPoint.features[0].geometry.coordinates[0]);
    setLat(geoJSONPoint.features[0].geometry.coordinates[1]);
  }, [geoJSONPoint]);

  // const dataReset = () => {
  //   setGeoJSONPoint(initialFeatureCollection);
  // };

  const [mode, setMode] = useState("simple_select");
  const [currentMode, setCurrentMode] = useState("draw_point");
  const prevMode = useRef(mode);
  useEffect(() => {
    prevMode.current = mode;
    (() => {
      setCurrentMode(prevMode.current);
      const mapCanvas = document.querySelector("canvas.mapboxgl-canvas");
      if (prevMode.current === "draw_point") {
        mapCanvas.classList.add("draw_point_mode");
      } else {
        mapCanvas.classList.remove("draw_point_mode");
      }
    })();
  }, [mode]);

  const [id, setPinId] = useState("");
  const [name, setPinName] = useState("");
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  const [distanceInKm, setPinDistance] = useState(0);
  const [feature, setFeature] = useState({});

  const [selectedPinIndex, setSelectedPinIndex] = useState(-1);
  const [newCollection, setNewCollection] = useState(initialFeatureCollection);
  const [newFeatures, setNewFeatures] = useState([]);

  useEffect(() => {
    const turfFeaturesCollection = turf.featureCollection([...newFeatures]);
    setNewCollection(turfFeaturesCollection);
  }, [newFeatures]);

  useEffect(() => {
    console.log(newCollection);
  }, [newCollection]);

  const formVisibility = {
    opacity: selectedPinIndex + 1 < 1 ? 0.3 : 1,
    pointerEvents: selectedPinIndex + 1 < 1 ? "none" : "initial",
  };

  const getPointId = (pin, geoJson) => {
    return geoJson.features[pin].id;
  };

  const pinSelector = (pin) => {
    const allPinItem = document.querySelectorAll(".pin-list");
    allPinItem.forEach((box) => {
      box.classList.remove("selected-pin");
    });
    document.querySelector(`.pin-number-${pin}`).classList.add("selected-pin");
  };

  const markerClickHandler = (event, pinIndex) => {
    pinSelector(pinIndex + 1);
    const updatedLocalGeo = JSON.parse(
      localStorage.getItem("geoJSONPointLocal")
    );
    const pinId = getPointId(pinIndex, updatedLocalGeo);
    setSelectedPinIndex(pinIndex);
    console.log(
      pinIndex + 1,
      pinId.slice(-7),
      updatedLocalGeo.features[pinIndex].geometry.coordinates[1]
    );

    setPinId(pinId);
    setPinName("");
    setLon(updatedLocalGeo.features[pinIndex].geometry.coordinates[0]);
    setLat(updatedLocalGeo.features[pinIndex].geometry.coordinates[1]);
    // setPinDistance(3);
    setFeature("Test feature");

    const updatedLocalGeofeatures = updatedLocalGeo.features.map(
      (features) => features
    );
    const featureArray = updatedLocalGeofeatures.map((features, index) => {
      const featuresId = features.id;
      const featuresCoords = features.geometry.coordinates;
      const featureAdd = {
        type: "Feature",
        id: featuresId,
        properties: { name: "a name", pointNumber: index + 1 },
        geometry: { type: "Point", coordinates: featuresCoords },
      };

      return featureAdd;
    });
    setNewFeatures(featureArray);

    event.stopPropagation();
  };

  const currentCoordinates = geoJSONPoint.features.map(
    (features) => features.geometry.coordinates
  );

  const pointMarkerLocal = currentCoordinates.map((lngLat, index) => (
    <Marker
      key={index}
      longitude={lngLat[0]}
      latitude={lngLat[1]}
      onClick={(e) => markerClickHandler(e, index)}
      // draggable
      // onDragEnd={onDragEnd}
    >
      <PinPoint ids={index + 1} />
    </Marker>
  ));

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
          {/* <TrackInfoFormStyled noValidate onSubmit={submitMetaInfo}> */}
          <TrackInfoFormStyled>
            <Grid item sm={12} md={8} className="gpxFileInfo">
              <div className="metaMapContainer">
                <h4>Track Name: {localCurrentTrackName}</h4>

                <MapGL
                  style={{ width: "100%", height: "500px" }}
                  mapStyle="mapbox://styles/finutss/ckx8kko1c51of14obluquad77"
                  accessToken={MAPBOX_ACCESS_TOKEN}
                  longitude={localLineCentralCoordinate[0]}
                  latitude={localLineCentralCoordinate[1]}
                  onClick={(event) => onMapClick(event, line, currentMode)}
                  zoom={11.8}
                >
                  <Source id="route" type="geojson" data={geoJSONLine} />
                  <Layer {...LayerStyle1} />
                  <Draw
                    position={"top-left"}
                    displayControlsDefault={false}
                    controls={{
                      polygon: false,
                      point: false,
                      trash: true,
                      scrollZoom: true,
                    }}
                    mode={currentMode}
                    data={geoJSONPoint}
                    pointControl={false}
                    lineStringControl={false}
                    polygonControl={false}
                    combineFeaturesControl={false}
                    uncombineFeaturesControl={false}
                    onDrawModeChange={({ mode }) => setMode(mode)}
                    onDrawDelete={(currentFeature) =>
                      onDataDelete(currentFeature)
                    }
                    onChange={(geoJSONPoint) =>
                      onDataChange(geoJSONPoint, line, setGeoJSONPoint)
                    }
                  />
                  {pointMarkerLocal}
                  <NavigationControl />
                </MapGL>
              </div>
              <Stack className="pinInfoHeader">
                <h3>Pins</h3>
                <Button
                  type="button"
                  size="small"
                  variant={
                    currentMode === "draw_point" ? "contained" : "outlined"
                  }
                  color="themepurple"
                  className="metaInfoSubmit"
                  onClick={() => setMode("draw_point")}
                >
                  Add a pin
                </Button>
              </Stack>
              <div className="pin_list">
                <PinList
                  data={geoJSONPoint}
                  cuttentPinIndex={selectedPinIndex}
                />
              </div>
            </Grid>

            <Grid
              item
              sm={12}
              md={4}
              className="trackInformation metaInformation"
            >
              <MetaInfoForm
                pinId={id}
                pinLon={lon}
                pinLat={lat}
                distanceInKm={distanceInKm}
                pinFeature={feature}
                formVisibility={formVisibility}
                selectedPinIndex={selectedPinIndex}
              />

              <Stack direction="row" sx={{ justifyContent: "space-around" }}>
                <Button
                  type="button"
                  size="small"
                  variant="outlined"
                  color="themepurple"
                  className="backToTrackInfo"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  size="small"
                  variant="contained"
                  color="themepurple"
                  className="metaInfoSubmit"
                >
                  Next
                </Button>
              </Stack>
            </Grid>
          </TrackInfoFormStyled>
        </Grid>
      </Container>
    </>
  );
}
