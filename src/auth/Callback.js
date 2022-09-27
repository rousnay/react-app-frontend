import { GOOGLE_CLIENT_ID } from "../utils/CONSTANTS";
import { Button } from "@mui/material";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";

export default function Callback() {
  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {/* <Button onClick={() => login()}>Sign in with Google 🚀 </Button>; */}
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />

        <Button
          onClick={() => {
            googleLogout();
          }}
        >
          Logout
        </Button>
      </GoogleOAuthProvider>
    </>
  );
}
