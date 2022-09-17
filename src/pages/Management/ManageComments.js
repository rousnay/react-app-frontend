import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/Constants";
import { useToken, useUser } from "../../auth/userAuth";
import { Container, Grid } from "@mui/material";
import swal from "sweetalert";
import PrivetSideBar from "../../components/PrivetSideBar";
import PrivetHeader from "../../components/PrivetHeader";
import { ManageCommentsStyled } from "./ManagementStyles";
import ManageCommentOptions from "./ManageCommentOptions";
import CommentList from "./CommentList";

export default function ManageComments() {
  const navigate = useNavigate();
  const [token] = useToken();
  const [user] = useUser();

  const [trackCommentReaction, setTrackCommentReaction] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("createdAt");
  let [orderBy, setOrderBy] = useState("");

  const filteredTCRData = trackCommentReaction
    .filter((item) => {
      return item.commentArray.length > 1 || item.reactionArray.length > 1;
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  // TrackData ==================
  async function getTracks() {
    try {
      const reqData = await fetch(`${API_URL}/track/user/listing`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const resData = await reqData.json();
      return resData.data?.tracksArray;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // CommentsData ==================
  async function getAllComments() {
    try {
      const trackAsyncData = await getTracks();
      const commentsPromises = trackAsyncData.map(async (trackItem) => {
        const reqComment = await fetch(`${API_URL}/comment/${trackItem.id}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const resComment = await reqComment.json();
        return Object.assign(trackItem, {
          commentArray: resComment.data.commentArray,
        });
      });
      let trackWithCommentsArray = (await Promise.all(commentsPromises)).map(
        (obj) => obj
      );
      return trackWithCommentsArray;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // ReactionData ==================
  async function getAllReaction() {
    try {
      const trackWithCommentsData = await getAllComments();
      const reactionPromises = trackWithCommentsData.map(async (trackItem) => {
        const reqReaction = await fetch(`${API_URL}/reaction/${trackItem.id}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const resReaction = await reqReaction.json();
        return Object.assign(trackItem, {
          reactionArray: resReaction.data.reactionArray,
        });
      });
      let trackWithCommentsAndReactionArray = (
        await Promise.all(reactionPromises)
      ).map((obj) => obj);
      setTrackCommentReaction(trackWithCommentsAndReactionArray);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  useEffect(() => {
    (async function () {
      await getAllReaction();
      // await getUserInfo();
    })();
  }, []);

  useEffect(() => {
    if (!user.channelId || !localStorage.channelId) {
      swal("No channel exist!", "Please create a channel first", "error", {
        buttons: ["Back to dashboard", "Create channel"],
      }).then((createChannel) => {
        if (createChannel) {
          navigate("/Channel");
        } else {
          navigate("/Dashboard");
        }
      });
    }
  }, []);

  // useEffect(() => {
  //   console.log(trackCommentReaction);
  // }, [trackCommentReaction]);

  // getUserData ==================
  // async function getUserInfo() {
  //   try {
  //     const reqData = await fetch(`${baseURL}/user/info`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     });
  //     const resData = await reqData.json();
  //     setUserData(resData.data);
  //     return resData.data;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // }

  return (
    <>
      <PrivetHeader loginInfo={user} />

      <Container maxWidth="xl" sx={{ display: " flex" }}>
        <Grid
          container
          sx={{
            width: "230px",
            display: "flex",
            backgroundColor: `var(--logoblack)`,
          }}
        >
          <PrivetSideBar />
        </Grid>

        <Grid
          container
          sx={{
            width: "calc(100% - 230px)",
            padding: "30px",
            display: "flex",
          }}
        >
          <div
            style={{ display: "flex", width: "100%", flexDirection: "column" }}
          >
            <Container
              className="content"
              sx={{
                backgroundColor: `var(--themebg)!important`,
                padding: "0!important",
              }}
            >
              <ManageCommentsStyled>
                <ManageCommentOptions
                  query={query}
                  onQueryChange={(myQuery) => setQuery(myQuery)}
                  orderBy={orderBy}
                  onOrderByChange={(mySort) => setOrderBy(mySort)}
                  sortBy={sortBy}
                  onSortByChange={(mySort) => setSortBy(mySort)}
                />

                <CommentList
                  currentUser={user}
                  commentsData={filteredTCRData}
                />
              </ManageCommentsStyled>
            </Container>
          </div>
        </Grid>
      </Container>
    </>
  );
}
