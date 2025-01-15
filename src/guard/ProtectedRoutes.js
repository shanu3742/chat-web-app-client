//react import
import React from "react";
//react router import 
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
//app file import

const ProtectedRoutes = ({ defaultPath = "/app/user/signin", children }) => {
  //context and third party hooks
  const {user} = useAuth();
  console.log(user)
  // page ui
  if (!user) {
    return <Navigate to={defaultPath} replace />;
  } 

  return <>{!children ? <Outlet /> : children}</>;
};

export default ProtectedRoutes;