import { useState, useEffect, useCallback } from "react";
import {
  Stack,
  Avatar,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  TrackImage,
  PinImage,
  CommentReaction,
} from "./CommentParentListParts";
import CommentReplyList from "./CommentReplyList";

export default function CommentParentList({ currentUser, commentsData }) {
  // Accordion Fn=====================
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Data manipulation =====================
  const [trackWithAllInfoArray, setTrackWithAllInfoArray] = useState([]);
  const [parentCommentsArray, setParentCommentsArray] = useState([]);

  const commentHasNoParentArray = useCallback(() => {
    const parentCommentsMultipleArrays = trackWithAllInfoArray.map(
      (trackItem, index) => {
        return trackItem.comments?.commentArray?.filter((commentItem) => {
          return (
            commentItem.deletedAt === null &&
            commentItem.pinPointId !== null &&
            commentItem.parentCommentId === null
          );
        });
      }
    );
    const parentCommentsSortedSingleArray = parentCommentsMultipleArrays
      .flat()
      .sort((a, b) =>
        a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
      );
    setParentCommentsArray(parentCommentsSortedSingleArray.reverse());
  }, [trackWithAllInfoArray]);

  useEffect(() => {
    setTrackWithAllInfoArray(commentsData);
    commentHasNoParentArray();
  }, [commentHasNoParentArray, commentsData]);

  return (
    <>
      {parentCommentsArray.map((parentCommentItem, index) => (
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
            sx={{ width: "100%" }}
          >
            {/* <Stack direction="row" spacing={2}> */}
            <div className="trackInfo">
              <Stack direction="row" spacing={2}>
                <TrackImage
                  trackArray={trackWithAllInfoArray}
                  trackId={parentCommentItem.trackId}
                />
                <Divider orientation="vertical" variant="middle" flexItem />
                <PinImage
                  trackArray={trackWithAllInfoArray}
                  trackId={parentCommentItem.trackId}
                  pinPointId={parentCommentItem.pinPointId}
                />
              </Stack>
            </div>
            <div className="commentInfo">
              <Stack direction="row" spacing={2}>
                <Avatar
                  alt={parentCommentItem.user?.firstName}
                  src={parentCommentItem.user?.profilePhoto}
                />
                <div className="commentMeta">
                  <h4>{parentCommentItem.user.firstName}</h4>
                  <p>{parentCommentItem.text}</p>
                </div>
              </Stack>
            </div>
            <CommentReaction
              trackArray={trackWithAllInfoArray}
              parentCommentId={parentCommentItem.id}
            />
            {/* </Stack> */}
          </AccordionSummary>

          <AccordionDetails>
            <CommentReplyList
              index={index}
              currentUser={currentUser}
              trackArray={trackWithAllInfoArray}
              parentCommentId={parentCommentItem.id}
              pinPointId={parentCommentItem.pinPointId}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
