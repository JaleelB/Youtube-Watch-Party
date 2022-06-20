import { ConversationPropsProvider } from './context/ConversationContext';
import {PartyRoom, Home} from './webpages';
import { Routes, Route } from 'react-router-dom';
import { ParticipantContextProvider } from './context/ParticipantContext';

function App() {
  return (
    <ParticipantContextProvider>
      <ConversationPropsProvider>
        <div className="App">
          <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path="/room/:id" exact element={<PartyRoom/>}/>
          </Routes>
        </div>
      </ConversationPropsProvider>
    </ParticipantContextProvider>
  );
}

export default App;
