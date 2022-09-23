import { useState, useRef } from "react";
import { GOOGLE_CLIENT_ID } from "../utils/CONSTANTS";
import jwt_deocde from "jwt-decode";
import { useScript } from "../hooks/useScript";

export default function KakaoCallback() {
  const googleButtonRef = useRef();
  const [user, setUser] = useState(false);
  const onGoogleSignIn = (user) => {
    let userCred = user.credential;
    let payload = jwt_deocde(userCred);
    console.log(payload);
    setUser(payload);
  };
  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: onGoogleSignIn,
      auto_select: false,
    });

    window.google.accounts.id.renderButton(googleButtonRef.current, {
      size: "medium",
    });

    // window.google.accounts.id.prompt();
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {!user && <div ref={googleButtonRef}></div>}
      {user && (
        <div>
          <h1>{user.name}</h1>
          <img src={user.picture} alt="profile" />
          <p>{user.email}</p>

          <button
            onClick={() => {
              setUser(false);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
