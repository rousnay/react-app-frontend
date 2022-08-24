import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Button, TextField } from "@mui/material";
import swal from "sweetalert";
import logo from "../../assets/logo.svg";
import TreadmillBg from "../../assets/treadmill-bg.svg";

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
};

// User data
const userData = JSON.parse(localStorage.getItem("userData"));

async function addUserInfo(authToken, payloadData) {
  return fetch("https://api.finutss.com/user", {
    method: "POST",
    headers: {
      //   "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + authToken,
    },
    body: payloadData,
  }).then((data) => data.json());
}

export default function AddUserInformation() {
  const [userToken, setUserToken] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(
    (userData) => {
      if (!userData) {
        swal("Oops!", "Please get verified with mobile number first", "error", {
          buttons: true,
          buttons: ["Back to sign up", "Verify mobile number"],
        }).then((willSingUp) => {
          if (willSingUp) {
            swal("Going for mobile verification..", {
              icon: "success",
              timer: 1000,
            }).then((value) => {
              window.location.href = "/MobileVerification";
            });
          } else {
            window.location.href = "/SignUp";
          }
        });
      } else if (userData.email) {
        swal(
          "Oops!",
          `You are already verified with ${userData.countryCode} ${userData.phoneNumber} and signed in`,
          "info",
          {
            buttons: ["Go to dashboard", "Logout"],
            // buttons: true,
            dangerMode: true,
          }
        ).then((willLoggedOut) => {
          if (willLoggedOut) {
            swal("You have been logged out!", {
              icon: "success",
              timer: 1000,
            }).then((value) => {
              handleLogout();
              window.location.href = "/SignUp";
            });
          } else {
            window.location.href = "/Dashboard";
          }
        });
      } else {
        setUserToken(userData.token);
      }
    },
    [userData]
  );
  console.log(userToken);

  var formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await addUserInfo(userToken, formData);

    if (response.message === "Success") {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        window.location.href = "/SignIn";
      });
    } else {
      swal("Failed", response.message[0], "error");
      console.log(response);
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
                  className=""
                >
                  Submit
                </Button>
              </form>
            </div>
            <p>
              Already have an account?{" "}
              <Link to="/SignUp">
                <span style={{ color: "var(--logored)" }}>Sign in</span>
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
              src={TreadmillBg}
              alt="App Preview"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
