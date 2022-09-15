import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "./useUser";

export const PrivateRoutes = () => {
  const user = useUser();
  return user ? <Outlet /> : <Navigate to="/SignIn" />;
};
