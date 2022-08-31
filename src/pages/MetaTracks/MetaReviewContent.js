import React, { useState, useEffect, useRef, useCallback } from "react";
// import map from "mapbox-gl";
import {
  Container,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Uploader from "./uploader";
import swal from "sweetalert";
import { onMapClick, onDataDelete, onDataChange } from "./InteractionHandler";
import "./style.css";

const userInfo = JSON.parse(localStorage.getItem("userData")) || null;
const localUserData = JSON.parse(localStorage.getItem("userData"));
const localUserToken = localStorage.token;
const localChannelId = localUserData.channelId;
const localCurrentTrackId = localStorage.currentTrackId;
const localCurrentTrackName = localStorage.currentTrackName;

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmludXRzcyIsImEiOiJja3BvdjJwdWYwcHQ3Mm9udXo4M3Nod3YzIn0.OMVZjImaogKth_ApsJTlNg";

const baseURL = "https://api.finutss.com";
async function addNewPin(payloadData) {
  // console.log("__________s_________");

  // for (const pair of payloadData.entries()) {
  //   console.log(`${pair[0]}: ${pair[1]}`);
  // }

  // for (const value of payloadData.values()) {
  //   console.log(value);
  // }
  // payloadData.forEach((element) => {
  //   console.log(element);
  // });
  // console.log("__________e_________");

  return fetch(`${baseURL}/track/${localCurrentTrackId}/pin-point`, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localUserToken,
    },
    body: payloadData,
  }).then((data) => data.json());
}

export default function MetaReviewContent(props) {
  // ===============================
  // dynamic input setup STARTs
  // ===============================
  const [formValues, setFormValues] = useState(props.localFormValues);

  const newFormSubmit = (pin_id, pin_name, pin_save) => {
    let newValues = {
      id: pin_id,
      name: pin_name,
      save: pin_save,
    };
    setFormValues([...formValues, newValues]);
  };

  useEffect(() => {
    localStorage.setItem("formValuesLocal", JSON.stringify(formValues));
  }, [formValues]);

  const foundIndex = formValues.findIndex((x) => x.id === props.pinId);

  // ===============================
  // dynamic input setup ENDs
  // ===============================

  useEffect(() => {
    console.log(props.pinName);
    setPinName(props.pinName);
  }, [props.pinName]);

  const [name, setPinName] = useState("");
  const [text, setPinText] = useState("");
  const [sound, setPinSound] = useState([]);
  const [image, setPinImage] = useState([]);

  var formData = new FormData();
  formData.append("id", props.pinId);
  formData.append("lon", props.pinLon);
  formData.append("lat", props.pinLat);
  formData.append("distanceInKm", props.distanceInKm);
  formData.append("feature", props.feature);
  formData.append("name", name);
  formData.append("text", text);
  formData.append("sound", sound[0]);
  formData.append("image", image[0]);

  const formValueSet = [props.pinId, name, "saved"];

  const submitMetaInfo = async (e) => {
    e.preventDefault();

    const response = await addNewPin(formData);
    if (response.message === "Success") {
      swal("Success", "Pin has been add", "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        if (foundIndex === -1) {
          newFormSubmit(...formValueSet);
        } else {
          console.log("This pin was saved before");
          formValues[foundIndex].id = props.pinId;
          formValues[foundIndex].name = name;
          localStorage.setItem("formValuesLocal", JSON.stringify(formValues));
        }
      });
    } else {
      swal("Oops!", response.error, "error", {
        buttons: true,
      }).then((value) => {});
    }
  };

  function setPinSoundFile(fileItems) {
    const _pinSoundFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    setPinSound(_pinSoundFileItem);
  }

  function setPinImageFile(fileItems) {
    const _pinImageFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    setPinImage(_pinImageFileItem);
  }

  return (
    <>
      <form noValidate onSubmit={submitMetaInfo} style={props.formVisibility}>
        <h4>Metadata</h4>
        <div className="meta_input_wrapper">
          {/* {inputFields.map((input, index) => {
            return (
              <div key={index}> */}

          {/* <input type="hidden" name="id" value={props.id} />
          <input type="hidden" name="lon" value={props.lon} />
          <input type="hidden" name="lat" value={props.lat} />
          <input type="hidden" name="distanceInKm" value={props.distanceInKm} />
          <input type="hidden" name="feature" value={props.feature} /> */}

          <TextField
            variant="outlined"
            label="Name"
            value={name}
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            onChange={(e) => setPinName(e.target.value)}
          />

          <TextField
            variant="outlined"
            label="Distance"
            value={`${props.distanceInKm} km from pin 1`}
            margin="normal"
            required
            fullWidth
            id="pinDistance"
            name="pinDistance"
            // onChange={(e) => setPinDistance(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Text"
            multiline
            fullWidth
            id="pinText"
            name="pinText"
            maxRows={4}
            onChange={(e) => setPinText(e.target.value)}
          />
          <div className="pinSoundUpload">
            <Uploader
              files={sound}
              name={"sound"}
              onupdatefiles={(soundFileItems) =>
                setPinSoundFile(soundFileItems)
              }
              labelIdle='Drop Sound for pin or <span class="filepond--label-action">Browse</span>'
            />
          </div>
          <div className="pinImageUpload">
            <Uploader
              files={image}
              name={"image"}
              onupdatefiles={(imageFileItems) =>
                setPinImageFile(imageFileItems)
              }
              labelIdle='Drop Image for pin or <span class="filepond--label-action">Browse</span>'
            />
          </div>

          {/* </div>
            );
          })} */}
        </div>

        {/* <button onClick={submit}>Submit</button> */}
        <Button
          type="submit"
          fullWidth
          size="small"
          variant="contained"
          color="logoblue"
          className="pinInfoSubmit"
        >
          Save Pin {props.selectedPinIndex + 1}
        </Button>
      </form>
    </>
  );
}
