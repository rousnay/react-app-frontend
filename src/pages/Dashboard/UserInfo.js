import React from "react";
import { Link } from "react-router-dom";
import { CardContent, Button } from "@mui/material";

export default function UserInfo(props) {
  const userData = props.loginInfo;
  return (
    <>
      <CardContent>
        <img
          style={{
            width: "100%",
            maxWidth: "350px",
          }}
          src={userData.profilePhoto}
          alt={userData.firstName}
        />

        <p>
          <span style={{ fontWeight: "bold" }}>Username: </span>
          {userData.username}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Email: </span>
          {userData.email}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Mobile: </span>
          {userData.countryCode}
          {userData.phoneNumber}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Address: </span>
          {userData.addressLine1}, {userData.addressLine2}, {userData.city},{" "}
          {userData.state} - {userData.zipCode}.
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Country: </span>
          {userData.country}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Account Type: </span>
          {userData.accountType}
        </p>
        <Link to="/Channel">
          {" "}
          <Button
            // fullWidth
            variant="contained"
            color="themegreen"
            className="channelSubmit"
          >
            Create Channel
          </Button>
        </Link>
      </CardContent>
    </>
  );
}
