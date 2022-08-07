import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Container, Grid, Button, TextField } from "@mui/material";
import swal from "sweetalert";
import logo from "../../assets/logo.svg";
import TreadmillBg from "../../assets/treadmill-bg.svg";

// User data
const userData = JSON.parse(localStorage.getItem("userData"));
const userToken = userData.token;
console.log(userToken);

async function loginUser(credentials) {
  console.log(credentials);

  return fetch("http://13.124.197.107:3000/user", {
    method: "POST",
    headers: {
      //   "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + userToken,
    },
    body: credentials,
  }).then((data) => data.json());
}

export default function AddUserInformation() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const deviceType = "ios";
  const deviceToken = "string";

  var formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("deviceType", deviceType);
  formData.append("deviceToken", deviceToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(formData);

    console.log(response);
    if (response.message === "Success") {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        localStorage.setItem("userData", JSON.stringify(response.data));
        window.location.href = "/Dashboard";

        swal("Success", response.message, "success", {
          title: "Sweet!",
          text: "Modal with a custom image.",
          imageUrl: "https://unsplash.it/400/200",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
        });
      });
    } else {
      swal("Failed", response.message, "error");
      console.log(response);
    }
  };

  return (
    <>
      <Container maxWidth="xl" sx={{}}>
        <Grid container>
          <Grid item sm={12} md={6} sx={{ padding: "30px 30px 0 0" }}>
            <img src={logo} alt="Logo" />

            <div className="">
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
              height: "calc(100vh - 78px)",
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