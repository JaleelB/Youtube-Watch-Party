import { Box, useFormControl } from '@mui/material';
import React, {useState, useCallback, useContext, useEffect} from 'react';
import {CommentField, TabSwitch} from '../../components';
import { useConversationContext } from '../../context/ConversationContext';
import { ParticipantContext } from '../../context/ParticipantContext';
import './MessageBody.scss';

const MessageBody = () => {

  const props = useConversationContext();
  const { 
      showChat, messages, setMessages, socket
   } = props.conversationProps;

  const {name} = useContext(ParticipantContext);

  //scrolls into view when latest message is sent
  const setLastMessageRef = useCallback( node => {
    if(node) node.scrollIntoView({ smooth: true});
  }, [])

  const addUserMessage = async (messageData) => {   
    if(messageData){
      //displays message for all users
      setMessages([
        ...messages, messageData
      ])
    }
  };

  const addSystemMessage = async (message) => {   
    if(message){
      //displays message for all users
      setMessages([
        ...messages, message
      ])
    }
  };

  // useEffect(()=>{
    socket.on("receive_chat_message", (data) =>{
      addUserMessage(data)
    })

    socket.on("user_connected", (name) =>{
      addSystemMessage(`${name} has joined the party`)
    })
  // },[socket])
  
  

  return (
    <Box id='message-body'>
      <Box className="tab-details-wrapper">
          <h2 className="tab-title">{showChat ? 'Chat' : 'Participants'}</h2>
          <TabSwitch/>
      </Box>
        
      <ul className="messages-container">
          {
            messages.map((messageValue, index) => {
              
              
              const lastMessage = messages.length - 1 === index;
              return (
                <li 
                  key={index} 
                  className={`${messageValue.sender === name ? 'align-left' : ''} ${!messageValue.sender ? 'center-align' : ''}`}
                  ref={lastMessage ? setLastMessageRef : null}
                >
                  <p 
                    className={`${ !messageValue.sender ? 'system-message' :  'chat-message' }`}
                    style={{backgroundColor: messageValue.sender === name && '#ff0000'}}
                  >
                    {messageValue.message ? messageValue.message : messageValue }
                  </p>
                  <p className="sender-details">
                    <p>
                      {
                        messageValue.sender === name ? 'You':
                        messageValue.sender ? messageValue.sender
                        : ''
                      }
                    </p>
                    <p>{messageValue.timeStamp}</p>
                  </p>
                  
                </li>
              )
            })
          }
      </ul>

      <CommentField/>

    </Box>
  )
};

export default MessageBody;