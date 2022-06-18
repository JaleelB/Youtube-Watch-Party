import { ConversationPropsProvider } from './context/ConversationContext';
import {PartyRoom, Home} from './webpages';

function App() {
  return (
    <ConversationPropsProvider>
      <div className="App">
        {/* <PartyRoom/> */}
        <Home/>
      </div>
    </ConversationPropsProvider>
  );
}

export default App;
