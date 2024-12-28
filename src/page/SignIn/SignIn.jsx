import React, { useState } from 'react';
import AuthLayout from '../../layout/AuthLayout/AuthLayout';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import {  toast,Bounce } from 'react-toastify';
import LoginIcon from '@mui/icons-material/Login';
import { onLogin } from '../../api/auth.api';

const SignIn = () => {
const [loginInfo,setLoginInfo] =useState({
  email:'',
  password:''
})
  const onUserLogin = async (e) => {
    e.preventDefault()
    try{
     let  result = await onLogin(loginInfo.email,loginInfo.password);
     console.log(result)
    }catch(e){
      console.log(e)
      toast.error(e, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
  }
  const onInputUpdate = (event,type) => {
   setLoginInfo((p) => {
    return {...p,[type]:event.target.value}
   })
  }
 

  return (
    <AuthLayout pageTitle='Login here' pageDescription='Welcome back you’ve been missed!' descriptionClassName='mingle-font-normal font-bold'>
    <form className='py-4 px-4' onSubmit={onUserLogin}  >
      <div className='my-4'>
        <TextField id="standard-basic" value={loginInfo.email} label="Enter Email/user id" variant="outlined" size="small" fullWidth onChange={(e) => onInputUpdate(e,'email')} />
      </div>
      <div className='my-4'>
        <TextField id="standard-basic" value={loginInfo.password} label="Enter Password" variant="outlined" size="small"  fullWidth onChange={(e) => onInputUpdate(e,'password')}/>
      </div>
      <div className='flex justify-end my-4'>
        <Button variant="text" sx={{pt:0,pb:0}}>
          <span className='underline mingle-font-x-small'>Forgot your password?</span>
        </Button>
      </div>
      <div className='my-4 flex justify-center'>
        <Button type='submit' variant="contained" sx={{background:'var(--mingle-primary-color)',width:'100%'}} startIcon={<LoginIcon />}>Log in</Button>
      </div>
    </form>
    </AuthLayout>
  )
}

export default SignIn