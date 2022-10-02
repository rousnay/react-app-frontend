import { useState, useEffect, useCallback } from "react";
import { useToken } from "../../../hooks/useUserInfo";
import { RequestApi } from "../../../components/RequestApi";
// import { Menu, MenuItem, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";

// CommentReaction Component=====================
export function CommentReaction({ trackArray, parentCommentId }) {
  const [token] = useToken();
  const [trackWithAllInfoArray, setTrackWithAllInfoArray] = useState([]);
  // const [reactionArray, setReactionArray] = useState([]);
  const [reactionCount, setReactionCount] = useState(0);
  const [replyArray, setReplyArray] = useState([]);

  // Reaction Count ==================
  const getReactionList = useCallback(async () => {
    const [getReactionListData] = await RequestApi(
      "GET",
      `reaction?commentId=${parentCommentId}`,
      token
    );
    const totalReaction = await getReactionListData.data.count;
    setReactionCount(totalReaction);
  }, [parentCommentId, token]);

  // const allReactionArray = useCallback(() => {
  //   const reactionArrays = trackWithAllInfoArray.map((trackItem, index) => {
  //     return trackItem.reactions?.reactionArray?.filter((reactionItem) => {
  //       return (
  //         reactionItem.type === "like" &&
  //         reactionItem.commentId === parentCommentId
  //       );
  //     });
  //   });
  //   setReactionArray(reactionArrays.flat());
  // }, [trackWithAllInfoArray, parentCommentId]);

  const allReplyArray = useCallback(() => {
    const replyArrays = trackWithAllInfoArray.map((trackItem, index) => {
      return trackItem.comments?.commentArray?.filter((commentItem) => {
        return (
          commentItem.deletedAt === null &&
          commentItem.parentCommentId === parentCommentId
        );
      });
    });
    setReplyArray(replyArrays.flat());
  }, [trackWithAllInfoArray, parentCommentId]);

  useEffect(() => {
    setTrackWithAllInfoArray(trackArray);
    (async function () {
      await getReactionList();
    })();
    // allReactionArray();
    allReplyArray();
  }, [allReplyArray, getReactionList, trackArray]);

  return (
    <div className="trackText">
      <div className="cr-counter">
        <span>
          <FavoriteIcon /> {reactionCount}
        </span>
        <span>
          <MessageIcon /> {replyArray.length}
        </span>
      </div>
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
