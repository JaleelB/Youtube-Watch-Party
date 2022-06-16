import { Box } from '@mui/material';
import React from 'react';
import {CommentField, TabSwitch} from '../../components';
import { usePartyRoomPropsContext } from '../../context/PartyRoomContext';
import './MessageBody.scss';


const MessageBody = () => {

  const partyRoomProps = usePartyRoomPropsContext();
  const { 
      showChat, messages
   } = partyRoomProps.partyRoomProps;

  return (
    <Box id='message-body'>
      <Box className="tab-details-wrapper">
          <h2 className="tab-title">{showChat ? 'Chat' : 'Participants'}</h2>
          <TabSwitch/>
      </Box>
        
      <ul className="messages-container">
          {
            messages.map((messageValue, index) => {
              return (
                <li key={index} className="message">{messageValue}</li>
              )
            })
          }
      </ul>

      <CommentField/>

    </Box>
  )
};

export default MessageBody;