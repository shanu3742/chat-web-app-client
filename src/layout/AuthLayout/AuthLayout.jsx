//react import
import React from "react";
//react router import 
import { NavLink } from "react-router-dom";
//file scss
import "./AuthLayout.scss";
//app file import
import { useResizeContext } from "../../context/resizeContext";
import LoginSvg from "../../Assets/auth.svg";

const AuthLayout = ({
  pageTitle = "title of Page",
  pageDescription = "page Description",
  descriptionClassName = "font-x-small",
  children,
}) => {
  //context and third party hooks
  const deviceDimension = useResizeContext();
  // page ui
  return (
    <div className="w-screen h-screen grid grid-cols-12">
      {deviceDimension.deviceType >= 2 && (
        <div className="col-span-6 flex items-center justify-center">
          <img alt="auth logo" src={LoginSvg} />
        </div>
      )}
      <div
        className={`bg-slate-100 ${
          deviceDimension.deviceType >= 2 ? "col-span-6" : "col-span-12"
        } pt-10 px-4`}
      >
        <div className="font-bold mingle-primary-text text-center mingle-font-large">
          {pageTitle}
        </div>
        <div className={`text-center ${descriptionClassName}`}>
          {pageDescription}
        </div>
        <div className="flex items-center justify-center my-4">
          <div>
            <NavLink
              to={"/app/user/signin"}
              className={({ isActive }) =>
                isActive ? "activeLink mx-2" : "inactiveLink mx-2"
              }
            >
              Login
            </NavLink>
          </div>
          <div>
            <NavLink
              to={"/app/user/signup"}
              className={({ isActive }) =>
                isActive ? "activeLink mx-2" : "inactiveLink mx-2"
              }
            >
              Register
            </NavLink>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
