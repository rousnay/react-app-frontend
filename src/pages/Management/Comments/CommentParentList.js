import { useState } from "react";
import {
  Stack,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import CommentActionMenu from "./CommentActionMenu";
import CommentReplyList from "./CommentReplyList";

// RecentComment (sub) Component=====================
export function RecentComment({ commentArray }) {
  const sortedCommentArray = commentArray.sort((a, b) =>
    a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
  );
  const recentComment = sortedCommentArray.reverse();

  return (
    <>
      <div className="commentMeta">
        <h4>{recentComment[0].user.firstName}</h4>
        <p>{recentComment[0].text}</p>
      </div>
    </>
  );
}

// CommentList (main) Component=====================
export default function CommentParentList({ currentUser, commentsData }) {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {commentsData.map((trackItem, index) => (
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

                <RecentComment
                  commentArray={trackItem?.comments?.commentArray}
                />
              </Stack>
            </div>
          </AccordionSummary>

          <AccordionDetails>
            <CommentReplyList
              index={index}
              currentUser={currentUser}
              trackItem={trackItem}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
