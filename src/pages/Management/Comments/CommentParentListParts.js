import { useState, useEffect, useCallback } from "react";
// import { useToken } from "../../../hooks/useUserInfo";
// import { RequestApi } from "../../../components/RequestApi";
import { Menu, MenuItem, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";

// ReplyReaction Component=====================
export function CommentReaction({ commentId, trackArray }) {
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
    <div className="trackText">
      {/* <h4>{trackItem.name}</h4>
      <div className="cr-counter">
        <span>
          <FavoriteIcon /> {trackItem.reactions?.count}
        </span>
        <span>
          <MessageIcon /> {trackItem.comments?.count}
        </span>
      </div> */}
    </div>
  );
}

// TrackImage Component=====================
export function TrackImage({ trackArray, trackId }) {
  const currentTrackIndex = trackArray.findIndex(
    (trackItem) => trackItem.id === trackId
  );

  return (
    <>
      <img
        className="trackImage"
        src={trackArray[currentTrackIndex].previewImage}
        alt="Track Preview"
      />
    </>
  );
}

// PinImage Component=====================
export function PinImage({ trackArray, trackId, pinPointId }) {
  const currentTrackIndex = trackArray.findIndex(
    (trackItem) => trackItem.id === trackId
  );
  const currentPinPointArray =
    trackArray[currentTrackIndex].pinPoints?.pinPointArray;
  const currentPinIndex = currentPinPointArray.findIndex(
    (pinItem) => pinItem.id === pinPointId
  );
  const pinPointImage = currentPinPointArray[currentPinIndex].image;

  return (
    <>
      <img
        className="pinImage"
        src={
          pinPointImage === "undefined" || pinPointImage === null
            ? "https://via.placeholder.com/1024x395?text=No+media+exist"
            : pinPointImage
        }
        alt={currentPinPointArray[currentPinIndex].id}
      />
    </>
  );
}
