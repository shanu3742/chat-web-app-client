import axios from 'axios'
import APP_CONFIG from '../config/app.config'

const onLogin = async (email,password) => {
    try{
        let result = await  axios.post(`${APP_CONFIG.backend_uri}/chat/api/v1/user/login`,{
            email:email,
            password:password
        });
        let  data= result.data;
        return data
    }catch(e){
        return e?.response?.data?.message??e?.message;
    }

}
export {onLogin}