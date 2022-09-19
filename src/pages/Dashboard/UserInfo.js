import { Link } from "react-router-dom";
import { CardContent, Card, Typography, Button } from "@mui/material";

export default function UserInfo(props) {
  const userData = props.loginInfo;
  return (
    <>
      <CardContent>
        {userData.profilePhoto === "undefined" ? (
          <Card variant="outlined" sx={{ maxWidth: 270, padding: "50px" }}>
            <Typography sx={{ fontSize: 14 }} color="logored" gutterBottom>
              No profile photo exist
            </Typography>
          </Card>
        ) : (
          <img
            style={{
              width: "100%",
              maxWidth: "270px",
            }}
            src={userData.profilePhoto}
            alt={userData.firstName}
          />
        )}
        <p>
          <span style={{ fontWeight: "bold" }}>Name: </span>
          {userData.firstName} {userData.lastName}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Username: </span>
          {userData.username}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Email: </span>
          {userData.email}
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
        <p>
          <span style={{ fontWeight: "bold" }}>Channel ID: </span>
          {localStorage.channelId ? (
            localStorage.channelId
          ) : (
            <Link to="/Channel">
              <Button
                // fullWidth
                // variant="contained"
                color="themegreen"
                className="channelSubmit"
              >
                Create Channel
              </Button>
            </Link>
          )}
        </p>
      </CardContent>
    </>
  );
}
