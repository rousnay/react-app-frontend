import React, { useState } from "react";
// import Load from "./Load";
import FileInput from "./Restore";
// import WithMaterialUI from "./Revert";
// import Thumbprv from "./Test";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
// User data
// const userData = JSON.parse(localStorage.getItem("userData"));
// const userToken = userData.token;
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYWY0ZWJiLTk1NWEtNDY1ZS05YzJjLTFiYWFlYzdjNjkzNSIsImVtYWlsIjoibXIucm91c25heUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6InVzZXIiLCJkZXZpY2VUeXBlIjoiaW9zIiwiZGV2aWNlVG9rZW4iOiJzdHJpbmciLCJpYXQiOjE2NTkzNjY4ODYsImV4cCI6MTY1OTM2Njk0Nn0.mAJadfoBmtF_rvFf4u7D_omcAAw6gz2n9Mkp-WmCtYA";

console.log(userToken);

export default function Channel() {
  return (
    <>
      {/* <Thumbprv /> */}
      {/* <WithMaterialUI /> */}
      <FileInput />
      {/* <Load /> */}
    </>
  );
}
