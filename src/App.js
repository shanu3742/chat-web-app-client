// import react toastify
import { ToastContainer } from 'react-toastify';
//import file scss
import './App.scss';
////app file import 
import ChatRoutes from './ChartRoutes';
import { UserContext } from './context';
import { PageSliderLayout } from './layout';

function App() {
  return (
    <UserContext>
      <div className="App">
        <ToastContainer />
        <PageSliderLayout>
          <ChatRoutes  />
        </PageSliderLayout>
      </div>
    </UserContext>
  );
}

export default App;
