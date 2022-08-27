import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mapboxgl from "!mapbox-gl";
import MapGL, { Source, Layer } from "@urbica/react-map-gl";
import { LayerStyle1 } from "./LayerStyle";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "./style.css";

import {
  Container,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import * as turf from "@turf/turf";
import swal from "sweetalert";
import Uploader from "./uploader";
import toGeoJson from "@mapbox/togeojson";
import { TrackInfoFormStyled } from "./MetaTracksStyles";
import PrivetSideBar from "../../components/PrivetSideBar";
import PrivetHeader from "../../components/PrivetHeader";
import TrackCreationNav from "./TrackCreationNav";

const userInfo = JSON.parse(localStorage.getItem("userData")) || null;

const initialLineData = {
  type: "FeatureCollection",
  features: [
    {
      id: "Initial_pin_ID",
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [
          [0, 0],
          [0, 0],
        ],
        type: "Point",
      },
    },
  ],
};

const LocalUserData = JSON.parse(localStorage.getItem("userData"));
const localUserToken = localStorage.token;
const localChannelId = localStorage.channelId;
const LocalGeoJSONLineData =
  JSON.parse(localStorage.getItem("geoJSONLineLocal")) || initialLineData;

const LocalLineCentralCoordinate = JSON.parse(
  localStorage.getItem("centralLineCoordinateLocal")
) || [0, 0];

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmludXRzcyIsImEiOiJja3BvdjJwdWYwcHQ3Mm9udXo4M3Nod3YzIn0.OMVZjImaogKth_ApsJTlNg";

const baseURL = "https://api.finutss.com";
async function createNewTrack(payloadData) {
  for (const value of payloadData.values()) {
    console.log(value);
  }
  return fetch(`${baseURL}/track/info`, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localUserToken,
    },
    body: payloadData,
  }).then((data) => data.json());
}

export default function CreateTrack() {
  useEffect(() => {
    if (!localUserToken) {
      swal("Oops!", "Please sign in first", "error", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        window.location.href = "/SignIn";
      });
    }
  }, [localUserToken]);

  const [geoJSONLine, setGeoJSON] = useState(LocalGeoJSONLineData);
  const [trackName, setTrackName] = useState(
    LocalGeoJSONLineData.features[0].properties.name
  );
  const [trackCoordinates, setTrackCoordinates] = useState(
    LocalGeoJSONLineData.features[0].geometry.coordinates
  );
  const [centralLineCoordinate, setCentralCoordinate] = useState(
    LocalLineCentralCoordinate
  );

  useEffect(() => {}, []);

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [tags, setTags] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  const [type, setType] = useState("loop");
  const [gpxFile, setGpxFile] = useState([]);
  // const [distanceInMetres, setDistanceInMetres] = useState();
  // const [durationInSeconds, setDurationInSeconds] = useState();
  // const [kcal, setKcal] = useState();

  var formData = new FormData();
  formData.append("channelId", localChannelId);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("tags", tags);
  formData.append("previewImage", previewImage[0]);
  formData.append("type", type);
  formData.append("gpxFile", gpxFile[0]);
  // formData.append("distanceInMetres", distanceInMetres);
  // formData.append("durationInSeconds", durationInSeconds);
  // formData.append("kcal", kcal);

  const submitTrackInfo = async (e) => {
    e.preventDefault();
    const response = await createNewTrack(formData);

    if (response.message === "Success") {
      swal("Success", "Track information has been add", "success", {
        buttons: false,
        timer: 1000,
      }).then((value) => {
        localStorage.setItem("currentTrackId", response.data.id);
        window.location.href = "/MetaInfo";
      });
    } else {
      swal("Oops!", response.error, "error", {
        buttons: true,
      }).then((value) => {});
    }
  };

  function setPreviewImagedata(fileItems) {
    const _previewImageFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    //the line below is called twice, I guess this is the reason why it sometimes the server accepts duplicated files
    setPreviewImage(_previewImageFileItem);
  }

  function setGpxFiledata(fileItems) {
    const _gpxFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    setGpxFile(_gpxFileItem);
    convertToGeoJSON(_gpxFileItem[0]);
  }

  const convertToGeoJSON = (gpxPayload) => {
    if (gpxPayload) {
      const fileReader = new FileReader();
      fileReader.readAsText(gpxPayload, "UTF-8");
      fileReader.onload = () => {
        var geoJSONLineData = toGeoJson.gpx(
          new DOMParser().parseFromString(fileReader.result, "text/xml")
        );
        const LineCollectionName = geoJSONLineData.features[0].properties.name;

        const allLineGeoCoordinates =
          geoJSONLineData.features[0].geometry.coordinates;

        const turfLineFeatureCollection = turf.points(allLineGeoCoordinates);
        const turfcenterLineFeature = turf.center(turfLineFeatureCollection);
        const centralLineCoordinates =
          turfcenterLineFeature.geometry.coordinates;

        setGeoJSON(geoJSONLineData);
        setTrackName(LineCollectionName);
        setTrackCoordinates(allLineGeoCoordinates);
        setCentralCoordinate(centralLineCoordinates);
        localStorage.setItem(
          "geoJSONLineLocal",
          JSON.stringify(geoJSONLineData)
        );
        localStorage.setItem(
          "centralLineCoordinateLocal",
          JSON.stringify(centralLineCoordinates)
        );
      };
    } else {
      setGeoJSON(initialLineData);
      setCentralCoordinate([0, 0]);
      localStorage.setItem("geoJSONLineLocal", JSON.stringify(initialLineData));
      localStorage.setItem(
        "centralLineCoordinateLocal",
        JSON.stringify([0, 0])
      );
    }
  };

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
          <TrackInfoFormStyled noValidate onSubmit={submitTrackInfo}>
            <Grid item sm={12} md={8} className="gpxFileInfo">
              <div className="gpxFileUpload">
                <h4>GPX File (c1):</h4>
                <Uploader
                  files={gpxFile}
                  name={"gpxFile"}
                  onupdatefiles={(fileItems) => setGpxFiledata(fileItems)}
                  labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
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

              <div className="gpxMapPreview">
                <h4>GPX file: {trackName}</h4>
                <MapGL
                  style={{ width: "100%", height: "500px" }}
                  mapStyle="mapbox://styles/finutss/ckx8kko1c51of14obluquad77"
                  accessToken={MAPBOX_ACCESS_TOKEN}
                  longitude={centralLineCoordinate[0]}
                  latitude={centralLineCoordinate[1]}
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
              {/* <div>Pin list</div> */}
            </Grid>

            <Grid item sm={12} md={4} className="trackInformation">
              <h4>Track Information</h4>
              <TextField
                variant="outlined"
                label="Title"
                margin="normal"
                required
                fullWidth
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                variant="outlined"
                label="Description"
                multiline
                fullWidth
                id="description"
                name="description"
                maxRows={4}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                // id="standard-multiline-flexible"
                variant="outlined"
                label="Tags"
                multiline
                fullWidth
                id="tags"
                name="tags"
                maxRows={4}
                onChange={(e) => setTags(e.target.value)}
              />
              <div className="previewImageUpload">
                <h4>Preview Image</h4>
                <Uploader
                  files={previewImage}
                  name={"previewImage"}
                  onupdatefiles={(fileItems) => setPreviewImagedata(fileItems)}
                  labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
              </div>

              <Stack direction="row" sx={{ justifyContent: "space-around" }}>
                <Button
                  type="submit"
                  size="small"
                  variant="contained"
                  color="themepurple"
                  className="trackInfoSubmit"
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
