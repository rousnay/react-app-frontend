import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/userAuth";
import { RequestApi } from "../../components/RequestApi";
import { Container, Grid, Button, TextField } from "@mui/material";
import swal from "sweetalert";
import Logo from "../../assets/logo.svg";
import OtpBg from "../../assets/otp-bg.svg";

export default function EmailVerification() {
  // Initialization of variables =================
  const navigate = useNavigate();
  const [user, setUser] = useUser();
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState();

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  // Verification form handler =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = JSON.stringify({
      email,
      otp,
    });

    const [response] = await RequestApi(
      "POST",
      `user/verify/email`,
      "",
      formData
    );

    if (response.message === "Success") {
      swal("Verified", "your email has been verified successfully", "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        setUser(response.data);
        navigate("/SignUp/UpdateUserInformation");
      });
    } else {
      swal("Failed", response.message[0], "error");
    }
  };

  // Checkpoint for login existence =================
  // (() => {
  // if (!user) {
  //   swal("Oops!", "Please sign up with an email first", "error", {
  //     buttons: ["Back to the home page", "Sing Up"],
  //   }).then((willSingUp) => {
  //     if (willSingUp) {
  //       swal("Going for sign up...", {
  //         icon: "success",
  //         timer: 1000,
  //       }).then((value) => {
  //         navigate("/SignUp");
  //       });
  //     } else {
  //       navigate("/");
  //     }
  //   });
  // } else if (user.firstName) {
  //     swal("Oops!", `You are already verified with ${user.email}`, "info", {
  //       buttons: ["Go to dashboard", "Logout"],
  //       dangerMode: true,
  //     }).then((willLoggedOut) => {
  //       if (willLoggedOut) {
  //         swal("You have been logged out!", {
  //           icon: "success",
  //           timer: 1000,
  //         }).then((value) => {
  //           localStorage.clear();
  //           navigate("/SignUp");
  //         });
  //       } else {
  //         navigate("/Dashboard");
  //       }
  //     });
  //   } else {
  //     setEmail(user.email || "");
  //   }
  // })();
  return (
    <>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item sm={12} md={6} sx={{ padding: "30px 30px 0 0" }}>
            <Link to="/">
              <img src={Logo} alt="Logo" />
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
                  color="logoBlue"
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
