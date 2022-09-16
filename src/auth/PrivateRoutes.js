import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useToken } from "./userAuth";

export const PrivateRoutes = () => {
  const [token] = useToken();

  const getPayloadFromToken = (token) => {
    const encodedPayload = token.split(".")[1];
    return JSON.parse(atob(encodedPayload));
  };

  const [user, setUser] = useState(() => {
    if (!token) return null;
    return getPayloadFromToken(token);
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getPayloadFromToken(token));
    }
  }, [token]);

  return user ? <Outlet /> : <Navigate to="/SignIn" />;
};
