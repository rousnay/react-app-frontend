import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RequestApi } from "../components/RequestApi";
import { useToken, useUser, useChannel } from "../hooks/useUserInfo";
import getQueryParams from "../utils/getQueryParams";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const { code: oauthToken } = getQueryParams();
  const [, setToken] = useToken();
  const [, setUser] = useUser();
  const [, setChannelId] = useChannel();

  useEffect(() => {
    if (oauthToken) {
      (async function () {
        const [response] = await RequestApi(
          "GET",
          `user/auth/google/redirect/?code=${oauthToken}`
        );
        if (response.message === "Success") {
          console.log(response);
          setUser(response.data);
          setToken(response.data.token);
          setChannelId(response.data?.channelId);
          navigate("/Dashboard");
        }
      })();
    }
  });

  // const handleLogin = async (queryParams) => {
  //   const [response] = await RequestApi(
  //     "GET",
  //     `/user/auth/google/redirect/?code=${oauthToken}`
  //   );
  //   if (response.message === "Success") {
  //     console.log(response);
  //     setUser(response.data);
  //     setToken(response.data.token);
  //   }
  // };

  // useEffect(() => {
  //   if (oauthToken) {
  //       handleLogin(oauthToken);
  //   }
  // });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      Loading your profile...
    </div>
  );
}
