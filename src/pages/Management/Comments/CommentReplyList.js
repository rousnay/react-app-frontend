import { useState, useEffect, useCallback } from "react";
import { Stack, Avatar } from "@mui/material";
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
    setReplyArray(commentReplySortedSingleArray.reverse());
  }, [trackWithAllInfoArray, parentCommentId]);

  useEffect(() => {
    setTrackWithAllInfoArray(trackArray);
    allReplyArray();
  }, [allReplyArray, trackArray]);

  return (
    <>
      <ul className="comments-list-sub">
        <AddReply
          currentUser={currentUser}
          index={index}
          parentCommentId={parentCommentId}
          pinPointId={pinPointId}
        />

        {replyArray.map((replayItem, index) => (
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
                  <p>{replayItem.createdAt}</p>
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
    </>
  );
}
