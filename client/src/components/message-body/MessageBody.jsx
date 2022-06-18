import { Box } from '@mui/material';
import React, {useState, useCallback} from 'react';
import {CommentField, TabSwitch} from '../../components';
import { useConversationContext } from '../../context/ConversationContext';
import './MessageBody.scss';

const MessageBody = () => {

  const props = useConversationContext();
  const { 
      showChat, messages, setMessages, socket
   } = props.conversationProps;


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

  const[isMessageSender, setIsMessageSender] = useState();
  // useEffect(()=>{
    socket.on("receive_message", (data) =>{
      addMessage(data.message)

      // console.log(data)
      setIsMessageSender(false);

      if(data.isSender){
        setIsMessageSender(true);
      }else{
        setIsMessageSender(false);
      }
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
              console.log(isMessageSender)
              //checks if the current message is the last one in the message array
              const lastMessage = messages.length - 1 === index;
              return (
                <li 
                  key={index} 
                  className={isMessageSender ? 'align-left' : ''}
                  ref={lastMessage ? setLastMessageRef : null}
                >
                  <p className="message">{messageValue}</p>
                  {isMessageSender ? 'You' : ''}
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