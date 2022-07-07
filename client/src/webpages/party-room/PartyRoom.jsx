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

    const { host, room , dispatch, participantList, name} = useContext(ParticipantContext);
    const socket = useSocketContext();
    const navigate = useNavigate();

    const [open, setOpen] = useState({
        nameModal: false,
        inviteModal: false,
        changeVideoModal: false,
    });

    useEffect(()=>{

        if(!socket) return;

        socket.on('room_information', ({participantList, currentVideoPlaying})=>{
            if(host) dispatch({type: 'update-host-participant', payload: {participantList, currentVideoPlaying}})
            else if(!host && room) dispatch({type: 'update-participant', payload: {participantList, currentVideoPlaying}})
        })

        socket.on('change_host_participant', ({isHost, username})=>{
            if(name === username) dispatch({type: 'change-host-participant', payload: {isHost}})
        })

        return () => {
            socket.off('room_information');
            socket.off('change_host_participant');
        }

    },[socket, host, room, name])

    useEffect(()=>{

        if(!room && !name) setOpen({...open, nameModal: true});

    },[room, name])

    const handleLeaveRoom = () => navigate('/');

    return(
        <Box id="party-room">

            <HeaderBar/>
            <Box className="inner">

                { open.inviteModal && !open.nameModal && !open.changeVideoModal &&
                    <ModalPopup
                        open={open.inviteModal}
                        handleClose={()=>{
                            setOpen({...open, inviteModal: false});
                        }}
                        modalType={'invite-modal'}
                        text = {window.location.href}
                        ctaText = {'Copy link'}
                        title = {'Copy the link to share invite'}
                    /> 
                }

                { open.nameModal && !open.inviteModal && !open.changeVideoModal && 
                    <ModalPopup
                        open={open.nameModal}
                        handleClose={()=>{
                            setOpen({...open, nameModal: false});
                        }}
                        buttonFunction = {()=>{
                            setOpen({...open, nameModal: false});
                        }}
                        modalType={'name-modal'}
                        ctaText = {'Submit Name'}
                        title = {'Enter Display Name'}
                        usesInput={true}
                    /> 
                }

                { open.changeVideoModal && !open.inviteModal && !open.nameModal &&
                    <ModalPopup
                        open={open.changeVideoModal}
                        handleClose={()=>{
                            setOpen({...open, changeVideoModal: false});
                        }}
                        modalType={'video-modal'}
                        ctaText = {'Submit Link'}
                        title = {'Enter Valid Youtube Video Link'}
                        usesInput={true}
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
                        <CTAButton 
                            text="Change Video"
                            classname="inverted"
                            component={<VideoCameraBack/>}
                            buttonFunction={()=>{
                                setOpen({...open, changeVideoModal: true});
                            }}
                        />

                        <CTAButton 
                            text="Invite" 
                            classname="inverted" 
                            component={<AddBox/>} 
                            buttonFunction={()=>{
                                // handleInviteOpen
                                setOpen({...open, inviteModal: true});
                            }}
                        />
                    </Box>
                    
                </Box>
                
                <MessageBody/>
            </Box>
            
        </Box>
        
    )
    
};

export default PartyRoom;