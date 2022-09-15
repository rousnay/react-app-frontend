import { useState, useEffect } from "react";
import { Container, Grid, Card } from "@mui/material";
import PrivetSideBar from "../../components/PrivetSideBar";
import PrivetHeader from "../../components/PrivetHeader";
import UserInfo from "./UserInfo";

const userToken = localStorage.getItem("token");

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    (async function () {
      await getUserInfo();
    })();
  }, []);

  async function getUserInfo() {
    const response = await fetch("https://api.finutss.com/user/info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    }).then((data) => data.json());

    if (response.message === "Success") {
      setUserInfo(response.data);
    }
  }

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
            display: "flex",
            backgroundColor: `var(--themebg)`,
          }}
        >
          <Grid item sm={12} sx={{ padding: "30px" }}>
            <h2>Profile information </h2>
            <Card className="">
              {userInfo ? (
                <UserInfo loginInfo={userInfo} />
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
