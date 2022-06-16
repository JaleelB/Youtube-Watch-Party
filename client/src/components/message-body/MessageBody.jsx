import { Box } from '@mui/material';
import React, {useEffect, useCallback} from 'react';
import {CommentField, TabSwitch} from '../../components';
import { usePartyRoomPropsContext } from '../../context/PartyRoomContext';
import './MessageBody.scss';

const MessageBody = () => {

  const partyRoomProps = usePartyRoomPropsContext();
  const { 
      showChat, messages, setMessages, socket
   } = partyRoomProps.partyRoomProps;


  //scrolls into view when latest message is sent
  const setLastMessageRef = useCallback( node => {
    if(node) node.scrollIntoView({ smooth: true});
  }, [])

  const addMessage = (message) => {   
    if(message !== ''){
      setMessages([
        ...messages, message
      ])
    }
  };

  // useEffect(()=>{
    socket.on("receive_message", (data) =>{
      addMessage(data.message)
    })

  // },[socket]);



  return (
    <Box id='message-body'>
      <Box className="tab-details-wrapper">
          <h2 className="tab-title">{showChat ? 'Chat' : 'Participants'}</h2>
          <TabSwitch/>
      </Box>
        
      <ul className="messages-container">
          {
            messages.map((messageValue, index) => {

              //checks if the current message is the last one in the message array
              const lastMessage = messages.length - 1 === index;
              return (
                <li 
                  key={index} 
                  className="message"
                  ref={lastMessage ? setLastMessageRef : null}
                >
                  {messageValue}
                </li>
              )
            })
          }
      </ul>

      <CommentField />

    </Box>
  )
};

export default MessageBody;