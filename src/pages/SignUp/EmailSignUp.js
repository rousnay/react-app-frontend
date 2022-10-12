import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/CONSTANTS";
import { useToken, useUser } from "../../hooks/useUserInfo";
import { RequestApi } from "../../components/RequestApi";
import OauthPopup from "react-oauth-popup";

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
  const [externalPopup, setExternalPopup] = useState(null);
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

  // e: React.MouseEvent<HTMLAnchorElement>

  const connectClick = () => {
    const currentUrls = window.location.href;
    console.log(currentUrls);

    const widthP = 500;
    const heightP = 400;
    const left = window.screenX + (window.outerWidth - widthP) / 2;
    const top = window.screenY + (window.outerHeight - heightP) / 2.5;
    const title = `WINDOW TITLE`;
    const url = `https://api.finutss.com/user/auth/google`;
    const popup = window.open(
      url,
      title,
      `width=${widthP},height=${heightP},left=${left},top=${top}`
    );
    setExternalPopup(popup);

    console.log("call-00");
  };

  const onCode = (code, params) => {
    console.log("wooooo a code", code);
    console.log(
      "alright! the URLSearchParams interface from the popup url",
      params
    );
  };
  const onClose = () => console.log("closed!");

  useEffect(() => {
    console.log("call-1");
    if (!externalPopup) {
      console.log("call-2");
      return;
    }

    const timer = setInterval(() => {
      console.log("call-3");

      const currentUrl = externalPopup.location.href;
      console.log(currentUrl);

      if (!externalPopup) {
        timer && clearInterval(timer);
        console.log("call-4");
        return;
      }
      // const currentUrl = externalPopup.location.href;
      // console.log(currentUrl);
      // if (!currentUrl) {
      //   console.log("call-5");
      //   return;
      // }
      const searchParams = new URL(currentUrl).searchParams;
      console.log(searchParams);

      // let { code } = useParams();

      const code = searchParams.get("code");
      console.log(code);

      if (code) {
        externalPopup.close();
        console.log(`The popup URL has URL code param = ${code}`);

        if (code) {
          (async function () {
            const [response] = await RequestApi(
              "GET",
              `user/auth/google/redirect/?code=${code}`
            );
            if (response.message === "Success") {
              console.log(response);
              setUser(response.data);
              setToken(response.data.token);
              // setChannelId(response.data?.channelId);
              // navigate("/Dashboard");
            }
          })();
        }

        // YourApi.endpoint(code).then(() => {
        //   // change UI to show after the code was stored
        //   console.log("done");
        // })
        //   .catch(() => {
        //     // API error
        //   })
        //   .finally(() => {
        //     // clear timer at the end
        //     setExternalPopup(null);
        //     timer && clearInterval(timer);
        //   })
      }
    }, 1000);
  }, [externalPopup, setToken, setUser]);

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
              <Button onClick={connectClick}>Connect</Button>

              <OauthPopup
                url="https://api.finutss.com/user/auth/google"
                onCode={onCode}
                onClose={onClose}
              >
                <div>Click me to open a Popup</div>
              </OauthPopup>

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
