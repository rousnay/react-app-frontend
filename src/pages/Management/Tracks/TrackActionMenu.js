import { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// ReplayActionMenu Component=====================
export default function TrackActionMenu({ trackId }) {
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
        id={`positioned-button-${trackId}`}
        aria-controls={open ? `positioned-menu-${trackId}` : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id={`positioned-menu-${trackId}`}
        aria-labelledby={`positioned-button-${trackId}`}
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
        <MenuItem onClick={handleClose}>Edit Track</MenuItem>
        <MenuItem onClick={handleClose}>Sharing Code</MenuItem>
        <MenuItem onClick={handleClose}>Analysis</MenuItem>
        <MenuItem onClick={handleClose}>Comments</MenuItem>
      </Menu>
    </>
  );
}
