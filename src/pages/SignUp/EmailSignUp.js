import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToken, useUser } from "../../auth/userAuth";
import { Container, Grid, Button, TextField } from "@mui/material";
import swal from "sweetalert";
import logo from "../../assets/logo.svg";
import OtpBg from "../../assets/otp-bg.svg";

async function userSignUp(payloadData) {
  return fetch("https://api.finutss.com/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloadData),
  }).then((data) => data.json());
}

const genDeviceToken = (() => {
  return Math.random().toString(36).substring(2, 8);
})();

export default function EmailSignUp() {
  const navigate = useNavigate();
  const [token, setToken] = useToken();
  const [, setUser] = useUser();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const deviceType = "ios";
  const deviceToken = genDeviceToken;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await userSignUp({
      email,
      username,
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

  useEffect(() => {
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
  }, []);
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
