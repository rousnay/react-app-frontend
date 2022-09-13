import * as React from "react";
import {
  Container,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Skeleton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";

export default function CommentList(props) {
  return (
    <>
      <ul className="trc-data-list">
        {props.commentsData.map((trackItem, index) => (
          <li key={index}>
            <div className="trackInfo">
              <Stack direction="row" spacing={2}>
                <img
                  className="trackImg"
                  src={trackItem.previewImage}
                  alt="Track Preview"
                />

                <div className="trackText">
                  <h4>{trackItem.name}</h4>
                  <div className="cr-counter">
                    <span>
                      <FavoriteIcon /> {trackItem.commentArray.length}
                    </span>
                    <span>
                      <MessageIcon /> {trackItem.reactionArray.length}
                    </span>
                  </div>
                </div>
              </Stack>
            </div>

            <div className="commentInfo">
              <Stack direction="row" spacing={2}>
                <img
                  className="trackImg"
                  src="https://via.placeholder.com/1024x395?text=Preview+Image"
                  alt="Comment preview"
                />

                <Avatar
                  alt="Remy Sharp"
                  src={
                    trackItem.commentArray[trackItem.commentArray.length - 1]
                      ?.user.profilePhoto
                  }
                />

                <div className="commentMeta">
                  <h4>
                    {
                      trackItem.commentArray[trackItem.commentArray.length - 1]
                        ?.user.firstName
                    }
                  </h4>
                  <p>
                    {
                      trackItem.commentArray[trackItem.commentArray.length - 1]
                        ?.text
                    }
                  </p>
                </div>
              </Stack>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
