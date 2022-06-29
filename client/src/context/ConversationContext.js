import {useContext, useState, createContext, useRef, useEffect, useCallback} from 'react';
import { ParticipantContext } from './ParticipantContext';
import { useSocketContext } from './SocketContext';


const ConversationPropsContext = createContext();

export function useConversationContext(){
    return useContext(ConversationPropsContext)
};

export function ConversationPropsProvider({children}){

    const socket = useSocketContext();

    const [showChat, setShowChat] = useState(true);

    const [ chat, setChat ] = useState([]);
    const [ userMessage, setUserMessage ] = useState('');

    const {name, room} = useContext(ParticipantContext);

    const inputRef = useRef(null);
    
    const getUserInput = (e) => setUserMessage(e.target.value);

    const addMessageToChat = (messageData) => {   

        if(messageData){
          //displays message for all users
          setChat([
            ...chat, messageData
          ])
        }

    };

    const emitMessage = () => {
    
        if(userMessage !== ''){

            const messageData = {
                sender: name,
                message: userMessage
            }

            //sends message to server
            socket.emit('chat_message', messageData);
        }

        setUserMessage('');
        inputRef.current.value = "";
        
    };


    useEffect(()=>{

        if(!socket) return;

        socket.on('system_message', (message)=>{
            addMessageToChat(message)
        })

        socket.on("receive_chat_message", (data) =>{
            addMessageToChat(data)
        })
        
        //turns off each event listener after it has been fired
        //to prevent multiple event listeners from being active
        return () => {
            socket.off('recieve_message');
            socket.off('system_message');
            socket.off('user_connected');
        }

    },[socket, addMessageToChat])



    const conversationProps = {
        showChat, setShowChat,
        chat, setChat,
        userMessage, setUserMessage,
        emitMessage, addMessageToChat,
         inputRef,
        getUserInput
        //socket
    };

    return (
        <ConversationPropsContext.Provider value={{conversationProps}}>
            {children}
        </ConversationPropsContext.Provider>
    );
}
