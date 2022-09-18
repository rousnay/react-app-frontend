import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../auth/userAuth";
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
import logo from "../../assets/logo.svg";
import OtpBg from "../../assets/otp-bg.svg";

export default function SignUp() {
  const [token] = useToken();
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

  const handleCardFilterValueChange = (name) => {
    // handle checkbox value changes
    setFilterCheckboxs((prevState) => {
      // if "All" clicked and checked uncheck everything else check everything.
      if (name === "Accept All") {
        return prevState.map((item) => {
          return { ...item, checked: !prevState[0].checked };
        });
        // if 'New', 'In Progress' or 'Complete' clicked revert thir value from true to false or false to true.
      } else {
        const modifiedPrevState = prevState.map((item) => {
          if (item.name === name) {
            return { ...item, checked: !item.checked };
          } else {
            return item;
          }
        });
        // for each user click other than 'All'; modify 'All' button's checked value.
        // If  'New', 'In Progress' and 'Complete' checked, check 'All' else uncheck 'All'
        modifiedPrevState[0].checked =
          modifiedPrevState[1].checked &&
          modifiedPrevState[2].checked &&
          modifiedPrevState[3].checked;
        return modifiedPrevState;
      }
    });
  };

  const handleTermsSubmit = (e) => {
    e.preventDefault();
    navigate("/SignUp/EmailSignUp");
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item sm={12} md={6} sx={{ padding: "30px 30px 0 0" }}>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>

            <div className="formHolder" style={{ marginTop: "100px" }}>
              <Typography
                sx={{
                  color: `var(--logored)`,
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
                        color="logoblue"
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
                color="logoblue"
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
