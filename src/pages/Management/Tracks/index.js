import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToken, useUser, useChannel } from "../../../hooks/useUserInfo";
import { RequestApi } from "../../../components/RequestApi";
import swal from "sweetalert";
import { Container, Grid, Typography, Stack } from "@mui/material";
import PrivetSideBar from "../../../components/PrivetSideBar";
import PrivetHeader from "../../../components/PrivetHeader";
import TrackOptionBar from "./TrackOptionBar";
import { TracksStyled } from "./TrackStyles";
import TrackActionMenu from "./TrackActionMenu";

export default function ManageTracks() {
  const navigate = useNavigate();
  const [token] = useToken();
  const [user] = useUser();
  const [channelId] = useChannel();
  const [loading, setLoading] = useState(true);
  const [trackInfo, setTrackInfo] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [currentDeletedTracks, setCurrentDeletedTracks] = useState([]);

  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("createdAt");
  let [orderBy, setOrderBy] = useState("");

  const filteredTrackData = trackInfo
    .filter((item) => {
      return (
        !currentDeletedTracks.includes(item.id) &&
        (item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()))
      );
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

  // Call all Async functions ==================
  useEffect(() => {
    (async function () {
      await getTrackInfo();
    })();
  }, [getTrackInfo]);

  useEffect(() => {
    console.log(currentDeletedTracks);
  }, [currentDeletedTracks]);

  // handle Checkbox ==================
  const handleSelectIndividual = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setIsChecked([...isChecked, value]);
    } else {
      setIsChecked(isChecked.filter((itemVale) => itemVale !== value));
    }
  };

  const handleDeletedTracks = (deletedIds) => {
    setIsChecked([]);
    setCurrentDeletedTracks(deletedIds);
    var inputs = document.querySelectorAll(".trackCheckbox");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
    }
  };

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
                <TracksStyled>
                  <TrackOptionBar
                    checkedItems={isChecked}
                    currentlyDeleted={(deletedIds) =>
                      handleDeletedTracks(deletedIds)
                    }
                    query={query}
                    onQueryChange={(myQuery) => setQuery(myQuery)}
                    orderBy={orderBy}
                    onOrderByChange={(mySort) => setOrderBy(mySort)}
                    sortBy={sortBy}
                    onSortByChange={(mySort) => setSortBy(mySort)}
                  />

                  <table className="table track-table">
                    <thead>
                      <tr>
                        <th>
                          <input
                            style={{ visibility: "hidden" }}
                            type="checkbox"
                            value="all"
                          />
                        </th>
                        <th style={{ width: "50%" }}>Track</th>
                        <th>Comments</th>
                        <th>Users</th>
                        <th>Creation Date</th>
                        <th>Privacy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTrackData.map((trackItem, index) => (
                        <tr key={index}>
                          <td style={{ textAlign: "center" }}>
                            <input
                              type="checkbox"
                              className="trackCheckbox"
                              value={trackItem.id}
                              checked={trackItem.isChecked}
                              onChange={(e) => handleSelectIndividual(e)}
                            />
                          </td>
                          <td>
                            <div className="trackInfo">
                              <img
                                className="trackImg"
                                src={trackItem.previewImage}
                                alt="Track Preview"
                              />
                              <div className="trackText">
                                <h4>{trackItem.name}</h4>
                                <p>{trackItem.id}</p>
                                <p>{trackItem.description}</p>
                              </div>
                            </div>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {trackItem.comments?.commentArray?.length}
                          </td>
                          <td style={{ textAlign: "center" }}>0</td>
                          <td style={{ textAlign: "center" }}>
                            {trackItem.createdAt.slice(0, 10)}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <Stack
                              className="privacyRow"
                              direction="row"
                              spacing={2}
                            >
                              <div className="privacyStatus">
                                <p>{trackItem.privacy}</p>
                                {/* <p>{trackItem.status}</p> */}
                              </div>
                              <div className="optionMeta">
                                <TrackActionMenu trackId={trackItem.id} />
                              </div>
                            </Stack>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TracksStyled>
              )}
            </Container>
          </div>
        </Grid>
      </Container>
    </>
  );
}
