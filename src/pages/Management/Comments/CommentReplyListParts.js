import { useState, useEffect, useCallback } from "react";
import { useToken } from "../../../hooks/useUserInfo";
import { RequestApi } from "../../../components/RequestApi";
import swal from "sweetalert";
import {
  Menu,
  MenuItem,
  IconButton,
  Stack,
  Avatar,
  TextareaAutosize,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TelegramIcon from "@mui/icons-material/Telegram";

// ReplyReaction Component=====================
export function ReplyReaction({ replyId }) {
  const [token] = useToken();
  const [reactionCount, setReactionCount] = useState(0);

  // Reaction Count ==================
  const getReactionList = useCallback(async () => {
    const [getReactionListData] = await RequestApi(
      "GET",
      `reaction?commentId=${replyId}`,
      token
    );
    const totalReaction = await getReactionListData.data.count;
    setReactionCount(totalReaction);
  }, [replyId, token]);

  useEffect(() => {
    (async function () {
      await getReactionList();
    })();
  }, [getReactionList]);

  return (
    <div className="reactionMeta">
      <div className="cr-counter">
        <span>
          <FavoriteIcon />
          <p style={{ margin: 0 }}>{reactionCount} </p>
        </span>
      </div>
    </div>
  );
}

// ReplayActionMenu Component=====================
export function ReplyActionMenu({ commentId }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        aria-label="more"
        id={`positioned-button-${commentId}`}
        aria-controls={open ? `positioned-menu-${commentId}` : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id={`positioned-menu-${commentId}`}
        aria-labelledby={`positioned-button-${commentId}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>Report</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </>
  );
}

// AddReply Component=====================
export function AddReply({
  currentUser,
  index,
  parentCommentId,
  pinPointId,
  updateCommentList,
}) {
  const [token] = useToken();
  const [replyList, setReplyList] = useState([]);
  const [theReply, setTheReply] = useState("");

  const handleCommentInputChange = (e, index) => {
    const list = [...replyList];
    list[index] = e.target.value;
    setReplyList(list);
    setTheReply(list[index]);
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
        timer: 1000,
      }).then((value) => {
        updateCommentList();
        setTheReply("");
        setReplyList([]);
      });
    } else {
      swal("Oops!", response.error, "error", {
        buttons: true,
      }).then((value) => {});
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Avatar alt={currentUser?.firstName} src={currentUser?.profilePhoto} />

        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Write a replay."
          value={theReply}
          onChange={(e) => handleCommentInputChange(e, index)}
        />

        <IconButton
          color="primary"
          aria-label="send the comment"
          onClick={(e) =>
            submitNewComment(e, index, parentCommentId, pinPointId)
          }
        >
          <TelegramIcon fontSize="large" color={`var(--themeBlue)`} />
        </IconButton>
      </Stack>
    </>
  );
}
