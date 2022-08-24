import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Button, TextField } from "@mui/material";
import swal from "sweetalert";
// import { styled } from "@mui/material/styles";
import logo from "../../assets/logo.svg";
import OtpBg from "../../assets/otp-bg.svg";

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
};

async function loginUser(payloadData) {
  console.log(payloadData);
  return fetch("https://api.finutss.com/user/verify/mobile", {
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

export default function MobileVerification() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState();

  useEffect(() => {
    if (!userData) {
      swal("Oops!", "Please sign up with a mobile number first", "error", {
        buttons: true,
        buttons: ["Back to the home page", "Sing Up"],
      }).then((willSingUp) => {
        if (willSingUp) {
          swal("Going for sign up...", {
            icon: "success",
            timer: 1000,
          }).then((value) => {
            window.location.href = "/SignUp";
          });
        } else {
          window.location.href = "/";
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
      setCountryCode(userData.countryCode);
      setPhoneNumber(userData.phoneNumber);
    }
  }, [userData]);

  const deviceType = "ios";
  const deviceToken = genDeviceToken;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      countryCode,
      phoneNumber,
      otp,
      deviceType,
      deviceToken,
    });

    if (response.message === "Success") {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data));
        window.location.href = "/AddUserInformation";
      });
    } else {
      swal("Failed", response.message[0], "error");
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
                  id="countryCode"
                  name="countryCode"
                  label="Country Code"
                  type="text"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Mobile Number"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="OPT"
                  name="OTP"
                  label="OTP"
                  type="text"
                  onChange={(e) => setOTP(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="logoblue"
                  className=""
                >
                  Next
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
