import React from 'react'
import {  Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoutes from './utils/component/ProtectedRoutes';
import SignIn from './page/SignIn/SignIn';
import SignUp from './page/SignUp/SignUp';

const ChatRoutes = () => {
  const location = useLocation()
  return (
     
  <Routes location={location}>
     <Route path="/" element={<Navigate to="/app/chat" replace />} />
     <Route element={<ProtectedRoutes defaultPath={"/app/user/signin"} />}>
       <Route path="/app/chat" element={<h1>app chat page</h1>} />
     </Route>
     <Route path="/app/user/signin" element={ <SignIn />} />
     <Route path="/app/user/signup" element={<SignUp />} />
   </Routes>
 
   
  )
}

export default ChatRoutes