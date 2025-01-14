//react import
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//material ui import 
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
//app file import
import { AuthLayout } from '../../layout';
import { onLogin } from '../../api';
import { ErrorToast,SuccessToast } from '../../utils';
import { loginValidationConfig , validate} from '../../config';
import { useMutation, useQueryClient } from '@tanstack/react-query';



const SignIn = () => {
// state define 

const [loginInfo,setLoginInfo] =useState({
  email:'',
  password:''
})
const queryClient = useQueryClient();
const [loginAttempt,setLoginAttempt]= useState(5);
const [showPassword, setShowPassword] = React.useState(false);

//context and third party hooks
const navigate = useNavigate();

// event handle
const handleClickShowPassword = () => setShowPassword((show) => !show);

const mutation = useMutation({
  mutationKey:['auth','email','login'],
  mutationFn:onLogin,
  onSuccess:(data) => {
    SuccessToast('Login Successful')
    queryClient.setQueryData(['auth','login'], data);
    navigate('/app/chat')
  },
  onError:(err) => {
    let {errorMessage,error}= err;
    let loginAttemptRemaning = error.response.headers['ratelimit-remaining'];
    setLoginAttempt(+loginAttemptRemaning)
    ErrorToast(errorMessage)
  }

})

const onUserLogin =  (e) => {
    e.preventDefault()
    const validation = validate(loginInfo, loginValidationConfig.loginInfoRules, loginValidationConfig.loginInfoMessages);
    if(!validation.isValid){
      ErrorToast(validation.errors);
      return
    }
    
    mutation.mutate(loginInfo)
    // do call mutated here 
    
    
  }

  
  const onInputUpdate = (event) => {
    const { name, value } = event.target;
   setLoginInfo((p) => {
    return {...p,[name]:value}
   })
  }

// page ui
  return (
    <AuthLayout pageTitle='Login here' pageDescription='Welcome back you’ve been missed!' descriptionClassName='mingle-font-normal font-bold'>
    <form className='py-4 px-4 relative' onSubmit={onUserLogin}  >
      {loginAttempt<5 && <h5 className='w-full flex justify-center absolute font-bold bottom-0 left-0 mingle-danger-text'> {loginAttempt} Login Attempt Remaning.</h5>}
      <div className='my-4'>
        <TextField id="standard-basic"  name="email"  autoComplete="email" value={loginInfo.email} label="Enter Email/user id" variant="outlined" size="small" fullWidth onChange={(e) => onInputUpdate(e)} />
      </div>
      <div className='my-4'>
      <FormControl variant="outlined" size="small" fullWidth>
      <InputLabel htmlFor="password-input">Enter Password</InputLabel>
      <OutlinedInput
        id="password-input"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={loginInfo.password}
        onChange={(e) => onInputUpdate(e)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Enter Password"
      />
    </FormControl>
    

      </div>
      <div className='flex justify-end my-4'>
        <Button variant="text" sx={{pt:0,pb:0}}>
          <span className='underline mingle-font-x-small'>Forgot your password?</span>
        </Button>
      </div>
      <div className='my-4 flex justify-center'>
        <LoadingButton loading={mutation.isPending} disabled={mutation.isPending} type='submit' variant="contained" sx={{background:'var(--mingle-primary-color)',width:'100%'}} startIcon={<LoginIcon />}>Log in</LoadingButton>
      </div>
    </form>
    </AuthLayout>
  )
}

export default SignIn