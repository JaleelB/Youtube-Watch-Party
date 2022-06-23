import { Box, useFormControl } from '@mui/material';
import React, {useState, useCallback, useContext, useEffect} from 'react';
import {CommentField, TabSwitch} from '../../components';
import { useConversationContext } from '../../context/ConversationContext';
import { ParticipantContext } from '../../context/ParticipantContext';
import { useSocketContext } from '../../context/SocketContext';
import './MessageBody.scss';

const MessageBody = () => {

  // const socket = useSocketContext();
  
  const props = useConversationContext();
  const { 
      showChat, chat
   } = props.conversationProps;

  const {name} = useContext(ParticipantContext);

  //scrolls into view when latest message is sent
  const setLastMessageRef = useCallback( node => {
    if(node) node.scrollIntoView({ smooth: true});
  }, [])  

  return (
    <Box id='message-body'>
      <Box className="tab-details-wrapper">
          <h2 className="tab-title">{showChat ? 'Chat' : 'Participants'}</h2>
          <TabSwitch/>
      </Box>
        
      <ul className="messages-container">
          {
            chat.map((messageValue, index) => {
              
              
              const lastMessage = chat.length - 1 === index;
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
                    <span className="sender">
                      {
                        messageValue.sender === name ? 'You':
                        messageValue.sender ? messageValue.sender
                        : ''
                      }
                    </span>
                    <span className="time-sent">{messageValue.timeStamp}</span>
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