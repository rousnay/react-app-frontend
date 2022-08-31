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
      <div className="track_info_container">
        <h3>Track Information</h3>
        <h4>{props.data.name}</h4>
        <p>{props.data.description}</p>
        <ul>
          {/* {props.data.tags.map((tag, i) => {
          <li key={i}>{tag}</li>;
        })} */}
        </ul>
        <img src={props.data.previewImage} alt="Track Preview" />
      </div>
    </>
  );
}
