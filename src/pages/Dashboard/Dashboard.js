// import { useState, useEffect } from "react";
// import { useToken, useUser } from "../../auth/userAuth";
import { useUser } from "../../auth/userAuth";
import { Container, Grid, Card } from "@mui/material";
import PrivetSideBar from "../../components/PrivetSideBar";
import PrivetHeader from "../../components/PrivetHeader";
import UserInfo from "./UserInfo";

export default function Dashboard() {
  const [user] = useUser();

  // const [token] = useToken();
  // const [userData, setUserData] = useState({});
  // useEffect(() => {
  //   (async function () {
  //     const response = await fetch("https://api.finutss.com/user/info", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + token,
  //       },
  //     }).then((data) => data.json());
  //     if (response.message === "Success") {
  //       setUserData(response.data);
  //     }
  //   })();
  // }, []);

  return (
    <>
      <PrivetHeader loginInfo={user} />
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
              {user ? (
                <UserInfo loginInfo={user} />
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
