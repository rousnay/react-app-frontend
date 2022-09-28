import { useState, useEffect, useCallback } from "react";
// import { useToken } from "../../../hooks/useUserInfo";
// import { RequestApi } from "../../../components/RequestApi";
import { Menu, MenuItem, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// ReplyReaction Component=====================
export function ReplyReaction({ commentId, trackArray }) {
  const [trackWithAllInfoArray, setTrackWithAllInfoArray] = useState([]);
  const [reactionArray, setReactionArray] = useState([]);

  const allReactionArray = useCallback(() => {
    const reactionArrays = trackWithAllInfoArray.map((trackItem, index) => {
      return trackItem.reactions?.reactionArray?.filter((reactionItem) => {
        return (
          reactionItem.type === "like" && reactionItem.commentId === commentId
        );
      });
    });
    setReactionArray(reactionArrays.flat());
  }, [trackWithAllInfoArray, commentId]);

  useEffect(() => {
    setTrackWithAllInfoArray(trackArray);
    allReactionArray();
  }, [allReactionArray, trackArray]);

  let count = 0;
  reactionArray.forEach((element) => {
    if (element.commentId === commentId) {
      count += 1;
    }
  });

  return (
    <div className="reactionMeta">
      <div className="cr-counter">
        <span>
          <FavoriteIcon />
          <p style={{ margin: 0 }}>{count} </p>
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
