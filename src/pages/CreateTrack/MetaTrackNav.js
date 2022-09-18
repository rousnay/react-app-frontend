import React from "react";
import { Link } from "react-router-dom";
import { TrackCreationNavStyled } from "./MetaTracksStyles";

import { Grid } from "@mui/material";

export default function TrackCreationNav() {
  return (
    <>
      <Grid item sm={12}>
        <TrackCreationNavStyled>
          <li>
            <Link to="/CreateTrack">
              <span>1</span> Track Info
            </Link>
          </li>
          <li>
            <Link to="/CreateTrack/MetaInfo">
              <span>2</span> Meta Info
            </Link>
          </li>
          <li>
            <Link to="#">
              <span>3</span> Action
            </Link>
          </li>
          <li>
            <Link to="/CreateTrack/TrackReview">
              <span>4</span> Review
            </Link>
          </li>
        </TrackCreationNavStyled>
      </Grid>
    </>
  );
}
