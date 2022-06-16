import {useContext, useState, createContext} from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

const PartyRoomPropsContext = createContext();

export function usePartyRoomPropsContext(){
    return useContext(PartyRoomPropsContext)
};

export function PartyRoomPropsProvider({children}){

    const [showChat, setShowChat] = useState(true);

    const [ messages, setMessages ] = useState([]);
    const [ userMessage, setUserMessage ] = useState('');

    const partyRoomProps = {
        showChat, setShowChat,
        messages, setMessages,
        userMessage, setUserMessage,
        socket
    };

    return (
        <PartyRoomPropsContext.Provider value={{partyRoomProps}}>
            {children}
        </PartyRoomPropsContext.Provider>
    );
}
