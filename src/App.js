import ChatRoutes from './ChartRoutes';
import { useResizeContext } from './context/resizeContext';
import UserContext from './context/userContext';
import './App.scss'
import { Slide } from "@mui/material";



function App() {

  return (
    <UserContext>
    <div className="App">
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
