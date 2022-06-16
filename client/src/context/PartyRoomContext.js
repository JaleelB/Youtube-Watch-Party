import {useContext, useState, createContext} from 'react';

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
        userMessage, setUserMessage
    };

    return (
        <PartyRoomPropsContext.Provider value={{partyRoomProps}}>
            {children}
        </PartyRoomPropsContext.Provider>
    );
}
