import React, { useState } from "react";
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
import Process from "./Process";
// import ReactDOM from "react-dom";

// User data
// const userData = JSON.parse(localStorage.getItem("userData"));
// const userToken = userData.token;
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYWY0ZWJiLTk1NWEtNDY1ZS05YzJjLTFiYWFlYzdjNjkzNSIsImVtYWlsIjoibXIucm91c25heUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6InVzZXIiLCJkZXZpY2VUeXBlIjoiaW9zIiwiZGV2aWNlVG9rZW4iOiJzdHJpbmciLCJpYXQiOjE2NTkzNjY4ODYsImV4cCI6MTY1OTM2Njk0Nn0.mAJadfoBmtF_rvFf4u7D_omcAAw6gz2n9Mkp-WmCtYA";

console.log(userToken);

async function loginUser(credentials) {
  console.log(credentials);

  return fetch("http://13.124.197.107:3000/channel", {
    method: "PUT",
    headers: {
      //   "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + userToken,
    },
    body: credentials,
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
  formData.append("image", image);
  formData.append("bannerImage", bannerImage);

  const handleSubmit = async (e) => {
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
        window.location.href = "/AddUserInformation";
      });
    } else {
      swal("Failed", response.message[0], "error");
    }
  };

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
          <form style={{ width: "100%" }} noValidate onSubmit={handleSubmit}>
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
                  <Process
                    files={image}
                    onupdatefiles={setImage}
                    // server={setServer}
                    name="image"
                  />
                  <Process
                    files={bannerImage}
                    onupdatefiles={setBannerImage}
                    // server={setServer}
                    name="bannerImage"
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
