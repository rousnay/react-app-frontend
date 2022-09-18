import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/CONSTANTS";
import { useToken, useUser } from "../../auth/userAuth";
import { Container, Grid, Button, TextField } from "@mui/material";
import swal from "sweetalert";
import logo from "../../assets/logo.svg";
import TreadmillBg from "../../assets/treadmill-bg.svg";

async function loginUser(credentials) {
  return fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const genDeviceToken = (() => {
  return Math.random().toString(36).substring(2, 8);
})();

export default function SignIn() {
  const [token, setToken] = useToken();
  const [, setUser] = useUser();
  const navigate = useNavigate();

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
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const deviceType = "ios";
  const deviceToken = genDeviceToken;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password,
      deviceType,
      deviceToken,
    });
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
        navigate("/Dashboard");
      });
    } else if (response.statusCode === 400) {
      swal("Failed", response.message[0], "error");
    } else {
      swal("Failed", response.error, "error");
      console.log(token);
    }
  };

  return (
    <>
      <Container maxWidth="xl" sx={{}}>
        <Grid container>
          <Grid item sm={12} md={6} sx={{ padding: "30px 30px 0 0" }}>
            <Link to="/">
              <img src={logo} alt="Logo" />
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
                  color="logoblue"
                  disabled={!email || !password}
                >
                  Sign In
                </Button>
              </form>
              <p>
                Don’t have an account?{" "}
                <Link to="/SignUp">
                  <span style={{ color: "var(--logored)" }}>Sign Up</span>
                </Link>
              </p>
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
              src={TreadmillBg}
              alt="App Preview"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
