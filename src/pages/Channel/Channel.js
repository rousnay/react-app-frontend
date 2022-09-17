import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/Constants";
import { useToken, useUser } from "../../auth/userAuth";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import swal from "sweetalert";
import Uploader from "../../components/uploader";
import { ChannelStyles } from "./ChannelStyles";
import LogoSquareBlack from "../../assets/logo-square-black.svg";

async function createChannel(authToken, payloadData) {
  return fetch(`${API_URL}/channel`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authToken,
    },
    body: payloadData,
  }).then((data) => data.json());
}

export default function Channel() {
  const navigate = useNavigate();
  const [token] = useToken();
  const [user] = useUser();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);

  var formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("image", image[0]);
  formData.append("bannerImage", bannerImage[0]);

  const submitChannelInfo = async (e) => {
    e.preventDefault();

    const response = await createChannel(token, formData);
    if (response.message === "Success") {
      localStorage.setItem("channelId", response.data.id);
      console.log(response.data.id);
      swal("Success", "Channel has been created", "success", {
        buttons: ["Back to dashboard", "Create MetaTrack"],
      }).then((createChannel) => {
        if (createChannel) {
          navigate("/CreateTrack");
        } else {
          navigate("/Dashboard");
        }
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
    if (user.channelId) {
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
          <ChannelStyles>
            <Stack direction="row" spacing={2}>
              <Grid item sm={12} md={6}>
                <Box sm={6} sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" sx={{ color: `var(--logoblack)` }}>
                    Channel Information
                  </Typography>
                  <p>
                    Please enter information about your channel. Most of the
                    channel information can be re-edited at any time. If the
                    image is not set, it is exposed as the default.
                  </p>
                </Box>
              </Grid>

              <Grid item sm={12} md={6} sx={{ textAlign: "right" }}>
                <Link to="/" style={{ height: "fit-content" }}>
                  <img src={LogoSquareBlack} alt="Logo" />
                </Link>
              </Grid>
            </Stack>
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
          </ChannelStyles>
        </Grid>
      </Container>
    </>
  );
}
