import axios from 'axios'
import { APP_CONFIG } from '../../config';

const authApi = axios.create({
    baseURL:`${APP_CONFIG.backend_uri}/chat/api/v1/user/`
})
const onLogin = async ({email,password}) => {
    try{
        let result = await  authApi.post('login',{
            email:email,
            password:password
        });
        let  data= result.data;
        return Promise.resolve(data)
    }catch(e){
        const errorMessage = e?.response?.data?.message || e?.message || 'An unexpected error occurred';
        return Promise.reject({errorMessage,error:e});
    }

}

const onGoogleLogin = async ({googleToken}) => {
    try{
        let result = await  authApi.get('googlelogin',{
            headers:{
                Authorization:`Bearer ${googleToken}`
            }
        });
        let  data= result.data;
        return Promise.resolve(data)
    }catch(e){
        const errorMessage = e?.response?.data?.message || e?.message || 'An unexpected error occurred';
        return Promise.reject({errorMessage,error:e});
    }

}

export {onLogin,onGoogleLogin}