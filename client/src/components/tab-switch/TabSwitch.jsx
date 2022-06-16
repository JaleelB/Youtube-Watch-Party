import { Message, PeopleTwoTone } from '@mui/icons-material';
import { Box } from '@mui/material';
import React from 'react';
import { usePartyRoomPropsContext } from '../../context/PartyRoomContext';
import './TabSwitch.scss'

const TabSwitch = () => {

    const partyRoomProps = usePartyRoomPropsContext();
    const { showChat, setShowChat } = partyRoomProps.partyRoomProps;

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