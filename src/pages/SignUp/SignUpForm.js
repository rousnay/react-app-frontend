import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Grid, Button, TextField } from "@mui/material";
import swal from "sweetalert";
import { useToken } from "../../auth/useToken";
import logo from "../../assets/logo.svg";
import OtpBg from "../../assets/otp-bg.svg";

async function userSignUp(payloadData) {
  console.log(payloadData);
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

export default function SignUp() {
  const [token, setToken] = useToken();
  const navigate = useNavigate();

  const [countryCode, setCountryCode] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const deviceType = "ios";
  const deviceToken = genDeviceToken;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await userSignUp({
      countryCode,
      phoneNumber,
      deviceType,
      deviceToken,
    });

    if (response.message === "Success") {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        localStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/MobileVerification");
      });
    } else if (response.statusCode === 400) {
      swal("Failed", response.error, "error");
    } else {
      swal("Failed", response.message, "error");
    }
  };

  useEffect(() => {
    if (token) {
      swal("Oops!", "You are already signed in with another account", "info", {
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
          window.location.href = "/Dashboard";
        }
      });
    }
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item sm={12} md={6} sx={{ padding: "30px 30px 0 0" }}>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>

            <h3 style={{ marginTop: "50px" }}>Verify your Identity</h3>
            <p>
              FINUTSS is receiving identity verification to prevent identity
              theft and encourage transparent community operation.
            </p>
            <div className="formHolder">
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
