import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  Box,
  Table,
  Divider,
} from "@mui/material";

import swal from "sweetalert";
import PrivetSideBar from "../../components/PrivetSideBar";
import PrivetHeader from "../../components/PrivetHeader";
import { ManageTrackStyled } from "./ManagementStyles";
import ManageCommentOptions from "./ManageCommentOptions";

const userInfo = JSON.parse(localStorage.getItem("userData")) || null;
const localUserToken = localStorage.token;
const baseURL = "https://api.finutss.com";

export default function ManageComments() {
  const [trackCommentReaction, setTrackCommentReaction] = useState([]);

  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("createdAt");
  let [orderBy, setOrderBy] = useState("");

  const filteredTrackData = trackCommentReaction
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

  useEffect(() => {
    console.log(trackCommentReaction);
  }, [trackCommentReaction]);

  useEffect(() => {
    (async function () {
      await getAllReaction();
    })();
  }, []);

  // TrackData ==================
  async function getTracks() {
    const reqData = await fetch(`${baseURL}/track/user/listing`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localUserToken,
      },
    });
    const resData = await reqData.json();
    return resData.data.tracksArray;
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
      let responseArr = (await Promise.all(commentsPromises)).map((obj) => obj);
      return responseArr;
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
      let responseArr = (await Promise.all(reactionPromises)).map((obj) => obj);
      setTrackCommentReaction(responseArr);
      return responseArr;
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
              <ManageTrackStyled>
                <ManageCommentOptions
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
                        <td>
                          <div className="trackInfo">
                            <img
                              className="trackImg"
                              src={trackItem.previewImage}
                              alt="Track Preview"
                            />
                            {/* <Divider
                              orientation="vertical"
                              variant="middle"
                              flexItem
                            /> */}
                            <div className="trackText">
                              <h4>{trackItem.name}</h4>
                              <p>{trackItem.commentArray.length}</p>
                              <p>{trackItem.reactionArray.length}</p>
                            </div>
                          </div>
                        </td>
                        <td style={{ textAlign: "center" }}>0</td>
                        <td style={{ textAlign: "center" }}>0</td>
                        <td style={{ textAlign: "center" }}>
                          {trackItem.createdAt.slice(0, 10)}
                        </td>
                        <td style={{ textAlign: "center" }}>0</td>
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
