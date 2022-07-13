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
import useYoutubeUrlGetId from '../../hooks/useYoutubeUrlGetId';
import { useConversationContext } from '../../context/ConversationContext';
import useFetchAPi from '../../hooks/useFetchAPi';

const PartyRoom = () => {
    
    const { room , dispatch, participantList, currentVideoPlaying, name} = useContext(ParticipantContext);
    const {videoID} = useYoutubeUrlGetId(currentVideoPlaying);
    const {apiData} = useFetchAPi(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&fields=items(id,snippet)&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`);

    const socket = useSocketContext();
    const navigate = useNavigate();
    const props = useConversationContext();
    const { 
        setChat
    } = props.conversationProps;


    const [open, setOpen] = useState({
        nameModal: false,
        inviteModal: false,
        changeVideoModal: false,
    });

    //listens for any changes to room user or video information
    //if there are changes, update state with changes
    useEffect(()=>{

        if(!socket) return;

        socket.on('room_information', ({participantList, currentVideoPlaying})=>{

            if(room){
                dispatch({type: 'update-participant-list', payload: {participantList}})
                dispatch({type: 'update-participant-video', payload: {currentVideoPlaying}})
            }
        })

        return () => {
            socket.off('room_information');
        }

    },[socket, room, dispatch])

    //checks if roomid exists in state, if not allow 
    //user to enter name and allow them to joinroom
    useEffect(()=>{

        if(name === null) setOpen({...open, nameModal: true});

    },[name, open])

    useEffect(()=>{

        if(!socket) return;
        
        if (window.performance) {
            if (performance.navigation.type === 1) {

                //if participant is the only person in the room, which automatically makes them host
                //the room will be recreated upon refresh with the previous room information as the room gets 
                //deleted upon refresh
              if(participantList.length === 1){
                socket.emit('host_room', {
                    username: name, currentVideoPlaying
                });
              }else{
                socket.emit('join_room', {
                    username: name, room: room
                });
              }
            }
        }

    },[socket])



    const handleLeaveRoom = () => {
        sessionStorage.removeItem('youtube-watch-party-name');
        sessionStorage.removeItem('youtube-watch-party-participants-in-room');
        sessionStorage.removeItem('youtube-watch-party-current-video-playing');
        sessionStorage.removeItem('youtube-watch-party-host');
        sessionStorage.removeItem('youtube-watch-party-roomId');
        setChat([]);
        navigate('/');
    }

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
                        </Box>
                        <CTAButton text="Leave Room" buttonFunction={handleLeaveRoom}/>
                    </Box>

                    

                    <VideoPlayer/>

                    
                    <Box className="video-details">
                        <h2 className="video-name">{apiData.title}</h2>
                        <h2 className="video-channel">{ apiData.channelTitle}</h2>
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