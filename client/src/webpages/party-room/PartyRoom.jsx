import React, { useContext, useEffect } from 'react';
import {Box} from '@mui/material';
import {
    CTAButton, CommentField, ProgressBar,
     HeaderBar, MessageBody, VideoPlayer,
     SubmitLinkBody, NameModal
} from '../../components';
import './PartyRoom.scss';
import { AddBox, ArrowDropDown, PeopleOutlineTwoTone } from '@mui/icons-material';
import { useConversationContext } from '../../context/ConversationContext';
import { ParticipantContext } from '../../context/ParticipantContext';

const PartyRoom = () => {

    
 
    const closeRoom = () => {
        console.log("Going back to main room")
    };

    const props = useConversationContext();
    const { 
        messages, setMessages, socket
    } = props.conversationProps;

    const {name} = useContext(ParticipantContext);
    

    // useEffect(()=>{
    //     setMessages([ ...messages, 'You joined' ])
    //     const newUser = () => socket.emit('new_user', name);
    //     newUser();
        
    // },[])

    socket.on('system_message', (message)=>{
        setMessages([ ...messages, message ])
    })
    


    return(
        <Box id="party-room">

            {/* <NameModal/> */}

            <HeaderBar/>

            <Box className="inner">
                <Box className="video-details-wrapper">
                    <Box className="room-actions">
                        <Box className="participant-wrapper">
                            <h2 className="participant-text">
                                <PeopleOutlineTwoTone/>
                            </h2>
                            <span className="participant-count">5</span>
                            <ArrowDropDown/>
                        </Box>
                        <CTAButton text="Leave Room" buttonFunction={closeRoom}/>
                    </Box>

                    

                    <VideoPlayer/>

                    <Box className="video-details">
                        <h2 className="video-name">How To Train Your Dragon</h2>
                        <h3 className="author-title">John Doe</h3>
                    </Box>

                    <CTAButton text="Invite" classname="inverted" component={<AddBox/>}/>
                </Box>
                
                <MessageBody socket={socket}/>
            </Box>
            
        </Box>
        
    )
    
};

export default PartyRoom;