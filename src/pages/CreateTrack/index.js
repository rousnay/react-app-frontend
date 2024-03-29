import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MAP_BOX_TOKEN, MAP_BOX_STYLE } from "../../utils/CONSTANTS";
import { useToken, useChannel, useTrack } from "../../hooks/useUserInfo";
import { RequestApi } from "../../components/RequestApi";
import MapGL, { Source, Layer } from "@urbica/react-map-gl";
import toGeoJson from "@mapbox/togeojson";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
import * as turf from "@turf/turf";
import { Container, Grid, Stack, TextField, Button } from "@mui/material";
import swal from "sweetalert";
import PrivetSideBar from "../../components/PrivetSideBar";
import PrivetHeader from "../../components/PrivetHeader";
import Uploader from "../../components/Uploader";
import { LayerStyle1 } from "./MetaTrackLayerStyle";
import MetaTrackNav from "./MetaTrackNav";
import { TrackInfoFormStyled } from "./MetaTracksStyles";
import { initialLineCollection } from "./MetaTrackInitializer";

export default function CreateTrack() {
  // Initialization of variables =================
  const navigate = useNavigate();
  const [token] = useToken();
  const [channelId] = useChannel();
  const [, setTrackId] = useTrack();
  const [trackName, setTrackName] = useState(" ");
  const [geoJSONLine, setGeoJSONLine] = useState(initialLineCollection);
  const [centralLineCoordinate, setCentralCoordinate] = useState([0, 0]);

  const [name, setName] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [tags, setTags] = useState(" ");
  const [previewImage, setPreviewImage] = useState([]);
  const [type] = useState("loop");
  const [gpxFile, setGpxFile] = useState([]);

  var formData = new FormData();
  formData.append("channelId", channelId);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("tags", tags);
  formData.append("previewImage", previewImage[0]);
  formData.append("type", type);
  formData.append("gpxFile", gpxFile[0]);

  // TrackInfo form submission handler  ==================
  const submitTrackInfo = async (e) => {
    e.preventDefault();
    const [response] = await RequestApi("POST", `track/info`, token, formData);
    if (response.message === "Success") {
      swal("Success", "Track information has been add", "success", {
        buttons: false,
        timer: 1000,
      }).then((value) => {
        setTrackId(response.data.id);
        navigate("/CreateTrack/MetaInfo");
      });
    } else {
      swal("Oops!", response.error, "error", {
        buttons: true,
      }).then((value) => {});
    }
  };

  // Convert GPX data to GeoJSON ==================
  const convertToGeoJSONLine = (gpxPayload) => {
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
        const turfCenterLineFeature = turf.center(turfLineFeatureCollection);
        const centralLineCoordinates =
          turfCenterLineFeature.geometry.coordinates;

        setGeoJSONLine(geoJSONLineData);
        setTrackName(LineCollectionName);
        setCentralCoordinate(centralLineCoordinates);
      };
    } else {
      setTrackName(" ");
      setGeoJSONLine(initialLineCollection);
      setCentralCoordinate([0, 0]);
    }
  };

  // Setting files for upload  ==================
  function setPreviewImageData(fileItems) {
    const _previewImageFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    setPreviewImage(_previewImageFileItem);
  }

  function setGpxFileData(fileItems) {
    const _gpxFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });

    setGpxFile(_gpxFileItem);
    convertToGeoJSONLine(_gpxFileItem[0]);
  }

  // Checkpoint for channel existence ==================
  useEffect(() => {
    if (!channelId) {
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
  }, [channelId, navigate]);

  return (
    <>
      <PrivetHeader />
      <Container maxWidth="xl" sx={{ display: " flex" }}>
        <Grid
          container
          sx={{
            width: "230px",
            display: "flex",
            backgroundColor: `var(--logoBlack)`,
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
          <MetaTrackNav />

          <TrackInfoFormStyled noValidate onSubmit={submitTrackInfo}>
            <Grid item sm={12} md={8} className="gpxFileInfo">
              <div className="gpxFileUpload">
                <h4>GPX File:</h4>
                <Uploader
                  files={gpxFile}
                  name={"gpxFile"}
                  onUpdateFiles={(fileItems) => setGpxFileData(fileItems)}
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
                  onUpdateFiles={(fileItems) => setPreviewImageData(fileItems)}
                  labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
              </div>

              <Stack direction="row" sx={{ justifyContent: "space-around" }}>
                <Button
                  type="submit"
                  size="small"
                  variant="contained"
                  color="themePurple"
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
