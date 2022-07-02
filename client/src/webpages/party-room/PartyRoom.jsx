import React, { useContext, useEffect, useState } from 'react';
import {Box} from '@mui/material';
import {
    CTAButton,HeaderBar, MessageBody,
     VideoPlayer, ModalPopup
} from '../../components';
import './PartyRoom.scss';
import { AddBox, PeopleOutlineTwoTone, VideoCameraBack } from '@mui/icons-material';
import { ParticipantContext } from '../../context/ParticipantContext';
import { useSocketContext } from '../../context/SocketContext';
import { useNavigate } from 'react-router-dom';

const PartyRoom = () => {

    const { host, room , dispatch, participantList} = useContext(ParticipantContext);
    const socket = useSocketContext();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const getIdFromURL = () =>{
    //         const url = window.location.href.toString().split("/");
    //         const roomId = url[url.length - 1];
    //         return roomId;
    // }

    useEffect(()=>{

        if(!socket) return;

        socket.on('room_information', ({participantList, currentVideoPlaying})=>{
            if(host) dispatch({type: 'update-host-participant', payload: {participantList, currentVideoPlaying}})
            else if(!host && room) dispatch({type: 'update-participant', payload: {participantList, currentVideoPlaying}})
        })

        return () => {
            socket.off('room_information');
        }

    },[socket, host, room])

    const handleLeaveRoom = () => navigate('/');

    return(
        <Box id="party-room">

            {/* <NameModal/> */}

            <HeaderBar/>
            <Box className="inner">

                { open && 
                    <ModalPopup
                        open={open}
                        handleClose={handleClose}
                        text = {window.location.href}
                        ctaText = {'Copy link'}
                        title = {'Copy the link to share invite'}
                    /> 
                }

                { room === null &&
                    <ModalPopup
                        open={open}
                        handleClose={handleClose}
                        // text = {window.location.href}
                        ctaText = {'Submit Display Name'}
                        title = {'Enter Display Name'}
                    /> 
                }
                
                <Box className="video-details-wrapper">
                    <Box className="room-actions">
                        <Box className="participant-wrapper">
                            <h2 className="participant-text">
                                <PeopleOutlineTwoTone/>
                            </h2>
                            <span className="participant-count">{participantList.length}</span>
                            {/* <ArrowDropDown/> */}
                        </Box>
                        <CTAButton text="Leave Room" buttonFunction={handleLeaveRoom}/>
                    </Box>

                    

                    <VideoPlayer/>

                    <Box className="video-details">
                        <h2 className="video-name">How To Train Your Dragon</h2>
                    </Box>

                    <Box className="cta-btn-wrapper">
                        <CTAButton text="Change Video" classname="inverted" component={<VideoCameraBack/>}/>
                        <CTAButton text="Invite" classname="inverted" component={<AddBox/>} buttonFunction={handleOpen}/>
                    </Box>
                    
                </Box>
                
                <MessageBody/>
            </Box>
            
        </Box>
        
    )
    
};

export default PartyRoom;