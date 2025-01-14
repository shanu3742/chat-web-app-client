//react import
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
//react router import 
import { Navigate, Outlet } from "react-router-dom";
//app file import

const ProtectedRoutes = ({ defaultPath = "/app/user/signin", children }) => {
  //context and third party hooks
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['auth','login']);

  console.log('userData',user)
  // page ui
  if (!user) {
    return <Navigate to={defaultPath} replace />;
  } 

  return <>{!children ? <Outlet /> : children}</>;
};

export default ProtectedRoutes;