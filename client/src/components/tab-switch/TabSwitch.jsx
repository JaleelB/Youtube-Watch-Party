import { Message, PeopleTwoTone } from '@mui/icons-material';
import { Box } from '@mui/material';
import React from 'react';
import { useConversationContext } from '../../context/ConversationContext';
import './TabSwitch.scss'

const TabSwitch = () => {

    const props = useConversationContext();
    const { showChat, setShowChat } = props.conversationProps;

    return(
        <Box id='tab-switch' onClick={()=> {
            if(showChat === true) setShowChat(false);
            else if(showChat === false) setShowChat(true);
        }}>
            <Message className="icon"/>
            <PeopleTwoTone className="icon"/>
            <Box className={`active-tab ${ !showChat ? 'animate-left' : 'animate-right'}`}/>
        </Box>
    )

};

export default TabSwitch;