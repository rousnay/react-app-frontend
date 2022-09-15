import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import LogoSquareBlack from "../../assets/logo-square-black.svg";
import swal from "sweetalert";
import Uploader from "./uploader";
import "./Channel.css";

const userToken = localStorage.getItem("token");
const userData = JSON.parse(localStorage.getItem("userData"));

const baseURL = "https://api.finutss.com";
async function createChannel(payloadData) {
  return fetch(`${baseURL}/channel`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + userToken,
    },
    body: payloadData,
  }).then((data) => data.json());
}

export default function Channel() {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);

  var formData = new FormData();
  // formData.append("id", channelId);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("image", image[0]);
  formData.append("bannerImage", bannerImage[0]);

  const submitChannelInfo = async (e) => {
    e.preventDefault();

    const response = await createChannel(formData);
    console.log(response);

    if (response.message === "Success") {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        // localStorage.setItem("userData", JSON.stringify(response.data));
        // window.location.href = "/AddUserInformation";
      });
    } else {
      swal("Failed", response.error, "error");
    }
  };

  function setImagedata(fileItems) {
    const _imageFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    console.log(_imageFileItem[0]);
    setImage(_imageFileItem);
  }
  function setBannerImagedata(fileItems) {
    const _BannerImageFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    console.log(_BannerImageFileItem[0]);
    setBannerImage(_BannerImageFileItem);
  }

  useEffect(() => {
    if (!userData) {
      swal("Oops!", "Please sign in first", "error", {
        buttons: false,
        timer: 1500,
      }).then((value) => {
        window.location.href = "/SignIn";
      });
    } else if (userData.channelId) {
      swal("Channel exist!", `You already have a channel`, "info", {
        buttons: ["Back to dashboard", "View your channel"],
      }).then((goToChannel) => {
        if (goToChannel) {
          navigate("/ChannelProfile");
        } else {
          navigate("/Dashboard");
        }
      });
    } else {
    }
  });

  return (
    <>
      <Container maxWidth="xl" sx={{}}>
        <Grid container sx={{ marginTop: "30px" }}>
          <Grid item sm={12} md={6}>
            <Box sm={6} sx={{ flexGrow: 1 }}>
              <Typography variant="h4" sx={{ color: `var(--logoblack)` }}>
                Channel Information
              </Typography>
              <p>
                Please enter information about your channel. Most of the channel
                information can be re-edited at any time. If the image is not
                set, it is exposed as the default.
              </p>
            </Box>
          </Grid>

          <Grid item sm={12} md={6} sx={{ textAlign: "right" }}>
            <Link to="/" style={{ height: "fit-content" }}>
              <img src={LogoSquareBlack} alt="Logo" />
            </Link>
          </Grid>
          <form
            style={{ width: "100%" }}
            noValidate
            onSubmit={submitChannelInfo}
          >
            <Grid container>
              <Grid item sm={12} md={5} className="channelTextInput">
                <TextField
                  variant="outlined"
                  label="Channel Name"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  // id="standard-multiline-flexible"
                  variant="outlined"
                  label="Description"
                  multiline
                  fullWidth
                  id="description"
                  name="description"
                  maxRows={4}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>

              <Grid
                item
                sm={12}
                md={7}
                sx={{
                  display: "flex",
                  flexFlow: "column",
                  alignItems: "center",
                }}
              >
                <div className="channelImageUpload">
                  <div className="thumImageUpload">
                    <h4>Channel Image</h4>
                    <Uploader
                      files={image}
                      name={"image"}
                      onupdatefiles={(fileItems) => setImagedata(fileItems)}
                      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                  </div>

                  <div className="bannerImageUpload">
                    <h4>Banner Image</h4>
                    <Uploader
                      files={bannerImage}
                      name={"bannerImage"}
                      onupdatefiles={(fileItems) =>
                        setBannerImagedata(fileItems)
                      }
                      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="logoblue"
                  className="channelSubmit"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
}
