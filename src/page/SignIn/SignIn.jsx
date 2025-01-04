import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../layout/AuthLayout/AuthLayout';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, IconButton, InputAdornment } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { onLogin } from '../../api/auth.api';
import { getUserContext } from '../../context/userContext';
import { ErrorToast, SuccessToast } from '../../utils/customToast/customToast';
import { loginValidationConfig , validate} from '../../config';



const SignIn = () => {
const {setUser} = getUserContext();
const navigate = useNavigate();
const [showPassword, setShowPassword] = React.useState(false);
const handleClickShowPassword = () => setShowPassword((show) => !show);

const [loginInfo,setLoginInfo] =useState({
  email:'',
  password:''
})

  const onUserLogin = async (e) => {
    e.preventDefault()  
    const validation = validate(loginInfo, loginValidationConfig.loginInfoRules, loginValidationConfig.loginInfoMessages);
    if(!validation.isValid){
      ErrorToast(validation.errors)
      return
    }
    try{
     let  result = await onLogin(loginInfo.email,loginInfo.password);
     SuccessToast('Login Successful')
     setUser(result);
     //navigate to chat page if all login successfull
     navigate('/app/chat')
    }catch(e){
     ErrorToast(e)
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
      <TextField
          type={showPassword ? 'text' : 'password'}
          id="standard-basic"
          value={loginInfo.password}
          label="Enter Password"
          variant="outlined"
          size="small"
          fullWidth
          onChange={(e) => onInputUpdate(e, 'password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={(e) => e.preventDefault()} // Prevents the button from focusing
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
       />
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