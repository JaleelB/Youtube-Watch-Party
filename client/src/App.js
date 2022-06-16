import { PartyRoomPropsProvider } from './context/PartyRoomContext';
import {PartyRoom} from './webpages';

function App() {
  return (
    <PartyRoomPropsProvider>
      <div className="App">
        <PartyRoom/>
      </div>
    </PartyRoomPropsProvider>
  );
}

export default App;
