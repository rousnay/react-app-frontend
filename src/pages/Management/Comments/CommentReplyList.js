import { useState, useEffect, useCallback } from "react";
import { Stack, Avatar, Button } from "@mui/material";
import {
  ReplyReaction,
  ReplyActionMenu,
  AddReply,
} from "./CommentReplyListParts";

export default function CommentReplyList({
  index,
  currentUser,
  trackArray,
  parentCommentId,
  pinPointId,
}) {
  const [trackWithAllInfoArray, setTrackWithAllInfoArray] = useState([]);
  const [replyArray, setReplyArray] = useState([]);
  const [replyItem, setReplyItem] = useState(6);
  const [currentItems, setCurrentItems] = useState([]);

  const allReplyArray = useCallback(() => {
    const commentReplyMultipleArrays = trackWithAllInfoArray.map(
      (trackItem, index) => {
        return trackItem.comments?.commentArray?.filter((commentItem) => {
          return (
            commentItem.deletedAt === null &&
            commentItem.parentCommentId === parentCommentId
          );
        });
      }
    );

    const commentReplySortedSingleArray = commentReplyMultipleArrays
      .flat()
      .sort((a, b) =>
        a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
      );
    const theReplyArray = commentReplySortedSingleArray.reverse();
    setReplyArray(theReplyArray);
    setCurrentItems(theReplyArray.slice(0, 6));
  }, [trackWithAllInfoArray, parentCommentId]);

  useEffect(() => {
    setTrackWithAllInfoArray(trackArray);
    allReplyArray();
  }, [allReplyArray, trackArray]);

  const handleLoadMore = (newItems) => {
    setReplyItem(newItems);
    setCurrentItems(replyArray.slice(0, newItems));
  };

  const handleHide = () => {
    setReplyItem(6);
    setCurrentItems(replyArray.slice(0, 6));
  };
  return (
    <>
      <ul className="comments-list-sub">
        <AddReply
          currentUser={currentUser}
          index={index}
          parentCommentId={parentCommentId}
          pinPointId={pinPointId}
        />
        {currentItems.map((replayItem, index) => (
          <li key={index}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "space-between" }}
            >
              <Stack direction="row" spacing={2}>
                <Avatar
                  alt={replayItem.user.firstName}
                  src={replayItem.user.profilePhoto}
                />
                <div className="commentMeta">
                  <h4>{replayItem.user.firstName}</h4>
                  <p>{replayItem.text}</p>
                </div>
              </Stack>

              <div className="ReplyOptions">
                <ReplyReaction replyId={replayItem.id} />
                <div className="optionMeta">
                  <ReplyActionMenu replyId={replayItem.id} />
                </div>
              </div>
            </Stack>
          </li>
        ))}
      </ul>
      {replyArray.length > 6 && replyArray.length >= replyItem ? (
        <Button
          sx={{ textTransform: "capitalize", fontWeight: "bold" }}
          variant="text"
          color="logoRed"
          fullWidth
          onClick={() => {
            handleLoadMore(replyItem + 6);
          }}
        >
          Show More
        </Button>
      ) : replyArray.length > 6 && replyArray.length <= replyItem ? (
        <Button
          sx={{ textTransform: "capitalize", fontWeight: "bold" }}
          variant="text"
          color="logoRed"
          fullWidth
          onClick={() => {
            handleHide();
          }}
        >
          Show less
        </Button>
      ) : (
        ""
      )}
    </>
  );
}
