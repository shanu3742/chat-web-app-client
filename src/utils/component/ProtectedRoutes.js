import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserContext } from "../../context/userContext";

const ProtectedRoutes = ({ defaultPath = "/app/user/signin", children }) => {
  const {user} = getUserContext()
  if (!user) {
    return <Navigate to={defaultPath} replace />;
  } 

  return <>{!children ? <Outlet /> : children}</>;
};

export default ProtectedRoutes;