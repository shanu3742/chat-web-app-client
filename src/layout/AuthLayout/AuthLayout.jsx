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
import { useMutation, useQueryClient } from "@tanstack/react-query";



const AuthLayout = ({
  pageTitle = "title of Page",
  pageDescription = "page Description",
  descriptionClassName = "font-x-small",
  children,
}) => {
  //context and third party hooks
  const deviceDimension = useResizeContext();
  const {auth,fbProvider} = useFirebaseContext();
  const queryClient = useQueryClient();
 
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey:['auth','google','login'],
    mutationFn:onGoogleLogin,
    onSuccess:(data) => {
      SuccessToast('Login Successful')
      //navigate to chat page if all login successfull
      console.log('google data',data);
      queryClient.setQueryData(['auth','login'], data);
      navigate('/app/chat')
    },
    onError:(error) => {
      let {errorMessage}= error;
      console.log(error)
      ErrorToast(errorMessage)
    }
  });
   
  const handleGoogleLogin =  () => {
      signInWithPopup(auth, fbProvider).then((googleLoginInfo) => {
        mutation.mutate({
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
