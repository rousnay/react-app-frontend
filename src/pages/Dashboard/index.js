import { useUser } from "../../hooks/userAuth";
import { Container, Grid, Card } from "@mui/material";
import PrivetSideBar from "../../components/PrivetSideBar";
import PrivetHeader from "../../components/PrivetHeader";
import UserInfo from "./UserInfo";

export default function Dashboard() {
  const [user] = useUser();

  return (
    <>
      <PrivetHeader loginInfo={user} />
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
