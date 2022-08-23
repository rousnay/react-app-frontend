import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import swal from "sweetalert";
import Uploader from "./uploader";

import { TrackInfoFormStyled } from "./MetaTracksStyles";

const userData = JSON.parse(localStorage.getItem("userData"));
const userToken = localStorage.getItem("token");

console.log(userToken);

const baseURL = "https://api.finutss.com";
async function loginUser(payloadData) {
  console.log(payloadData);
  return fetch(`${baseURL}/channel`, {
    method: "POST",
    headers: {
      //   "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + userToken,
    },
    body: payloadData,
  }).then((data) => data.json());
}

export default function TrackInfo() {
  const [gpxFile, setGpxFile] = useState([]);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [previewImage, setPreviewImage] = useState([]);

  var formData = new FormData();
  // formData.append("id", channelId);
  formData.append("gpxFile", gpxFile[0]);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("previewImage", previewImage[0]);

  const submitImages = async (e) => {
    e.preventDefault();

    const response = await loginUser(formData);

    console.log(response);
    if (response.message === "Success") {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        // localStorage.setItem("userData", JSON.stringify(response.data));
        // window.location.href = "/AddUserInformation";
      });
    } else {
      swal("Failed", response.message, "error");
    }
  };

  function setGpxFiledata(fileItems) {
    const _gpxFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    console.log(_gpxFileItem[0]);
    setGpxFile(_gpxFileItem);
  }

  function setPreviewImagedata(fileItems) {
    const _previewImageFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    //the line below is called twice, I guess this is the reason why it sometimes the server accepts duplicated files
    console.log(_previewImageFileItem[0]);
    previewImage(_previewImageFileItem);
  }

  return (
    <>
      <TrackInfoFormStyled noValidate onSubmit={submitImages}>
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
            // id="standard-multiline-flexible"
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
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="channelImageUpload">
            <div className="thumImageUpload">
              <h4>Preview Image</h4>
              <Uploader
                files={previewImage}
                name={"previewImage"}
                onupdatefiles={(fileItems) => setPreviewImagedata(fileItems)}
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              />
            </div>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="logoblue"
            className="channelSubmit"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="logoblue"
            className="channelSubmit"
          >
            Next
          </Button>
        </Grid>
      </TrackInfoFormStyled>
    </>
  );
}
