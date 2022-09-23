import { Link } from "react-router-dom";
import { CardContent, Card, Typography, Button } from "@mui/material";

export default function UserInfo(props) {
  const userInfo = props.userInfo;
  const channelId = props.channelId;

  return (
    <>
      <CardContent>
        {userInfo.profilePhoto === "undefined" ? (
          <Card variant="outlined" sx={{ maxWidth: 270, padding: "50px" }}>
            <Typography sx={{ fontSize: 14 }} color="logoRed" gutterBottom>
              No profile photo exist
            </Typography>
          </Card>
        ) : (
          <img
            style={{
              width: "100%",
              maxWidth: "270px",
            }}
            src={userInfo.profilePhoto}
            alt={userInfo.firstName}
          />
        )}
        <p>
          <span style={{ fontWeight: "bold" }}>Name: </span>
          {userInfo.firstName} {userInfo.lastName}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Username: </span>
          {userInfo.username}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Email: </span>
          {userInfo.email}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Address: </span>
          {userInfo.addressLine1}, {userInfo.addressLine2}, {userInfo.city},{" "}
          {userInfo.state} - {userInfo.zipCode}.
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Country: </span>
          {userInfo.country}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Account Type: </span>
          {userInfo.accountType}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Channel ID: </span>
          {channelId ? (
            channelId
          ) : (
            <Link to="/Channel">
              <Button color="themeGreen" className="channelSubmit">
                Create Channel
              </Button>
            </Link>
          )}
        </p>
      </CardContent>
    </>
  );
}
