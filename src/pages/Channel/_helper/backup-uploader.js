import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import LogoSquare from "../../assets/logo-square.svg";
import swal from "sweetalert";
// Import React FilePond
import Uploader from "./uploader";

const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYWY0ZWJiLTk1NWEtNDY1ZS05YzJjLTFiYWFlYzdjNjkzNSIsImVtYWlsIjoibXIucm91c25heUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6InVzZXIiLCJkZXZpY2VUeXBlIjoiaW9zIiwiZGV2aWNlVG9rZW4iOiJzdHJpbmciLCJpYXQiOjE2NTkzNjY4ODYsImV4cCI6MTY1OTM2Njk0Nn0.mAJadfoBmtF_rvFf4u7D_omcAAw6gz2n9Mkp-WmCtYA";

const baseURL = "http://13.124.197.107:3000";

async function loginUser(formData) {
  console.log(formData);
  return fetch("http://13.124.197.107:3000/channel", {
    method: "PUT",
    headers: {
      //   "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + userToken,
    },
    body: formData,
  }).then((data) => data.json());
}

export default function Channel() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);

  var formData = new FormData();
  formData.append("id", "aaafb550-6ef9-45cf-a8a1-2cf853410577");
  formData.append("name", name);
  formData.append("description", description);
  formData.append("image", image[0]);
  formData.append("bannerImage", bannerImage[0]);

  const submitImages = async (e) => {
    e.preventDefault();

    const response = await loginUser(formData);

    console.log(response);
    if (response.message === "Success") {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data));
        // window.location.href = "/AddUserInformation";
      });
    } else {
      swal("Failed", response.message[0], "error");
    }
  };

  function setImagedata(fileItems) {
    const _imageFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    console.log(_imageFileItem[0]);
    setImage(_imageFileItem);
  }
  function setBannerImagedata(fileItems) {
    const _BannerImageFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });

    //the line below is called twice, I guess this is the reason why it sometimes the server accepts duplicated files

    console.log(_BannerImageFileItem[0]);
    setImage(_BannerImageFileItem);
  }

  // useEffect(() => {
  //   const uyrimg = myimg;
  // });

  return (
    <>
      <Container maxWidth="xl" sx={{}}>
        <Grid container>
          <Grid item sm={12} md={6}>
            <Box sm={6} sx={{ flexGrow: 1 }}>
              <Typography variant="h4" sx={{ color: `var(--logoblack)` }}>
                Channel Information
              </Typography>
              <p>
                Please enter information about your channel. Most of the channel
                information can be re-edited at any time. If the image is not
                set, it is exposed as the default.
              </p>
            </Box>
          </Grid>

          <Grid item sm={12} md={6} sx={{ textAlign: "right" }}>
            <img src={LogoSquare} alt="Logo" />
          </Grid>
          <form style={{ width: "100%" }} noValidate onSubmit={submitImages}>
            <Grid container>
              <Grid item sm={12} md={6}>
                <TextField
                  variant="outlined"
                  label="Channel Name"
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
              </Grid>

              <Grid item sm={12} md={6}>
                <div>
                  <Uploader
                    files={image}
                    acceptedFileTypes={["image/png"]}
                    allowMultiple={false}
                    allowMultiple={false}
                    maxFiles={1}
                    onupdatefiles={(fileItems) => setImagedata(fileItems)}
                    // onupdatefiles={(fileItems) => setImage(fileItems.map(fileItem => fileItem.file)}
                    name="image"
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                  />

                  <Uploader
                    files={bannerImage}
                    acceptedFileTypes={["image/png"]}
                    allowMultiple={false}
                    maxFiles={1}
                    onupdatefiles={(fileItems) => setBannerImagedata(fileItems)}
                    // onupdatefiles={(fileItems) => setImage(fileItems.map(fileItem => fileItem.file)}
                    name="bannerImage"
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                  />
                </div>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="logoblue"
                  className=""
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
}
