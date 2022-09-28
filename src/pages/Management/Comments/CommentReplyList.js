import { useState, useEffect, useCallback } from "react";
import { useToken } from "../../../hooks/useUserInfo";
import { RequestApi } from "../../../components/RequestApi";
import swal from "sweetalert";
import { Stack, Avatar, TextareaAutosize, IconButton } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import { ReplyReaction, ReplyActionMenu } from "./CommentReplyListParts";

export default function CommentReplyList({
  index,
  currentUser,
  trackArray,
  parentCommentId,
}) {
  const [token] = useToken();
  const [replyList, setReplyList] = useState([]);
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

  const handleCommentInputChange = (e, index) => {
    const list = [...replyList];
    list[index] = e.target.value;
    setReplyList(list);
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
    formData.append("text", replyList[i]);

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
      <ul className="comments-list-sub">
        <Stack direction="row" spacing={2}>
          <Avatar
            alt={currentUser?.firstName}
            src={currentUser?.profilePhoto}
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
                parentCommentId,
                trackArray.comments?.commentArray[
                  trackArray.comments?.count - 1
                ]?.pinPointId
              )
            }
          >
            <TelegramIcon fontSize="large" color={`var(--themeBlue)`} />
          </IconButton>
        </Stack>

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
                <ReplyReaction
                  trackArray={trackWithAllInfoArray}
                  replyId={replayItem.id}
                />
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
