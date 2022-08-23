import React, { useState } from "react";
// import "./CreateTrack.css";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import PrivetSideBar from "../../components/PrivetSideBar";
import PrivetHeader from "../../components/PrivetHeader";
import swal from "sweetalert";
import TrackInfo from "./TrackInfo";
import MetaInfo from "./MetaInfo";

// Import React FilePond
import Uploader from "./uploader";
import TrackCreationNav from "./TrackCreationNav";

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

export default function CreateTrack() {
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
      <PrivetHeader loginInfo={userData} />

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
          // rowSpacing={2}
          // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            width: "calc(100% - 230px)",
            padding: "30px",
            display: "flex",
            // justifyContent: "flex-end",
          }}
        >
          <TrackCreationNav />
          <TrackInfo />
          {/* <MetaInfo/> */}
        </Grid>
      </Container>
    </>
  );
}
