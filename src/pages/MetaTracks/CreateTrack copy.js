import React, { useState, useEffect } from "react";
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

import TrackCreationNav from "./TrackCreationNav";
import TrackInfo from "./TrackInfo";
import MetaInfo from "./MetaInfo";

// const baseURL = "https://api.finutss.com";

// async function submitTrackInfo(authToken, payloadData) {
//   for (const value of payloadData.values()) {
//     console.log(value);
//   }
//   return fetch(`${baseURL}/track/info`, {
//     method: "POST",
//     headers: {
//       //   "Content-Type": "multipart/form-data",
//       Authorization: "Bearer " + authToken,
//       body: payloadData,
//     },
//   }).then((data) => data.json());
// }

const userInfo = JSON.parse(localStorage.getItem("userData")) || null;

// console.log(userInfo);

export default function CreateTrack() {
  // const LocalUserData = JSON.parse(localStorage.getItem("userData")) || null;
  // const localUserToken = localStorage.getItem("token") || null;
  // const localChannelId = localStorage.getItem("channelId") || null;

  // const [userToken, setUserToken] = useState(localUserToken);
  // const [userInfo, setUserInfo] = useState(LocalUserData);
  // const [channelId, setChannelId] = useState(localChannelId);

  // useEffect(() => {
  //   if (userToken) {
  //     // getUserInformation();
  //   } else {
  //     swal("Oops!", "Please sign in first", "error", {
  //       buttons: false,
  //       timer: 9000,
  //     }).then((value) => {
  //       window.location.href = "/SignIn";
  //     });
  //   }
  // }, [userToken]);

  // const [name, setName] = useState();
  // const [description, setDescription] = useState();
  // const [tags, setTags] = useState([]);
  // const [previewImage, setpreviewImage] = useState([]);
  // const [type, setType] = useState([]);
  // const [gpxFile, setGpxFile] = useState([]);
  // const [distanceInMetres, setDistanceInMetres] = useState([]);
  // const [durationInSeconds, setDurationInSeconds] = useState([]);
  // const [kcal, setKcal] = useState([]);

  // var formData = new FormData();
  // formData.append("channelId", channelId);
  // formData.append("name", name);
  // formData.append("description", description);
  // formData.append("tags", tags);
  // formData.append("previewImage", previewImage[0]);
  // formData.append("type", type);
  // formData.append("gpxFile", gpxFile[0]);
  // formData.append("distanceInMetres", distanceInMetres);
  // formData.append("durationInSeconds", durationInSeconds);
  // formData.append("kcal", kcal);

  // const submitTrackInfo = async (e) => {
  //   e.preventDefault();

  //   const response = await submitTrackInfo(userToken, formData);
  //   console.log(response);
  //   if (response.message === "Success") {
  //     setUserToken(response.data.token);
  //     setChannelId(response.data.channelId);
  //     setUserInfo(response.data);
  //     localStorage.setItem("userData", JSON.stringify(response.data));
  //     // swal("Success", response.message, "success", {
  //     //   buttons: false,
  //     //   timer: 2000,
  //     // }).then((value) => {});
  //   } else {
  //     swal("Oops!", response.message, "error").then((value) => {
  //       // localStorage.setItem("userData", JSON.stringify(response.data));
  //       window.location.href = "/SignIn";
  //     });
  //   }
  // };

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
          <TrackInfo />
          {/* <MetaInfo/> */}
        </Grid>
      </Container>
    </>
  );
}
