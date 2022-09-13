import React, { useState, useEffect } from "react";
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
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextareaAutosize,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import TelegramIcon from "@mui/icons-material/Telegram";

const localUserToken = localStorage.token;
const baseURL = "https://api.finutss.com";

export default function CommentAccordion(props) {
  const [expanded, setExpanded] = useState(false);
  const [userData, setUserData] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    (async function () {
      await getUserInfo();
    })();
  }, []);

  // getUserData ==================
  async function getUserInfo() {
    try {
      const reqData = await fetch(`${baseURL}/user/info`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localUserToken,
        },
      });
      const resData = await reqData.json();
      setUserData(resData.data);
      return resData.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  return (
    <>
      {props.commentsData.map((trackItem, index) => (
        <Accordion
          className="comments-accordion"
          expanded={expanded === index}
          onChange={handleChange(index)}
          key={index}
        >
          <AccordionSummary
            className="comments-summary"
            id={`${index}-header`}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${index}-content`}
          >
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
                      <FavoriteIcon /> {trackItem.reactionArray?.length}
                    </span>
                    <span>
                      <MessageIcon /> {trackItem.commentArray?.length}
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
          </AccordionSummary>

          <AccordionDetails>
            <ul className="comments-list-sub">
              <Stack direction="row" spacing={2}>
                <Avatar alt="Remy Sharp" src={userData.profilePhoto} />
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Empty"
                  style={{ width: 200 }}
                />

                <IconButton color="primary" aria-label="send the comment">
                  <TelegramIcon fontSize="large" color={`var(--themeblue)`} />
                </IconButton>
              </Stack>

              {trackItem.commentArray
                .slice(0)
                .reverse()
                .map((commentItem, index) => (
                  <li key={index}>
                    <Stack direction="row" spacing={2}>
                      <Avatar
                        alt={commentItem.user.firstName}
                        src={commentItem.user.profilePhoto}
                      />
                      <div className="commentMeta">
                        <h4>{commentItem.user.firstName}</h4>
                        <p>{commentItem.text}</p>
                      </div>
                    </Stack>
                  </li>
                ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
