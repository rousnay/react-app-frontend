import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/Constants";
import { useToken, useUser } from "../../auth/userAuth";
// import { useQueryParams } from "../../utils/useQueryParams";
import {
  Container,
  Grid,
  Button,
  TextField,
  Stack,
  Divider,
} from "@mui/material";
import swal from "sweetalert";
import logo from "../../assets/logo.svg";
import OtpBg from "../../assets/otp-bg.svg";

async function userSignUp(payloadData) {
  return fetch(`${API_URL}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloadData),
  }).then((data) => data.json());
}

// async function oauthSignUp(provider) {
//   return fetch(`${API_URL}/user/auth/${provider}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((data) => data.json());
// }

const genDeviceToken = (() => {
  return Math.random().toString(36).substring(2, 8);
})();

export default function EmailSignUp() {
  const navigate = useNavigate();
  const [, setToken] = useToken();
  const [, setUser] = useUser();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const deviceType = "ios";
  const deviceToken = genDeviceToken;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await userSignUp({
      username,
      email,
      password,
      deviceType,
      deviceToken,
    });

    if (response.message === "Success") {
      swal("Success", "Going for email verification...", "success", {
        buttons: false,
        timer: 1000,
      }).then((value) => {
        setToken(response.data.token);
        setUser(response.data);
        navigate("/EmailVerification");
      });
    } else {
      swal("Failed", response.error, "error");
    }
  };

  // const signUpWithOAuth = async (e, provider) => {
  //   e.preventDefault();
  //   const response = await oauthSignUp(provider);
  //   console.log(provider, response);
  //   if (response.message === "Success") {
  //     swal("Success", `Signup with ${provider}`, "success", {
  //       buttons: false,
  //       timer: 1000,
  //     }).then((value) => {
  //       setToken(response.data.token);
  //       setUser(response.data);
  //       navigate("/UpdateUserInformation");
  //     });
  //   } else {
  //     swal("Failed", response.error, "error");
  //   }
  // };

  return (
    <>
      <Container maxWidth="xl" sx={{}}>
        <Grid container>
          <Grid item sm={12} md={6} sx={{ padding: "30px 30px 0 0" }}>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>

            <h3 style={{ marginTop: "50px" }}>Sign Up with your email</h3>
            <p>FINUTSS will sent a OTP to your email address</p>
            <div className="formHolder">
              <form className="" noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
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

                <p style={{ fontStyle: "italic" }}>
                  Press send button to receive a verification code.
                </p>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="logoblue"
                >
                  Send
                </Button>
              </form>
            </div>
            <Stack
              style={{ marginTop: "50px", justifyContent: "center" }}
              direction="row"
              spacing={2}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Button
                type="submit"
                variant="contained"
                color="themegreen"
                // onClick={(e) => signUpWithOAuth(e, "google")}
                onClick={() => {
                  window.location.href = `${API_URL}/user/auth/google`;
                }}
              >
                login with Google
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="themeyellow"
                // onClick={(e) => signUpWithOAuth(e, "kakao")}
                onClick={() => {
                  window.location.href = `${API_URL}/user/auth/kakao`;
                }}
              >
                login with Kakao
              </Button>
            </Stack>
            <p style={{ textAlign: "center", marginTop: "40px" }}>
              Already have an account?{" "}
              <Link to="/SignIn">
                <span style={{ color: "var(--logored)" }}>Sign In</span>
              </Link>
            </p>
          </Grid>

          <Grid
            item
            sm={12}
            md={6}
            sx={{
              backgroundColor: ` var(--logoblack)`,
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
              src={OtpBg}
              alt="App Preview"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
