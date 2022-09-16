import { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import PrivetSideBar from "../../components/PrivetSideBar";
import PrivetHeader from "../../components/PrivetHeader";
import { ManageCommentsStyled } from "./ManagementStyles";
import ManageCommentOptions from "./ManageCommentOptions";
import CommentList from "./CommentList";

const userInfo = JSON.parse(localStorage.getItem("userData")) || null;
const localUserToken = localStorage.token;
const baseURL = "https://api.finutss.com";

export default function ManageComments() {
  const [userData, setUserData] = useState(false);
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

  useEffect(() => {
    console.log(trackCommentReaction);
  }, [trackCommentReaction]);

  useEffect(() => {
    (async function () {
      await getUserInfo();
      await getAllReaction();
    })();
  }, []);

  // getUserData ==================
  async function getUserInfo() {
    try {
      const reqData = await fetch(`${baseURL}/user/info`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localUserToken,
        },
      });
      const resData = await reqData.json();
      setUserData(resData.data);
      return resData.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // TrackData ==================
  async function getTracks() {
    try {
      const reqData = await fetch(`${baseURL}/track/user/listing`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localUserToken,
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
        const reqComment = await fetch(`${baseURL}/comment/${trackItem.id}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localUserToken,
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
        const reqReaction = await fetch(`${baseURL}/reaction/${trackItem.id}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localUserToken,
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

  return (
    <>
      <PrivetHeader loginInfo={userInfo} />

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
                  currentUser={userData}
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
