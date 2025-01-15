//react import
import React, { memo } from "react";
//react router import 
import { NavLink } from "react-router-dom";
import {signInWithPopup } from 'firebase/auth';
// matrial ui  import
import { Button, Divider } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
//file scss
import "./AuthLayout.scss";
//app file import
import { useResizeContext } from "../../context/resizeContext";
import LoginSvg from "../../Assets/auth.svg";
import { useFirebaseContext } from "../../context/firebaseContext";
import { ErrorToast } from "../../utils";
import useAuth from "../../hooks/useAuth";



const AuthLayout = ({
  pageTitle = "title of Page",
  pageDescription = "page Description",
  descriptionClassName = "font-x-small",
  children,
}) => {
  //context and third party hooks
  const deviceDimension = useResizeContext();
  const {auth,fbProvider} = useFirebaseContext();
  const {googleLogin,loginAttempt,} = useAuth()
 
   console.log(loginAttempt)
  const handleGoogleLogin =  () => {
      signInWithPopup(auth, fbProvider).then((googleLoginInfo) => {
        googleLogin({
          name:googleLoginInfo.user.displayName,
          email:googleLoginInfo.user.email,
          emailVerified:googleLoginInfo.user.emailVerified,
          googleId:googleLoginInfo.user.uid,
          photoURL:googleLoginInfo.user.photoURL
  
        })
      }).catch((err) => {
        ErrorToast(err)
      })
      
      
  };
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
        } pt-10 px-4 relative`}
      >
        {loginAttempt<5 && <h5 className='w-full flex justify-center absolute font-bold top-0 left-0 mingle-danger-text'> {loginAttempt} Login Attempt Remaning.</h5>}
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
        <Divider>OR</Divider>
        <div class="flex justify-center my-4">
          <Button variant="outlined" startIcon={<GoogleIcon />} onClick={handleGoogleLogin}>
          Continue With Google
        </Button>
        </div>


      </div>
    </div>
  );
};

export default memo(AuthLayout);
