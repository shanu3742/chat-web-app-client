import ChatRoutes from './ChartRoutes';
import UserContext from './context/userContext';
import './App.scss'
import { Slide } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';



function App() {
  const location = useLocation();
  const [isSlide,setSlide] = useState(false)

  useEffect(() => {
    setSlide((p) => !p)
  },[location.pathname])

  useEffect(() => {
    if(!isSlide){
     setTimeout(() => {
      setSlide(true)
     },500)
    }
  },[isSlide])

  return (
    <UserContext>
    <div className="App">
      <ToastContainer />
      <Slide direction={isSlide?"left":'right'} in={isSlide} >
        <div>
          <ChatRoutes />
        </div>
      </Slide>
    </div>
    </UserContext>
   
  );
}

export default App;
