import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import swal from "sweetalert";
import Uploader from "./uploader";
import toGeoJson from "@mapbox/togeojson";
import { TrackInfoFormStyled } from "./MetaTracksStyles";

const LocalUserData = JSON.parse(localStorage.getItem("userData"));
const localUserToken = localStorage.token;
const localChannelId = LocalUserData.channelId;
const LocalGeoJSONData = JSON.parse(localStorage.getItem("geoJSONLocal")) || {};

console.log(LocalUserData);
console.log(localUserToken);
console.log(localChannelId);

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

export default function TrackInfo() {
  const [geoJSON, setGeoJSON] = useState(LocalGeoJSONData);
  useEffect(() => {
    console.log(geoJSON);
    localStorage.setItem("geoJSONLocal", JSON.stringify(geoJSON));
  }, [geoJSON]);

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

  function setPreviewImagedata(fileItems) {
    const _previewImageFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    //the line below is called twice, I guess this is the reason why it sometimes the server accepts duplicated files
    console.log(_previewImageFileItem[0]);
    setPreviewImage(_previewImageFileItem);
  }

  function setGpxFiledata(fileItems) {
    const _gpxFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    console.log(_gpxFileItem[0]);
    setGpxFile(_gpxFileItem);
    convertGeoJSON(_gpxFileItem[0]);
  }

  const convertGeoJSON = (gpxPayload) => {
    console.log(gpxPayload);
    if (gpxPayload) {
      const fileReader = new FileReader();
      fileReader.readAsText(gpxPayload, "UTF-8");
      fileReader.onload = () => {
        setGeoJSON(
          toGeoJson.gpx(
            new DOMParser().parseFromString(fileReader.result, "text/xml")
          )
        );
      };
    } else {
      setGeoJSON({});
    }
  };

  return (
    <>
      <TrackInfoFormStyled noValidate onSubmit={submitTrackInfo}>
        <Grid item sm={12} md={8} className="gpxFileInfo">
          <div className="gpxFileUpload">
            <h4>GPX File</h4>
            <Uploader
              files={gpxFile}
              name={"gpxFile"}
              onupdatefiles={(fileItems) => setGpxFiledata(fileItems)}
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
          </div>

          <div className="howTo">
            <h5>How to make a Track</h5>
            <ul>
              <li>
                Upload the GPX File. <span>How to make GPX file</span>
              </li>
              <li>Create a Pin by selecting a specific location.</li>
              <li>Put Metadata such as photos, voices in the Pin.</li>
              <li>Set the condition value using the action tool.</li>
            </ul>
          </div>
          <div className="gpxMapPreview"></div>
          <div>Zoomed Preview</div>
          <div>Pin List</div>
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
    </>
  );
}
