import { useState, useEffect, useCallback } from "react";
import ReactPaginate from "react-paginate";
import {
  Stack,
  Avatar,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {
  TrackImage,
  PinImage,
  CommentReaction,
} from "./CommentParentListParts";
import CommentReplyList from "./CommentReplyList";

export default function CommentParentList({
  currentUser,
  commentsData,
  updateCommentList,
}) {
  // Accordion Fn=====================
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Data manipulation =====================
  const [trackWithAllInfoArray, setTrackWithAllInfoArray] = useState([]);
  const [parentCommentsArray, setParentCommentsArray] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

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
    const theParentCommentsArray = parentCommentsSortedSingleArray.reverse();
    setParentCommentsArray(theParentCommentsArray);
    return theParentCommentsArray;
  }, [trackWithAllInfoArray]);

  // pagination
  const paginatedComments = useCallback(() => {
    const allParentCommentsArray = commentHasNoParentArray();
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(allParentCommentsArray.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(allParentCommentsArray.length / itemsPerPage));
  }, [commentHasNoParentArray, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % parentCommentsArray.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setTrackWithAllInfoArray(commentsData);
    paginatedComments();
  }, [commentsData, paginatedComments]);

  return (
    <>
      {currentItems.map((parentCommentItem, index) => (
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
              updateCommentList={updateCommentList}
            />
          </AccordionDetails>
        </Accordion>
      ))}
      <Stack spacing={2}>
        <ReactPaginate
          className="commentPagination"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          breakLabel="..."
          previousLabel={<NavigateBeforeIcon color="themeBlack" />}
          nextLabel={<NavigateNextIcon color="themeBlack" />}
        />
      </Stack>
    </>
  );
}
