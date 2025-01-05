//react import
import React from "react";
//react router import 
import { Navigate, Outlet } from "react-router-dom";
//app file import
import { getUserContext } from "../context/userContext";

const ProtectedRoutes = ({ defaultPath = "/app/user/signin", children }) => {
  //context and third party hooks
  const {user} = getUserContext()
  // page ui
  if (!user) {
    return <Navigate to={defaultPath} replace />;
  } 

  return <>{!children ? <Outlet /> : children}</>;
};

export default ProtectedRoutes;