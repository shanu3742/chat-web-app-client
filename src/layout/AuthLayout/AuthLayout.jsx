//react import
import React, { memo } from "react";
//react router import 
import { NavLink, useNavigate } from "react-router-dom";
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
import { onGoogleLogin } from "../../api";
import { ErrorToast, SuccessToast } from "../../utils";
import { getUserContext } from "../../context";


const AuthLayout = ({
  pageTitle = "title of Page",
  pageDescription = "page Description",
  descriptionClassName = "font-x-small",
  children,
}) => {
  //context and third party hooks
  const deviceDimension = useResizeContext();
  const {auth,fbProvider} = useFirebaseContext()
  const {updateUser} = getUserContext();
  const navigate = useNavigate();
   
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, fbProvider);
      console.log('User Info:', result.user);
      let userData = await onGoogleLogin({
        name:result.user.displayName,
        email:result.user.email,
        emailVerified:result.user.emailVerified,
        googleId:result.user.uid,
        photoURL:result.user.photoURL

      })

      console.log('google created user in database',userData)
      SuccessToast('Login Successful')
      updateUser(result);
      //navigate to chat page if all login successfull
      navigate('/app/chat')

    } catch (error) {
      console.error('Error during login:', error);
      ErrorToast(error)
    }
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
