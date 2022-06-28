import { ConversationPropsProvider } from './context/ConversationContext';
import {PartyRoom, Home} from './webpages';
import { Routes, Route } from 'react-router-dom';
import { ParticipantContextProvider } from './context/ParticipantContext';
import { SocketContextProvider } from './context/SocketContext';
import {VideoContextProvider} from './context/VideoContext';
import useSessionStorage from './hooks/useSessionStorage';

function App() {

  const [id, setId] = useSessionStorage('roomId');
  // const idRoom = sessionStorage.getItem('youtube-watch-party-roomId');

  //set id a different way. in party room it causes host to be added to a party multiple times

  return (
    <SocketContextProvider id={id}>
      <ParticipantContextProvider>
        <ConversationPropsProvider>
          <VideoContextProvider>
              <div className="App">
                <Routes> 
                  <Route path='/' exact element={<Home setId={setId} id={id} />}/>
                  <Route path="/room/:id" exact element={<PartyRoom/>}/>
                </Routes>
              </div>
          </VideoContextProvider>
        </ConversationPropsProvider>
      </ParticipantContextProvider>
    </SocketContextProvider>
  );

}

export default App;
