import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToken, useUser, useChannel } from "../../../hooks/useUserInfo";
import { RequestApi } from "../../../components/RequestApi";
import { Container, Grid, Typography } from "@mui/material";
import swal from "sweetalert";
import PrivetSideBar from "../../../components/PrivetSideBar";
import PrivetHeader from "../../../components/PrivetHeader";
import ManageTrackOptions from "./ManageTrackOptions";
import { ManageTrackStyled } from "./ManagementStyles";

export default function ManageTracks() {
  const navigate = useNavigate();
  const [token] = useToken();
  const [user] = useUser();
  const [channelId] = useChannel();
  const [loading, setLoading] = useState(true);
  const [trackComments, setTrackComments] = useState([]);
  const [checkedIndividual, setCheckedIndividual] = useState([]);

  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("createdAt");
  let [orderBy, setOrderBy] = useState("");

  const filteredTrackData = trackComments
    .filter((item) => {
      return (
        item.status !== "deleted" &&
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
    const trackInfoPromises = trackListAsyncData.map(async (trackItem) => {
      const [getTrackInfoData, loading] = await RequestApi(
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
    setTrackComments(trackWithInfoArray);
  }, [getTrackList, token]);

  // Call all Async functions ==================
  useEffect(() => {
    (async function () {
      await getTrackInfo();
    })();
  }, [getTrackInfo]);

  // handle Checkbox ==================
  const handleSelectIndividual = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckedIndividual([...checkedIndividual, value]);
    } else {
      setCheckedIndividual(
        checkedIndividual.filter((itemVale) => itemVale !== value)
      );
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
              <ManageTrackStyled>
                <ManageTrackOptions
                  checkedItems={checkedIndividual}
                  query={query}
                  onQueryChange={(myQuery) => setQuery(myQuery)}
                  orderBy={orderBy}
                  onOrderByChange={(mySort) => setOrderBy(mySort)}
                  sortBy={sortBy}
                  onSortByChange={(mySort) => setSortBy(mySort)}
                />

                {loading ? (
                  <Typography>Loading...</Typography>
                ) : (
                  <table className="table track-table">
                    <thead>
                      <tr>
                        <th>
                          <input
                            style={{ visibility: "hidden" }}
                            type="checkbox"
                            value="all"
                            // checked={checkedAll}
                            // onChange={(e) => handleSelectAll(e)}
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
                              value={trackItem.id}
                              checked={trackItem.checkedIndividual}
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
                                <p>{trackItem.status}</p>
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
                            {trackItem.privacy}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </ManageTrackStyled>
            </Container>
          </div>
        </Grid>
      </Container>
    </>
  );
}
