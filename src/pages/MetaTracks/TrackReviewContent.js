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

export default function TrackReviewContent(props) {
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
