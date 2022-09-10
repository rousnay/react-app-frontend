import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import axios from "axios";
// import { Container } from "react-bootstrap";
import { ManageTrackStyled } from "../MetaTracksStyles";
import CsTableOptions from "./CsTableOptions";

import {
  Container,
  Table,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

function CsTable() {
  //   const history = useHistory();
  const [trackData, setUserdata] = useState([]);
  const [isChecked, setisChecked] = useState([]);
  const [delmsg, setDelmsg] = useState("");

  const baseURL = "https://api.finutss.com";
  const localUserToken = localStorage.token;

  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("createdAt");
  let [orderBy, setOrderBy] = useState("");

  const filteredTrackData = trackData
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
    const getUser = async () => {
      const reqData = await fetch(`${baseURL}/track/user/listing`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localUserToken,
        },
      });
      const resData = await reqData.json();
      console.log(resData.data.tracksArray);
      setUserdata(resData.data.tracksArray);
    };
    getUser();
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

  const alldelete = async () => {
    //console.log(isChecked);
    if (isChecked.length !== 0) {
      const responce = await axios.post(
        `http://localhost/devopsdeveloper/user/deletecheckboxuser`,
        JSON.stringify(isChecked)
      );
      setDelmsg(responce.data.msg);
      setTimeout(() => {
        // history.push("/user");
        console.log("timeout");
      }, 2000);
    } else {
      alert("please Select at least one check box !");
    }
  };

  return (
    <>
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

          <CsTableOptions
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
                  <td>
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
                  <td>0</td>
                  <td>0</td>
                  <td>{trackItem.createdAt.slice(0, 10)}</td>
                  <td>0</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ManageTrackStyled>
      </Container>
    </>
  );
}

export default CsTable;
