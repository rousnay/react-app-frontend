import { useState } from "react";
import { useToken } from "../../../hooks/useUserInfo";
import { RequestApi } from "../../../components/RequestApi";
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
import ReplyOptions from "./ReplyOptions";

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

  const submitNewComment = async (
    e,
    i,
    selectedParentCommentId,
    selectedPinPointId
  ) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("parentCommentId", selectedParentCommentId);
    formData.append("pinPointId", selectedPinPointId);
    formData.append("text", commentList[i]);

    const [response] = await RequestApi("POST", `comment`, token, formData);

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
                      <FavoriteIcon /> {trackItem.reactions?.count}
                    </span>
                    <span>
                      <MessageIcon /> {trackItem.comments?.count}
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
                    trackItem.comments?.commentArray[
                      trackItem.comments?.count - 1
                    ]?.user.firstName
                  }
                  src={
                    trackItem.comments?.commentArray[
                      trackItem.comments?.count - 1
                    ]?.user.profilePhoto
                  }
                />

                <div className="commentMeta">
                  <h4>
                    {
                      trackItem.comments?.commentArray[
                        trackItem.comments?.count - 1
                      ]?.user.firstName
                    }
                  </h4>
                  <p>
                    {
                      trackItem.comments?.commentArray[
                        trackItem.comments?.count - 1
                      ]?.text
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
                  onClick={(e) =>
                    submitNewComment(
                      e,
                      index,
                      trackItem.comments?.commentArray[
                        trackItem.comments?.count - 1
                      ]?.id,
                      trackItem.comments?.commentArray[
                        trackItem.comments?.count - 1
                      ]?.pinPointId
                    )
                  }
                >
                  <TelegramIcon fontSize="large" color={`var(--themeBlue)`} />
                </IconButton>
              </Stack>

              {trackItem.comments?.commentArray
                .slice(0)
                .reverse()
                .map((commentItem, index) => (
                  <li key={index}>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ justifyContent: "space-between" }}
                    >
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

                      <ReplyOptions
                        commentId={commentItem.id}
                        reactionArray={trackItem.reactions?.reactionArray}
                      />
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
