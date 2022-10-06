import { useEffect } from "react";
import { useQueryParams } from "../hooks/useQueryParams";
import { RequestApi } from "../components/RequestApi";
import { useToken, useUser } from "../hooks/useUserInfo";

export default function GoogleCallback() {
  const queryParams = useQueryParams();
  const [user, setUser] = useUser();
  const [, setToken] = useToken();

  useEffect(() => {
    if (queryParams) {
      handleSubmit(queryParams);
    }
  });

  const handleSubmit = async (queryParams) => {
    const [response] = await RequestApi(
      "GET",
      `/user/auth/google/redirect/?code=${queryParams.code}&scope=${queryParams.scope}`
    );
    if (response.message === "Success") {
      console.log(response);
      setUser(response.data);
      setToken(response.data.token);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {!user && <div>Login</div>}
      {user && (
        <div>
          <h1>{user.firstName}</h1>
          <img width="300" src={user.profilePhoto} alt="profile" />
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
