import { useEffect } from "react";
import { useToken, useUser, useChannel } from "../../hooks/useUserInfo";
import { RequestApi } from "../../components/RequestApi";
import { Container, Grid, Card } from "@mui/material";
import PrivetSideBar from "../../components/PrivetSideBar";
import PrivetHeader from "../../components/PrivetHeader";
import UserInfo from "./UserInfo";

export default function Dashboard() {
  const [user, setUser] = useUser();
  const [token] = useToken();
  const [channelId, setChannelId] = useChannel();

  useEffect(() => {
    (async function () {
      const [response] = await RequestApi("GET", `user/info`, token);
      if (response.message === "Success") {
        setUser(response.data);
        setChannelId(response.data?.channelId);
      }
    })();
  }, [setChannelId, setUser, token]);

  return (
    <>
      <PrivetHeader />
      <Container maxWidth="xl" sx={{ display: " flex" }}>
        <Grid
          container
          sx={{
            width: "230px",
            display: "flex",
            backgroundColor: `var(--logoBlack)`,
          }}
        >
          <PrivetSideBar />
        </Grid>
        <Grid
          container
          sx={{
            width: "calc(100% - 230px)",
            display: "flex",
            backgroundColor: `var(--themeBackground)`,
          }}
        >
          <Grid item sm={12} sx={{ padding: "30px" }}>
            <h2>Profile information </h2>
            <Card className="">
              {user ? (
                <UserInfo userInfo={user} channelId={channelId} />
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
