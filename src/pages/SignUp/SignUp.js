import React from "react";
import { useState } from "react";
import { Container, Grid, Button, TextField } from "@mui/material";
import swal from "sweetalert";
// import { styled } from "@mui/material/styles";
import logo from "../../assets/logo.svg";
import OtpBg from "../../assets/otp-bg.svg";

async function loginUser(payloadData) {
  // console.log(credentials);
  return fetch("https://api.finutss.com/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloadData),
  }).then((data) => data.json());
}

export default function SignUp() {
  const [countryCode, setCountryCode] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const deviceType = "ios";
  const deviceToken = "string";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      countryCode,
      phoneNumber,
      deviceType,
      deviceToken,
    });
    console.log(response);

    if (response.message === "Success") {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        localStorage.setItem("userData", JSON.stringify(response.data));
        window.location.href = "/MobileVerification";
      });
    } else if (response.statusCode === 400) {
      swal("Failed", response.message[0], "error");
    } else {
      swal("Failed", response.message, "error");
    }
  };

  return (
    <>
      <Container maxWidth="xl" sx={{}}>
        <Grid container>
          <Grid item sm={12} md={6} sx={{ padding: "30px 30px 0 0" }}>
            <img src={logo} alt="Logo" />
            <h3>Verify your Identity</h3>
            <p>
              FINUTSS is receiving identity verification to prevent identity
              theft and encourage transparent community operation.
            </p>
            <div className="">
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
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <p style={{ fontStyle: "italic" }}>
                  The verification code is valid upto 10 minutes. If the input
                  time is exceeded, press resend to receive a new verification
                  code.
                </p>
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
              src={OtpBg}
              alt="App Preview"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
