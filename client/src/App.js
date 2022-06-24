import { ConversationPropsProvider } from './context/ConversationContext';
import {PartyRoom, Home} from './webpages';
import { Routes, Route } from 'react-router-dom';
import { ParticipantContextProvider } from './context/ParticipantContext';
import { SocketContextProvider } from './context/SocketContext';
import useSessionStorage from './hooks/useSessionStorage';

function App() {

  const [id, setId] = useSessionStorage('roomId');
  // const idRoom = sessionStorage.getItem('youtube-watch-party-roomId');

  return (
    <SocketContextProvider id={id}>
      <ParticipantContextProvider>
        <ConversationPropsProvider>
          <div className="App">
            <Routes> 
              <Route path='/' exact element={<Home setId={setId}  />}/>
              <Route path="/room/:id" exact element={<PartyRoom/>}/>
            </Routes>
          </div>
        </ConversationPropsProvider>
      </ParticipantContextProvider>
    </SocketContextProvider>
  );

}

export default App;
