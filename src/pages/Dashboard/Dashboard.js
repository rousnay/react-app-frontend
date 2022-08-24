import React, { useState, useEffect } from "react";
// import { useState } from "react";
import { Container, Grid, Card, Box } from "@mui/material";
// import { styled } from "@mui/material/styles";
import TreadmillBg from "../../assets/treadmill-bg.svg";
import PrivetSideBar from "../../components/PrivetSideBar";
import PrivetHeader from "../../components/PrivetHeader";
import UserInfo from "./UserInfo";
import swal from "sweetalert";

const userData = JSON.parse(localStorage.getItem("userData"));
const userToken = localStorage.getItem("token");

export default function Dashboard() {
  useEffect(() => {
    if (!userToken) {
      swal("Oops!", "Please sign in first", "error", {
        buttons: false,
        timer: 1500,
      }).then((value) => {
        window.location.href = "/SignIn";
      });
    }
  }, [userToken]);

  const [userInformation, setInformation] = useState();
  // Function to collect data
  const getApiData = async () => {
    const response = await fetch("https://api.finutss.com/user/info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    }).then((response) => console.log(response));

    // update the state
    if (response.message === "Success") {
      console.log(response);
      setInformation(response);
      localStorage.setItem("userData", JSON.stringify(response.data));
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  useEffect(() => {
    console.log(userInformation);
  });

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
            display: "flex",
            backgroundColor: `var(--themebg)`,
          }}
        >
          <Grid item sm={12} sx={{ padding: "30px" }}>
            <h2>Profile information </h2>
            <Card className="">
              {userData ? (
                <UserInfo loginInfo={userData} />
              ) : (
                <h1>You are not logged in</h1>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
