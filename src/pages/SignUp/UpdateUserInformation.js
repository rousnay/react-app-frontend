import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToken, useUser } from "../../hooks/useUserInfo";
import { RequestApi } from "../../components/RequestApi";
import { Container, Grid, Button, TextField } from "@mui/material";
import swal from "sweetalert";
import Uploader from "../../components/Uploader";
import Logo from "../../assets/logo.svg";
import TreadmillBg from "../../assets/treadmill-bg.svg";

export default function UpdateUserInformation() {
  // Initialization of variables =================
  const navigate = useNavigate();
  const [token] = useToken();
  const [, setUser] = useUser();
  const [firstName, setFirstName] = useState(" ");
  const [lastName, setLastName] = useState(" ");
  const [addressLine1, setAddressLine1] = useState(" ");
  const [state, setState] = useState(" ");
  const [zipCode, setZipCode] = useState(" ");
  const [country, setCountry] = useState(" ");
  const [profilePhoto, setProfilePhoto] = useState([]);

  var formData = new FormData();
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("addressLine1", addressLine1);
  formData.append("state", state);
  formData.append("zipCode", zipCode);
  formData.append("country", country);
  formData.append("profilePhoto", profilePhoto[0]);

  // Updated form handler =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const [response] = await RequestApi("PUT", `user`, token, formData);
    if (response.message === "Success") {
      swal(
        "Profile updated",
        "Good job! profile has been updated successfully",
        "success",
        {
          buttons: false,
          timer: 2000,
        }
      ).then((value) => {
        setUser(response.data);
        navigate("/Dashboard");
      });
    } else {
      swal("Failed", response.error, "error");
      console.log(response);
    }
  };

  function setProfilePhotoData(fileItems) {
    const _gpxFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    setProfilePhoto(_gpxFileItem);
  }

  // Set initial user data from server =================
  useEffect(() => {
    async function getUserInfo() {
      const [response] = await RequestApi("GET", `user/info`, token);
      if (response.message === "Success") {
        return response.data;
      }
    }

    (async function () {
      const userData = await getUserInfo();
      setFirstName(userData.firstName || " ");
      setLastName(userData.lastName || " ");
      setAddressLine1(userData.addressLine1 || " ");
      setState(userData.state || " ");
      setZipCode(userData.zipCode || " ");
      setCountry(userData.country || " ");
      setProfilePhoto(userData.profilePhoto || []);
    })();
  }, [token]);

  return (
    <>
      <Container maxWidth="xl" sx={{}}>
        <Grid container>
          <Grid item sm={12} md={6} sx={{ padding: "30px 30px 0 0" }}>
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
            <h3 style={{ marginTop: "50px" }}>
              Update your profile information{" "}
            </h3>
            <div className="formHolder" style={{ marginTop: "50px" }}>
              <form className="" noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={firstName}
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  label="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="addressLine1"
                  name="addressLine1"
                  value={addressLine1}
                  label="Address Line 1"
                  onChange={(e) => setAddressLine1(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="state"
                  name="state"
                  value={state}
                  label="State"
                  onChange={(e) => setState(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="zipCode"
                  name="zipCode"
                  value={zipCode}
                  label="Zip Code"
                  onChange={(e) => setZipCode(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="country"
                  name="country"
                  value={country}
                  label="Country"
                  onChange={(e) => setCountry(e.target.value)}
                />

                <div className="profileImgUploader">
                  <h5>Profile Photo</h5>
                  <Uploader
                    files={profilePhoto}
                    name={"profilePhoto"}
                    onUpdateFiles={(fileItems) =>
                      setProfilePhotoData(fileItems)
                    }
                    labelIdle='Drag & Drop your photo or <span class="filepond--label-action">Browse</span>'
                  />
                </div>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="logoBlue"
                  className=""
                >
                  Submit
                </Button>
              </form>
            </div>
            {/* <p>
              Wanna do it latter?{" "}
              <Link to="/Dashboard">
                <span style={{ color: "var(--logoRed)" }}>Skip</span>
              </Link>
            </p> */}
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
              src={TreadmillBg}
              alt="App Preview"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
