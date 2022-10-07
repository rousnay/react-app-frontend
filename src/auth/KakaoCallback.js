import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RequestApi } from "../components/RequestApi";
import { useToken, useUser } from "../hooks/useUserInfo";
import getQueryParams from "../utils/getQueryParams";

export default function KakaoCallback() {
  const navigate = useNavigate();
  const { code: oauthToken } = getQueryParams();
  const [, setUser] = useUser();
  const [, setToken] = useToken();

  useEffect(() => {
    if (oauthToken) {
      (async function () {
        const [response] = await RequestApi(
          "GET",
          `user/auth/kakao/redirect/?code=${oauthToken}`
        );
        if (response.message === "Success") {
          console.log(response);
          setUser(response.data);
          setToken(response.data.token);
          navigate("/Dashboard");
        }
      })();
    }
  });

  // const handleLogin = async (queryParams) => {
  //   const [response] = await RequestApi(
  //     "GET",
  //     `/user/auth/kakao/redirect/?code=${oauthToken}`
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
