import React, { useContext, useEffect, useState } from 'react';
import {Box} from '@mui/material';
import {
    CTAButton,HeaderBar, MessageBody, VideoPlayer
} from '../../components';
import './PartyRoom.scss';
import { AddBox, ArrowDropDown, PeopleOutlineTwoTone, VideoCameraBack } from '@mui/icons-material';
import { ParticipantContext } from '../../context/ParticipantContext';
import { useSocketContext } from '../../context/SocketContext';

const PartyRoom = () => {

    const { name, host, room } = useContext(ParticipantContext);
    const socket = useSocketContext();

    useEffect(()=>{

        if(!socket) return;

        if(host && room) socket.emit('host_room', {username: name} );

    },[socket])

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