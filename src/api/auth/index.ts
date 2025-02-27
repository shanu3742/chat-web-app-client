import axios from "axios";
import  APP_CONFIG  from "@config/app.config";
import { ServerErrorInterface } from "src/shared/interfaces/commonInterface";

const authApi = axios.create({
  baseURL: `${APP_CONFIG.backend_uri}/chat/api/v1/user/`,
  withCredentials: true
});

const onRegister = async ({ email, password ,userId,otp}:{email:string, password:string,userId:string,otp:string}) => {
  try {
    const result = await authApi.post("signup", {
      email: email,
      password: password,
      userId,
      otp
    });
    const data = result.data;
    return Promise.resolve(data);
  } catch (e) {
    let errorMessage='An unexpected error occurred';
    if(axios.isAxiosError(e)){
       errorMessage  = e?.response?.data?.message || e?.message ;
    }     
    return Promise.reject<ServerErrorInterface>({errorMessage,error:e});
  }
};

const onLogin = async ({ email, password }:{email:string, password:string}) => {
  try {
    const result = await authApi.post("login", {
      email: email,
      password: password,
    });
    const data = result.data;
    return Promise.resolve(data);
  } catch (e) {
    let errorMessage='An unexpected error occurred';
    if(axios.isAxiosError(e)){
       errorMessage  = e?.response?.data?.message || e?.message ;
    }     
    return Promise.reject<ServerErrorInterface>({errorMessage,error:e});
  }
};

const onGoogleLogin = async ({ googleToken }:{googleToken:string}) => {
  try {
    const result = await authApi.get("googlelogin", {
      headers: {
        Authorization: `Bearer ${googleToken}`,
      },
    });
    const data = result.data;
    return Promise.resolve(data);
  } catch (e) {
    let errorMessage='An unexpected error occurred';
    if(axios.isAxiosError(e)){
       errorMessage  = e?.response?.data?.message || e?.message ;
    }     
    return Promise.reject<ServerErrorInterface>({errorMessage,error:e});
  }
};
const onResetPassword = async ({ email, password, otp }:{email:string, password:string, otp:string}) => {
  try {
    const result = await authApi.post("reset-password", {
      email: email,
      password: password,
      otp: otp,
    });
    const data = result.data;
    return Promise.resolve(data);
  } catch (e) {
    let errorMessage='An unexpected error occurred';
    if(axios.isAxiosError(e)){
       errorMessage  = e?.response?.data?.message || e?.message ;
    }     
    return Promise.reject<ServerErrorInterface>({errorMessage,error:e});
  }
};
const onAutoLogin = async () => {
  try {
    const result = await authApi.get("auto-login");
    const data = result.data;
    return Promise.resolve(data);
  } catch (e) {
    let errorMessage='An unexpected error occurred';
    if(axios.isAxiosError(e)){
       errorMessage  = e?.response?.data?.message || e?.message ;
    }     
    return Promise.reject<ServerErrorInterface>({errorMessage,error:e});
  }
};
const onLogOut = async () => {
  try {
    const result = await authApi.get("logout");
    const data = result.data;
    return Promise.resolve(data);
  } catch (e) {
    let errorMessage='An unexpected error occurred';
    if(axios.isAxiosError(e)){
       errorMessage  = e?.response?.data?.message || e?.message ;
    }     
    return Promise.reject<ServerErrorInterface>({errorMessage,error:e});
  }
};
// /auto-login
// logout
export { onLogin,onLogOut, onGoogleLogin, onResetPassword,onRegister,onAutoLogin };
