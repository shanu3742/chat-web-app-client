import ChartRoutes from './ChartRoutes';
import { useResizeContext } from './context/resizeContext';
import UserContext from './context/userContext';


function App() {
const size=   useResizeContext();
console.log('size',size)
  return (
    <UserContext>
    <div className="App">
      <ChartRoutes />
    </div>
    </UserContext>
   
  );
}

export default App;
