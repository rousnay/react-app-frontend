import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Grid, Button, TextField } from "@mui/material";
import swal from "sweetalert";
import { useToken } from "../../auth/useToken";
import Uploader from "../../components/uploader";
import logo from "../../assets/logo.svg";
import TreadmillBg from "../../assets/treadmill-bg.svg";

async function addUserInfo(authToken, payloadData) {
  for (const pair of payloadData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  return fetch("https://api.finutss.com/user", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + authToken,
    },
    body: payloadData,
  }).then((data) => data.json());
}

export default function UpdateUserInformation() {
  const [token, setToken] = useToken();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setaddressLine1] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [profilePhoto, setProfilePhoto] = useState([]);

  var formData = new FormData();
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("addressLine1", addressLine1);
  formData.append("state", state);
  formData.append("zipCode", zipCode);
  formData.append("country", country);
  formData.append("profilePhoto", profilePhoto[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await addUserInfo(token, formData);
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

  async function getUserInfo() {
    const response = await fetch("https://api.finutss.com/user/info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((data) => data.json());

    if (response.message === "Success") {
      return response.data;
    }
  }
  useEffect(() => {
    (async function () {
      const userData = await getUserInfo();
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setaddressLine1(userData.addressLine1);
      setState(userData.state);
      setZipCode(userData.zipCode);
      setCountry(userData.country);
      setProfilePhoto(userData.profilePhoto);

      console.log(userData);
    })();
  }, []);

  return (
    <>
      <Container maxWidth="xl" sx={{}}>
        <Grid container>
          <Grid item sm={12} md={6} sx={{ padding: "30px 30px 0 0" }}>
            <Link to="/">
              <img src={logo} alt="Logo" />
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
                  onChange={(e) => setaddressLine1(e.target.value)}
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
                    onupdatefiles={(fileItems) =>
                      setProfilePhotoData(fileItems)
                    }
                    labelIdle='Drag & Drop your photo or <span class="filepond--label-action">Browse</span>'
                  />
                </div>

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
            {/* <p>
              Wanna do it latter?{" "}
              <Link to="/Dashboard">
                <span style={{ color: "var(--logored)" }}>Skip</span>
              </Link>
            </p> */}
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
