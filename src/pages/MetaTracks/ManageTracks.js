import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
// import map from "mapbox-gl";
import {
  Container,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

import swal from "sweetalert";
import { MetaInfoFormStyled } from "./MetaTracksStyles";
import PrivetSideBar from "../../components/PrivetSideBar";
import PrivetHeader from "../../components/PrivetHeader";
import TrackCreationNav from "./TrackCreationNav";

import Example from "./Tables/Example";
import ExampleRemote from "./Tables/ExampleRemote";
import EnhancedTable from "./Tables/EnhancedTable";
import CsTable from "./Tables/CsTable";

const userInfo = JSON.parse(localStorage.getItem("userData")) || null;
const localUserToken = localStorage.token;
const localCurrentTrackId = localStorage.currentTrackId;
const localCurrentTrackName = localStorage.currentTrackName;

const localGeoJSONLineData = JSON.parse(
  localStorage.getItem("geoJSONLineLocal")
);
const localLineCentralCoordinate = JSON.parse(
  localStorage.getItem("centralLineCoordinateLocal")
);
const GeoCoordinates = localGeoJSONLineData.features[0].geometry.coordinates;
const theMiddle = Math.floor(GeoCoordinates.length / 2);
const theMiddleCoordinates = GeoCoordinates[theMiddle];

// console.log(line);
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmludXRzcyIsImEiOiJja3BvdjJwdWYwcHQ3Mm9udXo4M3Nod3YzIn0.OMVZjImaogKth_ApsJTlNg";

export default function ManageTracks() {
  // ===============================
  // Async GET REQ
  // ===============================
  const [trackInfoData, setTrackInfoData] = useState({});
  const [trackingTags, setTrackingTags] = useState([]);
  const [pointFeatures, setPointFeatures] = useState([]);
  const [pointFeaturesCollection, setPointFeaturesCollection] = useState({});

  const baseURL = "https://api.finutss.com";
  const getTrackInfo = async () => {
    const response = await fetch(
      `${baseURL}/track/${localCurrentTrackId}/info`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localUserToken,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  };
  // useEffect(() => {
  //   getTrackInfo()
  //     .then((res) => {
  //       swal("Success", "Pin point lists loaded", "success", {
  //         buttons: false,
  //         timer: 1000,
  //       }).then((value) => {
  //         setTrackInfoData(res.data);
  //         setTrackingTags(res.data.tags.split(","));
  //         convertToGeoJSON(res.data.rawGpx);
  //         convertToPointFeatures(res.data.pinPoints.pinPointArray);
  //       });
  //     })
  //     .catch((e) => {
  //       swal("Oops!", e.message, "error", {
  //         buttons: true,
  //       }).then((value) => {});
  //     });
  // }, []);

  // ===============================
  // Convert GET RES to Map data
  // ===============================

  // ===============================
  // Data grid
  // ===============================
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

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
          <MetaInfoFormStyled style={{ flexDirection: "column" }}>
            {/* <Example /> */}
            {/* <ExampleRemote /> */}
            {/* <EnhancedTable /> */}
            <CsTable />

            {/* <div>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
              />
            </div> */}
            <div></div>
          </MetaInfoFormStyled>
        </Grid>
      </Container>
    </>
  );
}
