import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../hooks/userAuth";
import {
  Container,
  Grid,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import swal from "sweetalert";
import Logo from "../../assets/logo.svg";
import OtpBg from "../../assets/otp-bg.svg";

export default function SignUp() {
  // Initialization of variables =================
  const navigate = useNavigate();
  const [token] = useToken();
  const [filterCheckboxs, setFilterCheckboxs] = useState([
    {
      name: "Accept All",
      checked: false,
    },
    { name: "14 years of age or older (Required)", checked: false },
    { name: "Agree to Terms of Service (Required)", checked: false },
    { name: "Agree to Privacy Policy (Required)", checked: false },
    { name: "Get news of events, and benefits (Optional)", checked: false },
  ]);

  // handle checkbox value changes =================
  const handleCardFilterValueChange = (name) => {
    setFilterCheckboxs((prevState) => {
      if (name === "Accept All") {
        return prevState.map((item) => {
          return { ...item, checked: !prevState[0].checked };
        });
      } else {
        const modifiedPrevState = prevState.map((item) => {
          if (item.name === name) {
            return { ...item, checked: !item.checked };
          } else {
            return item;
          }
        });
        modifiedPrevState[0].checked =
          modifiedPrevState[1].checked &&
          modifiedPrevState[2].checked &&
          modifiedPrevState[3].checked;
        return modifiedPrevState;
      }
    });
  };

  // Checkbox submission  =================
  const handleTermsSubmit = (e) => {
    e.preventDefault();
    navigate("/SignUp/EmailSignUp");
  };

  // Checkpoint for login existence =================
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
  }, [token, navigate]);
  return (
    <>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item sm={12} md={6} sx={{ padding: "30px 30px 0 0" }}>
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>

            <div className="formHolder" style={{ marginTop: "100px" }}>
              <Typography
                sx={{
                  color: `var(--logoRed)`,
                  fontWeight: 700,
                  fontSize: "18px",
                  textTransform: "uppercase",
                }}
              >
                Read this condition and check it.
              </Typography>
              <FormGroup sx={{ margin: "30px 0" }}>
                {filterCheckboxs.map((item) => (
                  <FormControlLabel
                    key={item.name}
                    label={item.name}
                    control={
                      <Checkbox
                        color="logoBlue"
                        style={{
                          padding: "5px 20px",
                        }}
                        checked={item.checked}
                        onChange={() => handleCardFilterValueChange(item.name)}
                      />
                    }
                  />
                ))}
              </FormGroup>

              <Button
                type="submit"
                style={{
                  width: "100%",
                  maxWidth: "350px",
                }}
                variant="contained"
                color="logoBlue"
                disabled={
                  !filterCheckboxs[1].checked ||
                  !filterCheckboxs[2].checked ||
                  !filterCheckboxs[3].checked
                }
                onClick={(e) => handleTermsSubmit(e)}
              >
                SING UP
              </Button>
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
