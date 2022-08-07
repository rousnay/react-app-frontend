import React, { useState, useEffect } from "react";
// import { useState } from "react";
import { Container, Grid, Card, Box } from "@mui/material";
// import { styled } from "@mui/material/styles";
import TreadmillBg from "../../assets/treadmill-bg.svg";
import PrivetHeader from "./PrivetHeader";
import UserInfo from "./UserInfo";

const userData = JSON.parse(localStorage.getItem("userData"));
const userToken = localStorage.getItem("token");

export default function Dashboard() {
  const [userInformation, setInformation] = useState();
  // Function to collect data
  const getApiData = async () => {
    const response = await fetch("http://13.124.197.107:3000/user/info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    }).then((response) => response.json());

    // update the state
    if (response.message === "Success") {
      setInformation(response);
      localStorage.setItem("userData", JSON.stringify(response.data));
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  console.log(userInformation);

  return (
    <>
      <Container maxWidth="xl" sx={{}}>
        <Grid container>
          <Grid item sm={12} sx={{}}>
            <Box sx={{ flexGrow: 1 }}>
              <PrivetHeader loginInfo={userData} />
            </Box>
          </Grid>

          <Grid item sm={12} md={6} sx={{ padding: "30px 30px 0 0" }}>
            <h2>Profile information </h2>
            <Card className="">
              {userData ? (
                <UserInfo loginInfo={userData} />
              ) : (
                <h1>You are not logged in</h1>
              )}
            </Card>
          </Grid>

          <Grid
            item
            sm={12}
            md={6}
            sx={{
              backgroundColor: ` var(--logoblack)`,
              height: "calc(100vh - 78px)",
              display: "flex",
              justifyContent: "center",
              padding: "50px",
            }}
          >
            <img
              style={{
                alignSelf: "center",
                width: "100%",
              }}
              src={TreadmillBg}
              alt="App Preview"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
