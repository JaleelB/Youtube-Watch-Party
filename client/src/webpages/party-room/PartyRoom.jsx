import React, { useContext, useEffect } from 'react';
import {Box} from '@mui/material';
import {
    CTAButton, CommentField, ProgressBar,
     HeaderBar, MessageBody, VideoPlayer,
     SubmitLinkBody, NameModal
} from '../../components';
import './PartyRoom.scss';
import { AddBox, ArrowDropDown, PeopleOutlineTwoTone, VideoCameraBack } from '@mui/icons-material';
import { useConversationContext } from '../../context/ConversationContext';
import { useSocketContext } from '../../context/SocketContext';

const PartyRoom = () => {


    const socket = useSocketContext();

    const props = useConversationContext();
    const { setChat, chat, addMessageToChat} = props.conversationProps;

    // async function addMessageToChat (messageData){
    //     setChat([
    //         ...chat, messageData
    //     ])
    // }

    // useEffect(()=>{

    //     if(!socket) return;

        // socket.on('system_message', (message)=>{
        //     addMessageToChat(message)
        // })

        // socket.on("receive_chat_message", (data) =>{
        //     addMessageToChat(data)
        // })
      
    //     return () => {
    //         socket.off('recieve_message');
    //         socket.off('system_message');
    //         socket.off('user_connected');
    //     }

    // },[socket])


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
                        <CTAButton text="Leave Room" />
                    </Box>

                    

                    <VideoPlayer/>

                    <Box className="video-details">
                        <h2 className="video-name">How To Train Your Dragon</h2>
                    </Box>

                    <Box className="cta-btn-wrapper">
                        <CTAButton text="Change Video" classname="inverted" component={<VideoCameraBack/>}/>
                        <CTAButton text="Invite" classname="inverted" component={<AddBox/>}/>
                    </Box>
                    
                </Box>
                
                <MessageBody/>
            </Box>
            
        </Box>
        
    )
    
};

export default PartyRoom;