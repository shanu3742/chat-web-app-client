import ChatRoutes from './ChartRoutes';
import UserContext from './context/userContext';
import './App.scss';
import { Slide } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [isAnimating, setIsAnimating] = useState(false);


  useEffect(() => {
    if (location.pathname !== currentPath) {
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        setCurrentPath(location.pathname);
        setIsAnimating(false); 
      }, 1);

      return () => clearTimeout(timeout); 
    }
  }, [location.pathname, currentPath]);

  return (
    <UserContext>
      <div className="App">
        <ToastContainer />
        {isAnimating && (
          <Slide direction={'left'} in={!isAnimating} timeout={300}>
            <div className="outgoing-page">
              <ChatRoutes key={currentPath} />
            </div>
          </Slide>
        )}
        {!isAnimating && (
          <Slide direction={'left'} in={!isAnimating} timeout={300}>
            <div className="incoming-page">
              <ChatRoutes key={currentPath} />
            </div>
          </Slide>
        )}
      </div>
    </UserContext>
  );
}

export default App;
