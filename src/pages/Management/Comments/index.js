import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToken, useUser, useChannel } from "../../../hooks/useUserInfo";
import { RequestApi } from "../../../components/RequestApi";
import { Container, Grid, Typography } from "@mui/material";
import swal from "sweetalert";
import PrivetSideBar from "../../../components/PrivetSideBar";
import PrivetHeader from "../../../components/PrivetHeader";
import { ManageCommentsStyled } from "./ManagementStyles";
import ManageCommentOptions from "./ManageCommentOptions";
import CommentParentList from "./CommentParentList";

export default function ManageComments() {
  const navigate = useNavigate();
  const [token] = useToken();
  const [user] = useUser();
  const [channelId] = useChannel();
  const [loading, setLoading] = useState(true);
  const [trackInfo, setTrackInfo] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("createdAt");
  let [orderBy, setOrderBy] = useState("");

  const filteredTCRData = trackInfo
    .filter((item) => {
      return item.comments.count > 1 || item.reactions.count > 1;
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  // TrackList ==================
  const getTrackList = useCallback(async () => {
    const [getTrackListData] = await RequestApi(
      "GET",
      `track/user/listing`,
      token
    );
    return await getTrackListData.data.tracksArray;
  }, [token]);

  // TrackInfo ==================
  const getTrackInfo = useCallback(async () => {
    const trackListAsyncData = await getTrackList();
    const trackListData = trackListAsyncData.filter((trackItem) => {
      return trackItem.status !== "deleted";
    });
    const trackInfoPromises = trackListData.map(async (trackItem) => {
      const [getTrackInfoData] = await RequestApi(
        "GET",
        `/track/${trackItem.id}/info`,
        token
      );
      return await getTrackInfoData.data;
    });

    let trackWithInfoArray = (await Promise.all(trackInfoPromises)).map(
      (obj) => obj
    );
    setLoading(false);
    setTrackInfo(trackWithInfoArray);
  }, [getTrackList, token]);

  useEffect(() => {
    (async function () {
      await getTrackInfo();
    })();
  }, [getTrackInfo]);

  // Checkpoint for channel existence ==================
  useEffect(() => {
    if (!channelId) {
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
  }, [channelId, navigate]);

  return (
    <>
      <PrivetHeader loginInfo={user} />

      <Container maxWidth="xl" sx={{ display: " flex" }}>
        <Grid
          container
          sx={{
            width: "230px",
            display: "flex",
            backgroundColor: `var(--logoBlack)`,
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
                backgroundColor: `var(--themeBackground)!important`,
                padding: "0!important",
              }}
            >
              {loading ? (
                <Typography>Loading...</Typography>
              ) : (
                <ManageCommentsStyled>
                  <ManageCommentOptions
                    query={query}
                    onQueryChange={(myQuery) => setQuery(myQuery)}
                    orderBy={orderBy}
                    onOrderByChange={(mySort) => setOrderBy(mySort)}
                    sortBy={sortBy}
                    onSortByChange={(mySort) => setSortBy(mySort)}
                  />

                  <CommentParentList
                    currentUser={user}
                    commentsData={filteredTCRData}
                  />
                </ManageCommentsStyled>
              )}
            </Container>
          </div>
        </Grid>
      </Container>
    </>
  );
}
