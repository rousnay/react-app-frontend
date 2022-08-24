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

const userData = JSON.parse(localStorage.getItem("userData"));
const userToken = localStorage.getItem("token");

// const checkUserToken = (userToken) => {
//   if (userToken) {
//     swal("Failed", "Please sign in first", "error", {
//       buttons: false,
//       timer: 2000,
//     }).then((value) => {
//       window.location.href = "/SignIn";
//     });
//   }
// };
// checkUserToken();

const baseURL = "https://api.finutss.com";

async function getUserData(payloadData) {
  console.log(payloadData);
  return fetch(`${baseURL}/user/info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userToken,
    },
  }).then((data) => data.json());
}

export default function CreateTrack() {
  const [userInfo, setUserInfo] = useState();
  const [userToken, setUserToken] = useState();
  const [channelId, setChannelId] = useState();

  useEffect(() => {
    if (userToken) {
      getUserInformation();
    } else {
      swal("Oops!", "Please sign in first", "error", {
        buttons: false,
        timer: 1500,
      }).then((value) => {
        window.location.href = "/SignIn";
      });
    }
  }, [userToken]);

  const getUserInformation = async () => {
    const response = await getUserData();
    console.log(response);
    if (response.message === "Success") {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {});
    } else {
      swal("Oops!", response.message, "error").then((value) => {
        // localStorage.setItem("userData", JSON.stringify(response.data));
        window.location.href = "/SignIn";
      });
    }
  };

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
          sx={{
            width: "calc(100% - 230px)",
            padding: "30px",
            display: "flex",
          }}
        >
          <TrackCreationNav />
          {/* <TrackInfo /> */}
          {/* <MetaInfo/> */}
        </Grid>
      </Container>
    </>
  );
}
