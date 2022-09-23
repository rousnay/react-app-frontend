import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToken, useChannel } from "../../hooks/useUserInfo";
import { RequestApi } from "../../components/RequestApi";
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
import Uploader from "../../components/Uploader";
import { ChannelStyles } from "./ChannelStyles";
import LogoSquareBlack from "../../assets/logo-square-black.svg";

export default function Channel() {
  const navigate = useNavigate();
  const [token] = useToken();
  const [channelId, setChannelId] = useChannel();
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

    const [response] = await RequestApi("POST", `channel`, token, formData);

    if (response.message === "Success") {
      console.log(setChannelId(response.data));
      setChannelId(response.data.id);
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
    if (channelId) {
      swal("Channel exist!", `You already have a channel`, "info", {
        buttons: ["Back to Channel", "Create a Track"],
      }).then((createTrack) => {
        if (createTrack) {
          navigate("/CreateTrack");
        } else {
          navigate("/Channel/ChannelProfile");
        }
      });
    } else {
    }
  }, [channelId, navigate]);

  return (
    <>
      <Container maxWidth="xl" sx={{}}>
        <Grid container sx={{ marginTop: "30px" }}>
          <ChannelStyles>
            <Stack direction="row" spacing={2}>
              <Grid item sm={12} md={6}>
                <Box sm={6} sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" sx={{ color: `var(--logoBlack)` }}>
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
                        onUpdateFiles={(fileItems) => setImagedata(fileItems)}
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                      />
                    </div>

                    <div className="bannerImageUpload">
                      <h4>Banner Image</h4>
                      <Uploader
                        files={bannerImage}
                        name={"bannerImage"}
                        onUpdateFiles={(fileItems) =>
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
                    color="logoBlue"
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
