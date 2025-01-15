import { useMutation ,useQueryClient} from "@tanstack/react-query";
import  {onGoogleLogin, onLogin} from "../api"
import  { SuccessToast, ErrorToast } from "../utils";
import  {useNavigate } from "react-router-dom";



const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleSuccess = (data) => {
    SuccessToast('Login Successful');
    queryClient.setQueryData(['auth', 'login'], data);
    navigate('/app/chat');
  };

  const handleError = (err) => {
    let {errorMessage,error}= err;
    let loginAttemptRemaning = error.response.headers['ratelimit-remaining'];
    queryClient.setQueryData(['login', 'loginattempt'], loginAttemptRemaning);
    ErrorToast(errorMessage)
  }
    
  const emailLoginMutation = useMutation({
        mutationKey:['auth','email','login'],
        mutationFn:onLogin,
        onSuccess:handleSuccess,
        onError:handleError  
      })

  const googleLoginMutation = useMutation({
        mutationKey:['auth','google','login'],
        mutationFn:onGoogleLogin,
        onSuccess:handleSuccess,
        onError:handleError
      });

  const logout = () => {
        queryClient.removeQueries(['auth', 'login']);
        SuccessToast('You have been logged out successfully');
        navigate('/app/user/signin'); 
    };
 

 return  {
    login:emailLoginMutation.mutate,
    googleLogin:googleLoginMutation.mutate,
    logout:logout,
    loginAttempt:queryClient.getQueryData(['login', 'loginattempt']),
    isLoginPending:emailLoginMutation.isPending||googleLoginMutation.isPending,
    user:queryClient.getQueryData(['auth','login'])}
}
export default useAuth;