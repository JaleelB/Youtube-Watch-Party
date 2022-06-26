import { Box, useFormControl } from '@mui/material';
import React, {useState, useCallback, useContext, useEffect} from 'react';
import {CommentField, TabSwitch} from '../../components';
import { useConversationContext } from '../../context/ConversationContext';
import { ParticipantContext } from '../../context/ParticipantContext';
import { useSocketContext } from '../../context/SocketContext';
import {motion, AnimatePresence} from "framer-motion"
import './MessageBody.scss';

const MessageBody = () => {

  // const socket = useSocketContext();
  
  const props = useConversationContext();
  const { 
      showChat, chat
   } = props.conversationProps;

  const {name, participantList} = useContext(ParticipantContext);

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
      
      <AnimatePresence exitBeforeEnter>

        { showChat &&
          <>
              <motion.ul 
                className="messages-container"
                // key={selectedTab ? selectedTab.label : "empty"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.9 }}
              >
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
              </motion.ul>
              
              <CommentField/>
            </>
          }

          { !showChat &&
            <motion.ul 
              className="participants-container"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.9 }}
            >
              {
                participantList.map((participant, index)=>{
                  return(
                    <li 
                      key={index}
                      className="participant"
                    >
                      <p className="participant-name-avatar">
                        <span className="participant-avatar">{participant.username ? participant.username[0] : ''}</span>
                        <span className="participant-name">{participant.username ? participant.username : 'No participants'}</span>
                      </p>

                      <span className="active-status"></span>
                    </li>
                  )
                })
              }
            </motion.ul>
          }

      </AnimatePresence>

    </Box>
  )
};

export default MessageBody;