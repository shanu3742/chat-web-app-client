import UserContext from './context/userContext';
import Chat from './page/Chat/Chat';

function App() {
  
  return (
    <UserContext>
    <div className="App">
      <h1>hello shanu </h1>
      <Chat />
    </div>
    </UserContext>
   
  );
}

export default App;
