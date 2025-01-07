import axios from 'axios'
import { APP_CONFIG } from '../config';

const onLogin = async (email,password) => {
    try{
        let result = await  axios.post(`${APP_CONFIG.backend_uri}/chat/api/v1/user/login`,{
            email:email,
            password:password
        });
        let  data= result.data;
        return Promise.resolve(data)
    }catch(e){
        const errorMessage = e?.response?.data?.message || e?.message || 'An unexpected error occurred';
        return Promise.reject(errorMessage);
    }

}

const onGoogleLogin = async ({email,name,googleId,emailVerified,photoURL}) => {
    try{
        let result = await  axios.post(`${APP_CONFIG.backend_uri}/chat/api/v1/user/googlelogin`,{
            email,
            name,
            googleId,
            emailVerified,
            photoURL
        });
        let  data= result.data;
        return Promise.resolve(data)
    }catch(e){
        const errorMessage = e?.response?.data?.message || e?.message || 'An unexpected error occurred';
        return Promise.reject(errorMessage);
    }

}

export {onLogin,onGoogleLogin}