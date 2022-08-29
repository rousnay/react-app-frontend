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

const initialPointData = {
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
  JSON.parse(localStorage.getItem("geoJSONPointLocal")) || initialPointData;

const geoPointCoordinates =
  localGeoJSONPointData.features[0].geometry.coordinates;
// console.log(geoPointCoordinates);

// const turfFeatures = turf.points(geoPointCoordinates);
// const centerFeatures = turf.center(turfFeatures);
// const centralFeaturesCoordinates = centerFeatures.geometry.coordinates;

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmludXRzcyIsImEiOiJja3BvdjJwdWYwcHQ3Mm9udXo4M3Nod3YzIn0.OMVZjImaogKth_ApsJTlNg";

const baseURL = "https://api.finutss.com";
async function addNewPin(payloadData) {
  // for (const pair of payloadData.entries()) {
  //   console.log(`${pair[0]}: ${pair[1]}`);
  // }

  // for (const value of payloadData.values()) {
  //   console.log(value);
  // }

  return fetch(`${baseURL}/track/${localCurrentTrackId}/pin-point`, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localUserToken,
    },
    body: payloadData,
  }).then((data) => data.json());
}

export default function MetaInfo() {
  const [geoJSONLine, setGeoJSON] = useState(localGeoJSONLineData);
  const [geoJSONPoint, setGeoJSONPoint] = useState(localGeoJSONPointData);
  // const [geoJSONFeatures, setgeoJSONFeatures] = useState(localGeoJSONPointData);

  useEffect(() => {
    localStorage.setItem("geoJSONPointLocal", JSON.stringify(geoJSONPoint));

    setFeature(JSON.stringify(geoJSONPoint));
    setPinId(geoJSONPoint.features[0].id);
    setLon(geoJSONPoint.features[0].geometry.coordinates[0]);
    setLat(geoJSONPoint.features[0].geometry.coordinates[1]);

    // console.log(JSON.parse(localStorage.getItem("geoJSONPointLocal")));
    // console.log(localGeoJSONPointData);
    // console.log(geoJSONPoint);
    // console.log(feature);
    // console.log(id);
    // console.log(lon);
    // console.log(lat);
  }, [geoJSONPoint]);
  const dataReset = () => {
    setGeoJSONPoint(initialPointData);
  };

  const [mode, setMode] = useState("simple_select");
  const [currentMode, setCurrentMode] = useState("draw_point");
  const prevMode = useRef(mode);
  useEffect(() => {
    prevMode.current = mode;
    (() => {
      setCurrentMode(prevMode.current);
    })();
  }, [mode]);

  const [id, setPinId] = useState();
  const [name, setPinName] = useState();
  const [lon, setLon] = useState();
  const [lat, setLat] = useState();
  const [distanceInKm, setPinDistance] = useState();
  const [feature, setFeature] = useState();
  const [text, setPinText] = useState();
  const [sound, setPinSound] = useState([]);
  const [image, setPinImage] = useState([]);

  var formData = new FormData();
  formData.append("id", id);
  formData.append("name", name);
  formData.append("lon", lon);
  formData.append("lat", lat);
  formData.append("distanceInKm", distanceInKm);
  formData.append("feature", feature);
  formData.append("text", text);
  formData.append("sound", sound[0]);
  formData.append("image", image[0]);

  const submitMetaInfo = async (e) => {
    e.preventDefault();
    const response = await addNewPin(formData);

    if (response.message === "Success") {
      swal("Success", "Pin has been add", "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        // localStorage.setItem("currentTtrackId", response.data.id);
      });
    } else {
      swal("Oops!", response.error, "error", {
        buttons: true,
      }).then((value) => {});
    }
  };

  function setPinSoundFile(fileItems) {
    const _pinSoundFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    //the line below is called twice, I guess this is the reason why it sometimes the server accepts duplicated files
    setPinSound(_pinSoundFileItem);
  }

  function setPinImageFile(fileItems) {
    const _pinImageFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    setPinImage(_pinImageFileItem);
    // convertToGeoJSON(_gpxFileItem[0]);
  }

  const getPointId = (pin) => {
    return geoJSONPoint.features[pin].id;
  };

  const pinSelector = (pin) => {
    const allPinItem = document.querySelectorAll(".pin-list");
    allPinItem.forEach((box) => {
      box.classList.remove("selected-pin");
    });

    document.querySelector(`.pin-number-${pin}`).classList.add("selected-pin");
  };

  const getPinIndex = (lonLat) => {
    return geoJSONPoint.features.findIndex(
      (topic) => topic.geometry.coordinates === lonLat
    );
  };

  const markerClickHandler = (e, coords) => {
    const pinIndex = getPinIndex(coords);
    const pinId = getPointId(pinIndex);
    pinSelector(pinIndex + 1);
    console.log(
      "Pin -",
      pinIndex + 1,
      pinId.slice(-7),
      geoJSONPoint.features[pinIndex].geometry.coordinates[1]
    );
  };

  const newCurrentData = geoJSONPoint.features.map(
    (features, i) => features.geometry.coordinates
  );

  const pointMarkerLocal = newCurrentData.map((lngLat, index) => (
    <Marker
      key={index}
      longitude={lngLat[0]}
      latitude={lngLat[1]}
      onClick={(event) => markerClickHandler(event, lngLat)}
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
          <TrackInfoFormStyled noValidate onSubmit={submitMetaInfo}>
            <Grid item sm={12} md={8} className="gpxFileInfo">
              <div className="metaMapContainer">
                <h4>Track Name: {localCurrentTrackName}</h4>
                <div>Current Mode: {mode}</div>

                <Stack direction="row" sx={{ justifyContent: "flex-start" }}>
                  <Button
                    type="button"
                    size="small"
                    variant="outlined"
                    color="logoblue"
                    className="backToTrackInfo"
                    onClick={() => setMode("simple_select")}
                  >
                    Selector a pin
                  </Button>

                  <Button
                    type="button"
                    size="small"
                    variant="contained"
                    color="logoblue"
                    className="metaInfoSubmit"
                    onClick={() => setMode("draw_point")}
                  >
                    Add a pin
                  </Button>

                  <Button
                    type="button"
                    size="small"
                    variant="contained"
                    color="logored"
                    className="metaInfoSubmit"
                    onClick={() => dataReset()}
                  >
                    Reset all pins
                  </Button>
                </Stack>

                <MapGL
                  style={{ width: "100%", height: "500px" }}
                  mapStyle="mapbox://styles/finutss/ckx8kko1c51of14obluquad77"
                  accessToken={MAPBOX_ACCESS_TOKEN}
                  longitude={localLineCentralCoordinate[0]}
                  latitude={localLineCentralCoordinate[1]}
                  onClick={(event) => onMapClick(event, line, currentMode)}
                  zoom={11}
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
              <div className="howTo">
                <h4>Pin IDs:</h4>
                <PinList data={geoJSONPoint} />
              </div>
              {/* <div>Pin list</div> */}
            </Grid>

            <Grid
              item
              sm={12}
              md={4}
              className="trackInformation metaInformation"
            >
              <h4>Metadata</h4>
              <TextField
                variant="outlined"
                label="Name"
                margin="normal"
                required
                fullWidth
                id="pinName"
                name="pinName"
                onChange={(e) => setPinName(e.target.value)}
              />

              <TextField
                variant="outlined"
                label="Distance"
                margin="normal"
                required
                fullWidth
                id="pinDistance"
                name="pinDistance"
                onChange={(e) => setPinDistance(e.target.value)}
              />

              <TextField
                variant="outlined"
                label="Text"
                multiline
                fullWidth
                id="pinText"
                name="pinText"
                maxRows={4}
                onChange={(e) => setPinText(e.target.value)}
              />
              <div className="pinSoundUpload">
                <Uploader
                  files={sound}
                  name={"sound"}
                  onupdatefiles={(soundFileItems) =>
                    setPinSoundFile(soundFileItems)
                  }
                  labelIdle='Drop Sound for pin or <span class="filepond--label-action">Browse</span>'
                />
              </div>
              <div className="pinImageUpload">
                <Uploader
                  files={image}
                  name={"image"}
                  onupdatefiles={(imageFileItems) =>
                    setPinImageFile(imageFileItems)
                  }
                  labelIdle='Drop Image for pin or <span class="filepond--label-action">Browse</span>'
                />
              </div>

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
                  type="submit"
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
