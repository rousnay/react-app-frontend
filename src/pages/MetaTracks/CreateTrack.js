import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, MAP_BOX_TOKEN, MAP_BOX_STYLE } from "../../utils/Constants";
import { useToken, useUser } from "../../auth/userAuth";
import MapGL, { Source, Layer } from "@urbica/react-map-gl";
import toGeoJson from "@mapbox/togeojson";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";

import * as turf from "@turf/turf";
import { Container, Grid, Stack, TextField, Button } from "@mui/material";
import { LayerStyle1 } from "./LayerStyle";
import swal from "sweetalert";
import Uploader from "../../components/uploader";
import { TrackInfoFormStyled } from "./MetaTracksStyles";
import PrivetSideBar from "../../components/PrivetSideBar";
import PrivetHeader from "../../components/PrivetHeader";
import TrackCreationNav from "./TrackCreationNav";

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
        type: "LineString",
      },
    },
  ],
};

async function createNewTrack(authToken, payloadData) {
  for (const value of payloadData.values()) {
    console.log(value);
  }
  return fetch(`${API_URL}/track/info`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authToken,
    },
    body: payloadData,
  }).then((data) => data.json());
}

export default function CreateTrack() {
  const navigate = useNavigate();
  const [token] = useToken();
  const [user] = useUser();
  const [trackName, setTrackName] = useState(" ");
  const [geoJSONLine, setGeoJSON] = useState(initialLineData);
  const [centralLineCoordinate, setCentralCoordinate] = useState([0, 0]);

  const [name, setName] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [tags, setTags] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  const [type, setType] = useState("loop");
  const [gpxFile, setGpxFile] = useState([]);

  var formData = new FormData();
  formData.append("channelId", user.channelId);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("tags", tags);
  formData.append("previewImage", previewImage[0]);
  formData.append("type", type);
  formData.append("gpxFile", gpxFile[0]);

  // TrackInfo form submission handler  ==================
  const submitTrackInfo = async (e) => {
    e.preventDefault();
    const response = await createNewTrack(token, formData);

    if (response.message === "Success") {
      swal("Success", "Track information has been add", "success", {
        buttons: false,
        timer: 1000,
      }).then((value) => {
        localStorage.setItem("currentTrackId", response.data.id);
        navigate("/MetaInfo");
      });
    } else {
      swal("Oops!", response.error, "error", {
        buttons: true,
      }).then((value) => {});
    }
  };

  // Setting files for upload  ==================
  function setPreviewImagedata(fileItems) {
    const _previewImageFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    setPreviewImage(_previewImageFileItem);
  }

  function setGpxFiledata(fileItems) {
    const _gpxFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    setGpxFile(_gpxFileItem);
    convertToGeoJSON(_gpxFileItem[0]);
  }

  // Convert GPX data to GeoJSON ==================
  const convertToGeoJSON = (gpxPayload) => {
    if (gpxPayload) {
      const fileReader = new FileReader();
      fileReader.readAsText(gpxPayload, "UTF-8");
      fileReader.onload = () => {
        var geoJSONLineData = toGeoJson.gpx(
          new DOMParser().parseFromString(fileReader.result, "text/xml")
        );

        const indexOfName = geoJSONLineData.features.findIndex((object) => {
          return object.properties.hasOwnProperty("name");
        });

        const LineCollectionName =
          geoJSONLineData.features[indexOfName].properties.name;

        const allLineGeoCoordinates =
          geoJSONLineData.features[0].geometry.coordinates;

        const turfLineFeatureCollection = turf.points(allLineGeoCoordinates);
        const turfcenterLineFeature = turf.center(turfLineFeatureCollection);
        const centralLineCoordinates =
          turfcenterLineFeature.geometry.coordinates;

        setGeoJSON(geoJSONLineData);
        setTrackName(LineCollectionName);
        setCentralCoordinate(centralLineCoordinates);
      };
    } else {
      setTrackName(" ");
      setGeoJSON(initialLineData);
      setCentralCoordinate([0, 0]);
    }
  };

  // Checkpoint for channel existence ==================
  useEffect(() => {
    if (!user.channelId && !localStorage.channelId) {
      swal("No channel exist!", "Please create a channel first", "error", {
        buttons: ["Back to dashboard", "Create channel"],
      }).then((createChannel) => {
        if (createChannel) {
          navigate("/Channel");
        } else {
          navigate("/Dashboard");
        }
      });
    }
  }, []);

  return (
    <>
      <PrivetHeader loginInfo={user} />
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
                <h4>GPX File:</h4>
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
                <h4>GPX Name: {trackName}</h4>
                <MapGL
                  style={{ width: "100%", height: "500px" }}
                  accessToken={MAP_BOX_TOKEN}
                  mapStyle={MAP_BOX_STYLE}
                  longitude={centralLineCoordinate[0]}
                  latitude={centralLineCoordinate[1]}
                  zoom={11.5}
                >
                  <Source id="route" type="geojson" data={geoJSONLine} />
                  <Layer {...LayerStyle1} />
                </MapGL>
              </div>
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
                variant="outlined"
                label="Tags"
                multiline
                fullWidth
                id="tags"
                name="tags"
                maxRows={4}
                onChange={(e) => setTags(e.target.value.split(/[ ,]+/))}
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
