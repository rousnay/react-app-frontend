import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToken, useUser, useChannel } from "../../hooks/useUserInfo";
import { RequestApi } from "../../components/RequestApi";
import { Container, Grid, Button, TextField } from "@mui/material";
import swal from "sweetalert";
import Logo from "../../assets/logo.svg";
import TreadmillBg from "../../assets/treadmill-bg.svg";

const genDeviceToken = (() => {
  return Math.random().toString(36).substring(2, 8);
})();

export default function SignIn() {
  // Initialization of variables =================
  const navigate = useNavigate();
  const [token, setToken] = useToken();
  const [, setUser] = useUser();
  const [, setChannelId] = useChannel();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const deviceType = "ios";
  const deviceToken = genDeviceToken;

  // Sign in form handler =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = JSON.stringify({
      email,
      password,
      deviceType,
      deviceToken,
    });

    const [response] = await RequestApi("POST", `user/login`, token, formData);
    if (response.message === "Success") {
      swal(
        "Welcome to FINTUSS",
        `${response.data.firstName} ${response.data.lastName}`,
        "success",
        {
          buttons: false,
          timer: 2000,
        }
      ).then((value) => {
        setToken(response.data.token);
        setUser(response.data);
        setChannelId(response.data.channelId);
        navigate("/Dashboard");
      });
    } else if (response.statusCode === 400) {
      swal("Failed", response.message[0], "error");
    } else {
      swal("Failed", response.error, "error");
      console.log(token);
    }
  };

  // Checkpoint for login existence =================
  (() => {
    if (token) {
      swal("Oops!", "You are already signed in with an account", "info", {
        buttons: ["Go to dashboard", "Logout"],
        dangerMode: true,
      }).then((willLoggedOut) => {
        if (willLoggedOut) {
          swal("You have been logged out!", {
            icon: "success",
            timer: 1000,
          }).then((value) => {
            localStorage.clear();
            window.location.reload();
          });
        } else {
          navigate("/Dashboard");
        }
      });
    }
  })();

  return (
    <>
      <Container maxWidth="xl" sx={{}}>
        <Grid container>
          <Grid item sm={12} md={6} sx={{ padding: "30px 30px 0 0" }}>
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>

            <div className="formHolder" style={{ marginTop: "50px" }}>
              <form className="" noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="logoBlue"
                  disabled={!email || !password}
                >
                  Sign In
                </Button>
              </form>
              <p>
                Don’t have an account?{" "}
                <Link to="/SignUp">
                  <span style={{ color: "var(--logoRed)" }}>Sign Up</span>
                </Link>
              </p>
            </div>
          </Grid>

          <Grid
            item
            sm={12}
            md={6}
            sx={{
              backgroundColor: ` var(--logoBlack)`,
              height: "100vh",
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
