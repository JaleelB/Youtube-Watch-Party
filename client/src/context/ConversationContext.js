import {useContext, useState, createContext} from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

const ConversationPropsContext = createContext();

export function useConversationContext(){
    return useContext(ConversationPropsContext)
};

export function ConversationPropsProvider({children}){

    const [showChat, setShowChat] = useState(true);

    const [ messages, setMessages ] = useState([]);
    const [ userMessage, setUserMessage ] = useState('');


    const conversationProps = {
        showChat, setShowChat,
        messages, setMessages,
        userMessage, setUserMessage,
        socket
    };

    return (
        <ConversationPropsContext.Provider value={{conversationProps}}>
            {children}
        </ConversationPropsContext.Provider>
    );
}
