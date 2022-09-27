import { useState } from "react";
// import { useToken } from "../../../hooks/useUserInfo";
// import { RequestApi } from "../../../components/RequestApi";
import { Menu, MenuItem, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// ReactionCount (sub) Component=====================
export function CommentListReply({ commentId, reactionArray }) {
  let count = 0;
  reactionArray.forEach((element) => {
    if (element.commentId === commentId) {
      count += 1;
    }
  });
  return <p style={{ margin: 0 }}>{count} </p>;
}

// OptionMenu (sub) Component=====================
export function OptionMenu({ commentId }) {
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

// ReplyOptions (main) Component=====================

export default function ReplyOptions({ commentId, reactionArray }) {
  return (
    <>
      <div className="ReplyOptions">
        <div className="reactionMeta">
          <div className="cr-counter">
            <span>
              <FavoriteIcon />
              <ReactionCount
                commentId={commentId}
                reactionArray={reactionArray}
              />
            </span>
          </div>
        </div>

        <div className="optionMeta">
          <OptionMenu commentId={commentId} />
        </div>
      </div>
    </>
  );
}
