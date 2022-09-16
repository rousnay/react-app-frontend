import { useState } from "react";
import { useToken } from "../../auth/userAuth";
import swal from "sweetalert";
import {
  Stack,
  Avatar,
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

const baseURL = "https://api.finutss.com";

async function addNewComment(authToken, payloadData) {
  return fetch(`${baseURL}/comment`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authToken,
    },
    body: payloadData,
  }).then((data) => data.json());
}

export default function CommentList(props) {
  const [token] = useToken();
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [commentList, setCommentList] = useState([]);
  const handleCommentInputChange = (e, index) => {
    const list = [...commentList];
    list[index] = e.target.value;
    setCommentList(list);
  };

  const submitNewComment = async (e, i, selectedTrackId) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("trackId", selectedTrackId);
    formData.append("text", commentList[i]);

    const response = await addNewComment(token, formData);
    if (response.message === "Success") {
      swal("Success", "Comment has been add", "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        console.log("Comment added");
      });
    } else {
      swal("Oops!", response.error, "error", {
        buttons: true,
      }).then((value) => {});
    }
  };

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
                  alt={
                    trackItem.commentArray[trackItem.commentArray.length - 1]
                      ?.user.firstName
                  }
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
                <Avatar
                  alt={props.currentUser?.firstName}
                  src={props.currentUser?.profilePhoto}
                />

                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Write a replay."
                  onChange={(e) => handleCommentInputChange(e, index)}
                />

                <IconButton
                  color="primary"
                  aria-label="send the comment"
                  onClick={(e) => submitNewComment(e, index, trackItem.id)}
                >
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
