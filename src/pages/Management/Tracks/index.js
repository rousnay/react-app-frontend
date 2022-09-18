import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../utils/CONSTANTS";
import { useToken, useUser } from "../../../auth/userAuth";
// import axios from "axios";
import { Container, Grid } from "@mui/material";
import swal from "sweetalert";
import PrivetSideBar from "../../../components/PrivetSideBar";
import PrivetHeader from "../../../components/PrivetHeader";
import ManageTrackOptions from "./ManageTrackOptions";
import { ManageTrackStyled } from "./ManagementStyles";

export default function ManageTracks() {
  const navigate = useNavigate();
  const [token] = useToken();
  const [user] = useUser();

  const [trackComments, setTrackComments] = useState([]);
  const [isChecked, setisChecked] = useState([]);
  // const [delmsg, setDelmsg] = useState("");

  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("createdAt");
  let [orderBy, setOrderBy] = useState("");

  const filteredTrackData = trackComments
    .filter((item) => {
      return (
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
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
      return resData.data.tracksArray;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // CommentsData ==================
  async function getTrackComments() {
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
      setTrackComments(trackWithCommentsArray);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  useEffect(() => {
    (async function () {
      await getTrackComments();
    })();
  }, []);

  const handlecheckbox = (e) => {
    const { value, checked } = e.target;
    console.log(value);
    if (checked) {
      setisChecked([...isChecked, value]);
    } else {
      setisChecked(isChecked.filter((e) => e !== value));
    }
  };

  useEffect(() => {
    if (!user.channelId && !localStorage.channelId) {
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

  // delete Track ==================
  // const alldelete = async () => {
  //   //console.log(isChecked);
  //   if (isChecked.length !== 0) {
  //     const responce = await axios.post(
  //       `fetch(`${API_URL}/tracks`,
  //       JSON.stringify(isChecked)
  //     );
  //     setDelmsg(responce.data.msg);
  //     setTimeout(() => {
  //       // history.push("/user");
  //       console.log("timeout");
  //     }, 2000);
  //   } else {
  //     alert("please Select at least one check box !");
  //   }
  // };

  // useEffect(() => {
  //   console.log(trackComments);
  // }, [trackComments]);

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
              <ManageTrackStyled>
                {/* <h2>My Tracks</h2> */}

                {/* <h5 className="text-danger">{delmsg} </h5> */}

                {/* <Button className="btn btn-danger" onClick={alldelete}>
              Delete
            </Button> */}

                <ManageTrackOptions
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
                        <input type="checkbox" />
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
                            checked={trackItem.isChecked}
                            onChange={(e) => handlecheckbox(e)}
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
                              <p>{trackItem.description}</p>
                            </div>
                          </div>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {trackItem.commentArray?.length}
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
              </ManageTrackStyled>
            </Container>
          </div>
        </Grid>
      </Container>
    </>
  );
}
