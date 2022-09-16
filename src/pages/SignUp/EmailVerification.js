import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../auth/userAuth";
import { Container, Grid, Button, TextField } from "@mui/material";
import swal from "sweetalert";
import logo from "../../assets/logo.svg";
import OtpBg from "../../assets/otp-bg.svg";

async function emailVerification(payloadData) {
  return fetch("https://api.finutss.com/user/verify/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloadData),
  }).then((data) => data.json());
}

export default function EmailVerification() {
  const navigate = useNavigate();
  const [user, setUser] = useUser();
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await emailVerification({
      email,
      otp,
    });

    if (response.message === "Success") {
      swal("Verified", "your email has been verified successfully", "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        setUser(response.data);
        navigate("/UpdateUserInformation");
      });
    } else {
      swal("Failed", response.message[0], "error");
    }
  };

  useEffect(() => {
    if (!user) {
      swal("Oops!", "Please sign up with an email first", "error", {
        buttons: true,
        buttons: ["Back to the home page", "Sing Up"],
      }).then((willSingUp) => {
        if (willSingUp) {
          swal("Going for sign up...", {
            icon: "success",
            timer: 1000,
          }).then((value) => {
            navigate("/SignUp");
          });
        } else {
          navigate("/");
        }
      });
    } else if (user.firstName) {
      swal("Oops!", `You are already verified with ${user.email}`, "info", {
        buttons: ["Go to dashboard", "Logout"],
        dangerMode: true,
      }).then((willLoggedOut) => {
        if (willLoggedOut) {
          swal("You have been logged out!", {
            icon: "success",
            timer: 1000,
          }).then((value) => {
            localStorage.clear();
            navigate("/SignUp");
          });
        } else {
          navigate("/Dashboard");
        }
      });
    } else {
      setEmail(user.email);
    }
  }, [user]);

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
            <div className="formHolder" style={{ marginTop: "50px" }}>
              <form className="" noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  value={email}
                  label="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
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
                <p style={{ fontStyle: "italic" }}>
                  The verification code is valid upto 10 minutes.
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
