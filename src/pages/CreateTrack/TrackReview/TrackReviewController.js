import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../utils/CONSTANTS";
import { useToken } from "../../../auth/userAuth";
import swal from "sweetalert";
import {
  Stack,
  Box,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

export default function TrackReviewController(props) {
  const navigate = useNavigate();
  const [token] = useToken();
  const [trackId, setTrackId] = useState("");
  const [privacy, setPrivacy] = useState("");

  useEffect(() => {
    setPrivacy(props.privacy);
    setTrackId(props.data.id);
  }, [props]);

  const handlePrivacyChange = (event) => {
    setPrivacy(event.target.value);
  };

  var formData = new FormData();
  formData.append("privacy", privacy);

  // ===============================
  // updateTrackInfo
  // ===============================
  async function updateTrackInfo(payloadData) {
    try {
      const reqData = await fetch(`${API_URL}/track/${trackId}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: payloadData,
      });
      return await reqData.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const submitUpdatedTrackInfo = async (e) => {
    e.preventDefault();
    const response = await updateTrackInfo(formData);
    if (response.message === "Success") {
      swal(
        "Track Creation Completed!",
        "Meta-track production capabilities are in the testing phase and will be reviewed by the operations to determine whether or not they are finalised to the user. Please note that contents that cause disgust to users, tracks that have problems with their use, and metadata that violates copyright can be returned after review.",
        "success",
        {
          buttons: ["Cancel", "Manage Tracks"],
        }
      ).then((manageTrack) => {
        if (manageTrack) {
          localStorage.removeItem("formValuesLocal");
          localStorage.removeItem("currentTrackId");
          localStorage.removeItem("geoJSONPointLocal");
          localStorage.removeItem("geoJSONLineLocal");
          localStorage.removeItem("centralLineCoordinateLocal");
          navigate("/Management/Tracks");
        }
      });
    } else {
      swal("Oops!", response.error, "error", {
        buttons: true,
      }).then((value) => {});
    }
  };
  return (
    <>
      <Stack direction="row" sx={{ justifyContent: "space-around" }}>
        <p>Privacy Status</p>
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="track-select-label">Privacy</InputLabel>
            <Select
              className="track-list-dropdown"
              labelId="track-select-label"
              id="track-simple-select"
              value={privacy}
              label="Filter"
              onChange={handlePrivacyChange}
            >
              <MenuItem value={"public"} onClick={() => setPrivacy("public")}>
                Public
              </MenuItem>
              <MenuItem
                value={"unlisted"}
                onClick={() => setPrivacy("unlisted")}
              >
                Unlisted
              </MenuItem>
              <MenuItem value={"privet"} onClick={() => setPrivacy("privet")}>
                Private
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <Stack direction="row" sx={{ justifyContent: "space-around" }}>
        <Button
          type="button"
          size="small"
          variant="outlined"
          color="themepurple"
          className="backToTrackInfo"
          onClick={() => {
            navigate("/CreateTrack/MetaInfo");
          }}
        >
          Back
        </Button>

        <Button
          type="button"
          size="small"
          variant="contained"
          color="themepurple"
          className="metaInfoSubmit"
          onClick={(e) => {
            submitUpdatedTrackInfo(e);
          }}
        >
          Next
        </Button>
      </Stack>
    </>
  );
}
