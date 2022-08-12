import React, { useState } from "react";
import "./Channel.css";
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

// const userData = JSON.parse(localStorage.getItem("userData"));
const userToken = localStorage.getItem("token");

console.log(userToken);

// const userToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYWY0ZWJiLTk1NWEtNDY1ZS05YzJjLTFiYWFlYzdjNjkzNSIsImVtYWlsIjoibXIucm91c25heUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6InVzZXIiLCJkZXZpY2VUeXBlIjoiaW9zIiwiZGV2aWNlVG9rZW4iOiJzdHJpbmciLCJpYXQiOjE2NTkzNjY4ODYsImV4cCI6MTY1OTM2Njk0Nn0.mAJadfoBmtF_rvFf4u7D_omcAAw6gz2n9Mkp-WmCtYA";
// const channelId = "aaafb550-6ef9-45cf-a8a1-2cf853410577";

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

export default function Channel() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);

  var formData = new FormData();
  // formData.append("id", channelId);
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
        // localStorage.setItem("userData", JSON.stringify(response.data));
        // window.location.href = "/AddUserInformation";
      });
    } else {
      swal("Failed", response.message, "error");
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
    setBannerImage(_BannerImageFileItem);
  }

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
              <Grid item sm={12} md={5} className="channelTextInput">
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

              <Grid
                item
                sm={12}
                md={7}
                sx={{
                  display: "flex",
                  flexFlow: "column",
                  alignItems: "center",
                }}
              >
                <div className="channelImageUpload">
                  <div className="thumImageUpload">
                    <h4>Channel Image</h4>
                    <Uploader
                      files={image}
                      name={"image"}
                      onupdatefiles={(fileItems) => setImagedata(fileItems)}
                      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                  </div>

                  <div className="bannerImageUpload">
                    <h4>Banner Image</h4>
                    <Uploader
                      files={bannerImage}
                      name={"bannerImage"}
                      onupdatefiles={(fileItems) =>
                        setBannerImagedata(fileItems)
                      }
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
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
}
