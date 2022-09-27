import { useState } from "react";
import { useToken } from "../../../hooks/useUserInfo";
import { RequestApi } from "../../../components/RequestApi";
import swal from "sweetalert";
import { Stack, Avatar, TextareaAutosize, IconButton } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import CommentActionMenu from "./CommentActionMenu";

export default function CommentReplyList({ index, currentUser, trackItem }) {
  const [token] = useToken();

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
                trackItem.comments?.commentArray[trackItem.comments?.count - 1]
                  ?.id,
                trackItem.comments?.commentArray[trackItem.comments?.count - 1]
                  ?.pinPointId
              )
            }
          >
            <TelegramIcon fontSize="large" color={`var(--themeBlue)`} />
          </IconButton>
        </Stack>

        {trackItem.comments?.commentArray
          .sort((a, b) =>
            a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
          )
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
                    <p>{commentItem.createdAt}</p>
                    <p>{commentItem.text}</p>
                  </div>
                </Stack>

                <CommentActionMenu
                  commentId={commentItem.id}
                  reactionArray={trackItem.reactions?.reactionArray}
                />
              </Stack>
            </li>
          ))}
      </ul>
    </>
  );
}
