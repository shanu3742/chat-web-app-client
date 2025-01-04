import ChatRoutes from './ChartRoutes';
import UserContext from './context/userContext';
import './App.scss'
import { Slide } from "@mui/material";
import { ToastContainer } from 'react-toastify';



function App() {

  return (
    <UserContext>
    <div className="App">
      <ToastContainer />
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <div>
          <ChatRoutes />
        </div>
      </Slide>
    </div>
    </UserContext>
   
  );
}

export default App;
