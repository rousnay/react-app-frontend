import { useState } from "react";

// Manage token ==================
export const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    return localStorage.getItem("token");
  });

  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setTokenInternal(newToken);
  };
  //   console.log(token);
  return [token, setToken];
};

// Manage user info ==================
export const useUser = () => {
  const [user, setUserInternal] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  const setUser = (newUser) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setUserInternal(newUser);
  };
  //   console.log(user);
  return [user, setUser];
};
