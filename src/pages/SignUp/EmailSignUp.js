import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/CONSTANTS";
import { useToken, useUser } from "../../hooks/useUserInfo";
import { RequestApi } from "../../components/RequestApi";
// import { useQueryParams } from "../../utils/useQueryParams";
import jwt_deocde from "jwt-decode";
import { useScript } from "../../hooks/useScript";
import { GOOGLE_CLIENT_ID } from "../../utils/CONSTANTS";

import {
  Container,
  Grid,
  Button,
  TextField,
  Stack,
  Divider,
} from "@mui/material";
import swal from "sweetalert";
import Logo from "../../assets/logo.svg";
import OtpBg from "../../assets/otp-bg.svg";

const genDeviceToken = (() => {
  return Math.random().toString(36).substring(2, 8);
})();

export default function EmailSignUp() {
  // Initialization of variables =================
  const navigate = useNavigate();
  const [, setToken] = useToken();
  const [, setUser] = useUser();
  const deviceType = "ios";
  const deviceToken = genDeviceToken;
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [checkPassword, setCheckPassword] = useState();

  useEffect(() => {
    if (newPassword === confirmPassword) {
      setCheckPassword("");
      setPassword(confirmPassword);
    } else {
      setCheckPassword("error");
    }
  }, [newPassword, confirmPassword]);

  // Signup form handler =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = JSON.stringify({
      username,
      email,
      password,
      deviceType,
      deviceToken,
    });

    const [response] = await RequestApi("POST", `user/signup`, "", formData);
    if (response.message === "Success") {
      swal("Success", "Going for email verification...", "success", {
        buttons: false,
        timer: 1000,
      }).then((value) => {
        setToken(response.data.token);
        setUser(response.data);
        navigate("/SignUp/EmailVerification");
      });
    } else {
      swal("Failed", response.error, "error");
    }
  };

  // Signup with Google =================
  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: onGoogleSignIn,
      auto_select: false,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("signUpWithGoogle"),
      { theme: "outline", size: "large" }
    );
  });

  const onGoogleSignIn = (response) => {
    let googleToken = response.credential;
    let payload = jwt_deocde(googleToken);
    setToken(googleToken);
    setUser(payload);
    localStorage.setItem("googleToken", JSON.stringify(googleToken));
    navigate("/SignUp/OAuthSignUpForm");
  };

  // async function oauthSignUp(provider) {
  //   return fetch(`${API_URL}/user/auth/${provider}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((data) => data.json());
  // }

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
              <img src={Logo} alt="Logo" />
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
                  id="newPassword"
                  name="newPassword"
                  label="Password"
                  type="newPassword"
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  type="confirmPassword"
                  label="Confirm Password"
                  helperText={
                    checkPassword === "error" ? "Passwords don't match." : ""
                  }
                  error={checkPassword === "error" ? true : false}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <p style={{ fontStyle: "italic" }}>
                  Press send button to receive a verification code.
                </p>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="logoBlue"
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
                color="themeGreen"
                // onClick={(e) => signUpWithOAuth(e, "google")}
                onClick={() => {
                  window.location.href = `${API_URL}/user/auth/google`;
                }}
              >
                login with Google
              </Button>

              <div id="signUpWithGoogle"></div>

              <Button
                type="submit"
                variant="contained"
                color="themeYellow"
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
                <span style={{ color: "var(--logoRed)" }}>Sign In</span>
              </Link>
            </p>
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
              src={OtpBg}
              alt="App Preview"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
