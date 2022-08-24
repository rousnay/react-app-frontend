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
} from "@urbica/react-map-gl";
import DeckGL, { FlyToInterpolator } from "deck.gl";
import Draw from "@urbica/react-map-gl-draw";
import * as turf from "@turf/turf";
import swal from "sweetalert";
import { LayerStyle1, LayerStyle2, LayerStyle3 } from "./LayerStyle";
import { GeoData } from "./SampleGeoJSON";
import Uploader from "./uploader";
// import { GeoData2 } from "./SampleGeoJSON2";
import PinList from "./PinList";
import PinPoint from "./PinPoint";
import PinInfo from "./PinInfo";
import { TrackInfoFormStyled } from "./MetaTracksStyles";

import { onMapClick, onDataDelete, onDataChange } from "./InteractionHandler";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";

import "./style.css";
import { CloseFullscreenOutlined } from "@mui/icons-material";

const LocalGeoJSONLineData = JSON.parse(
  localStorage.getItem("geoJSONLineLocal")
);
const LocalLineCentralCoordinate = localStorage.getItem(
  "centralLineCoordinateLocal"
);
const initialPointData = {
  type: "FeatureCollection",
  features: [
    {
      id: "Initial_pin_ID",
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: LocalLineCentralCoordinate,
        type: "Point",
      },
    },
  ],
};

const localUserData = JSON.parse(localStorage.getItem("userData"));
const localUserToken = localStorage.token;
const localChannelId = localUserData.channelId;
const localCurrentTrackId = localStorage.currentTrackId;

const localGeoJSONPointData =
  JSON.parse(localStorage.getItem("geoJSONPointLocal")) || initialPointData;

const geoPointCoordinates =
  LocalGeoJSONLineData.features[0].geometry.coordinates;

console.log(geoPointCoordinates);

// var line = turf.lineString(geoPointCoordinates);

const turfFeatures = turf.points(geoPointCoordinates);
const centerFeatures = turf.center(turfFeatures);
const centralFeaturesCoordinates = centerFeatures.geometry.coordinates;

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmludXRzcyIsImEiOiJja3BvdjJwdWYwcHQ3Mm9udXo4M3Nod3YzIn0.OMVZjImaogKth_ApsJTlNg";

const baseURL = "https://api.finutss.com";
async function createNewTrack(payloadData) {
  for (const value of payloadData.values()) {
    console.log(value);
  }

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
  const [geoJSONLine, setGeoJSON] = useState(LocalGeoJSONLineData);
  const [geoJSONPoint, setGeoJSONPoint] = useState(localGeoJSONPointData);
  const [trackName, setTrackName] = useState(
    localGeoJSONPointData.features[0].properties.name
  );
  const [trackCoordinates, setTrackCoordinates] = useState(
    localGeoJSONPointData.features[0].geometry.coordinates
  );
  const [centralPointCoordinate, setCentralCoordinate] = useState(
    localGeoJSONPointData
  );

  useEffect(() => {}, []);
  const [pinId, setPinId] = useState();
  const [lon, setLon] = useState();
  const [lat, setLat] = useState();
  const [feature, setFeature] = useState();
  const [pinName, setPinName] = useState();
  const [pinDistance, setPinDistance] = useState();
  const [pinText, setPinText] = useState();
  const [pinSound, setPinSound] = useState([]);
  const [pinImage, setPinImage] = useState([]);

  var formData = new FormData();
  formData.append("trackId ", pinId);
  formData.append("lon ", lon);
  formData.append("lat", lat);
  formData.append("feature", feature);
  formData.append("pinName", pinName);
  formData.append("pinDistance", pinDistance);
  formData.append("pinSound", pinSound[0]);
  formData.append("pinImage", pinImage[0]);

  const submitTrackInfo = async (e) => {
    e.preventDefault();
    const response = await createNewTrack(formData);

    if (response.message === "Success") {
      swal("Success", "Pin has been add", "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        localStorage.setItem("currentTtrackId", response.data.id);
      });
    } else {
      swal("Oops!", response.error, "error", {
        buttons: true,
      }).then((value) => {});
    }
  };

  function setPinSoundFile(fileItems) {
    const _previewImageFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    //the line below is called twice, I guess this is the reason why it sometimes the server accepts duplicated files
    setPinSound(_previewImageFileItem);
  }

  function setPinImageFile(fileItems) {
    const _gpxFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    setPinImage(_gpxFileItem);
    // convertToGeoJSON(_gpxFileItem[0]);
  }

  // const convertToGeoJSON = (gpxPayload) => {
  //   if (gpxPayload) {
  //     const fileReader = new FileReader();
  //     fileReader.readAsText(gpxPayload, "UTF-8");
  //     fileReader.onload = () => {
  //       var geoJSONData = toGeoJson.gpx(
  //         new DOMParser().parseFromString(fileReader.result, "text/xml")
  //       );
  //       const collectionName = geoJSONData.features[0].properties.name;
  //       const allGeoCoordinates = geoJSONData.features[0].geometry.coordinates;
  //       setGeoJSON(geoJSONData);
  //       setTrackName(collectionName);
  //       setTrackCoordinates(allGeoCoordinates);
  //       setCentralCoordinate(geoCentralCoordinate(allGeoCoordinates));
  //       localStorage.setItem("geoJSONLocal", JSON.stringify(geoJSONData));
  //       localStorage.setItem(
  //         "centralCoordinateLocal",
  //         JSON.stringify(geoCentralCoordinate(allGeoCoordinates))
  //       );
  //     };
  //   } else {
  //     setGeoJSON(initialData);
  //     setCentralCoordinate([0, 0]);
  //     localStorage.setItem("geoJSONLocal", JSON.stringify(initialData));
  //     localStorage.setItem(
  //       "centralCoordinateLocal",
  //       JSON.stringify(geoCentralCoordinate([0, 0]))
  //     );
  //   }
  // };

  const geoCentralCoordinate = (coordinatesList) => {
    if (coordinatesList.length < 3) {
      return [0, 0];
    } else {
      return coordinatesList[Math.floor(coordinatesList.length / 2)];
    }
  };

  return (
    <>
      <TrackInfoFormStyled noValidate onSubmit={submitTrackInfo}>
        <Grid item sm={12} md={8} className="gpxFileInfo">
          <div className="metaMapContainer">
            <h4>GPX file: {trackName}</h4>
            <MapGL
              style={{ width: "100%", height: "500px" }}
              mapStyle="mapbox://styles/finutss/ckx8kko1c51of14obluquad77"
              accessToken={MAPBOX_ACCESS_TOKEN}
              longitude={centralFeaturesCoordinates[0]}
              latitude={centralFeaturesCoordinates[1]}
              // onClick={(event) => onMapClick(event, line, currentMode)}
              zoom={11.6}
              // scrollZoom={true}
              // doubleClickZoom={true}
              // touchZoom={true}
              // interactiveLayerIds={"route"}
            >
              <Source id="route" type="geojson" data={geoJSONLine} />
              <Layer {...LayerStyle1} />
            </MapGL>
          </div>
          <div className="howTo">
            <h4>How to make a Track</h4>
            <ul>
              <li>
                Upload the GPX File. <span>How to make GPX file</span>
              </li>
              <li>Create a Pin by selecting a specific location.</li>
              <li>Put Metadata such as photos, voices in the Pin.</li>
              <li>Set the condition value using the action tool.</li>
            </ul>
          </div>
          {/* <div>Pin list</div> */}
        </Grid>

        <Grid item sm={12} md={4} className="trackInformation metaInformation">
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
              files={pinSound}
              name={"pinSound"}
              onupdatefiles={(fileItems) => setPinSoundFile(fileItems)}
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
          </div>
          <div className="pinImageUpload">
            <Uploader
              files={pinImage}
              name={"pinImage"}
              onupdatefiles={(fileItems) => setPinImageFile(fileItems)}
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
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
    </>
  );
}
