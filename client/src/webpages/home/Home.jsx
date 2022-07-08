import { Box, Link } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CTAButton } from '../../components';
import { ParticipantContext } from '../../context/ParticipantContext';
import { v4 as uuidv4 } from 'uuid';
import './Home.scss';
import useUrlId from '../../hooks/useUrlId';
import {useSocketContext} from '../../context/SocketContext';
import isValidYoutubeLink from '../../helper/isValidYoutubeLink';

const Home = ({setId, id}) => {

    const [hostDisplayName, setHostDisplayName] = useState('');
    const [participantDisplayName, setParticipantDisplayName] = useState('');
    const [ytVideoURL, setYTVideoURL] = useState('');
    const [joinRoomID, setJoinRoomID] = useState('');
    const [joinFieldEmpty, setJoinFieldEmpty] = useState(false);
    const [hostFieldEmpty, setHostFieldEmpty] = useState(false);
    const [invalidLink, setInvalidlink] = useState(false);


    const socket = useSocketContext();
    const {dispatch} = useContext(ParticipantContext);
    const navigate = useNavigate();

    const { roomId } = useUrlId(joinRoomID);
    
    useEffect(()=>{
        const idRoom = uuidv4()
        setId(idRoom);
    },[]);


    const isJoinFieldEmpty = () => {
        if(participantDisplayName === '' || joinRoomID === ''){
            setJoinFieldEmpty(true)
            return true;
        }

        if(joinFieldEmpty) setJoinFieldEmpty(false)
        return false;
    }

    const isHostFieldEmpty = () => {
        if((hostDisplayName === '' || ytVideoURL === '') || (hostDisplayName === '' && ytVideoURL === '')){
            setHostFieldEmpty(true);
            return true;
        }

        if(hostFieldEmpty) setHostFieldEmpty(false);
        return false;
    }

    const isValidYoutubeLink = () => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;

        if(ytVideoURL !== undefined || ytVideoURL !== null){
            const match = ytVideoURL.match(regExp);
            if(match && match[2].length === 11){
                setInvalidlink(false);
                return true;
            }

            if(!invalidLink) setInvalidlink(true);
            return false;
        }
    }

    const submitHostDetails = () => {
        if(isHostFieldEmpty() === false && isValidYoutubeLink()){
        // if(isHostFieldEmpty() === false && !invalidLink){
            if(hostDisplayName !== '') dispatch({ type: 'create-host-participant', payload: {
                name: hostDisplayName, roomID: id, currentVideoPlaying: ytVideoURL 
            }});
            navigate(`/room/${id}`);
            // socket.emit('join_room', {username: hostDisplayName, room: id, isHost: true} );
            socket.emit('host_room', {username: hostDisplayName, currentVideoPlaying: ytVideoURL} );
        }
    };

    const submitParticipantDetails = () => {
        if(isJoinFieldEmpty() === false){
            if(participantDisplayName !== '') dispatch({ type: 'create-participant', payload: {
                name: participantDisplayName, roomID: roomId
                
            }});
            navigate(`/room/${roomId}`);
            socket.emit('join_room', {
                username: participantDisplayName, room: roomId
            } );
        }
    };

    

  return (
    <main id="home">
  
        <Box className="header">
            <Box className="logo">
                <h2 className="header-text text-1">block</h2>
                <h2 className="header-text text-2">watch</h2>
            </Box>

            <Link className="begin">Begin</Link>
            <Link className="get-started">Get Started</Link>
            
        </Box>

      <section className="hero">
        <Box>
            <h1 className="hero-slogan"> #1 GROUP WATCH PLATFORM</h1>
        </Box>
        
        <Box>
            <h2 className="hero-app-title">Youtube</h2>

                <p className="supplemental-message subheadline-1">
                    We are a tool friends and family can stream YouTube 
                    videos seamlessly, and most importantly,
                    <span className="bold-text">together.</span>
                </p>

            <h2 className="hero-app-title">Block Watch</h2>
        </Box>

        <Box>
            <p className="supplemental-message subheadline-2">
                We are a tool friends and family can stream YouTube 
                videos seamlessly, and most importantly,
                <span className="bold-text">together.</span>
            </p>
        </Box>

        <Box className="cta-button-wrapper">
            <CTAButton text="Host Party"/>
            <CTAButton text="Join Party" classname="inverted"/>
        </Box>

      </section>


    
      <section className="host-section">
        <Box className="text-wrapper">
            <h2 className="subtitle-text">
                <span>host</span>
                <span>your</span>
                <br/>
                <span className="__3">own</span>
                <span>party</span>
            </h2>
        </Box>

        <Box className="host-details">

            <Box className="text-wrapper">
                <p className="instructions">
                    Simply fill in your display name and provide a 
                    valid Youtube video url. After that, you are on
                    your way to having a memorable hag session!
                </p>
            </Box>

            <Box className="input-wrapper">
                <Box className="input">
                    <label htmlFor="host-name" className="input-label">Party Display Name</label>
                    <input 
                        id="host-name" 
                        type="text"
                        onChange={(e)=> {
                            setHostDisplayName(e.target.value);
                        }}
                    />
                </Box>

                {/* {inValidLink && <span className="invalid-message">Invalid Youtube Link</span>} */}
                {invalidLink && <span className="invalid-message">Invalid Youtube Link</span>}
                
                <Box className="input">
                    <label htmlFor="video-link" className="input-label">YouTube Video Link</label>
                    <input 
                        id="video-link" 
                        type="text"
                        onChange={(e)=> {
                            setYTVideoURL(e.target.value);
                        }}
                    />
                </Box>
                
                {hostFieldEmpty && <span className="empty-host-field-message">Fill out all fields to proceed</span>}

                <CTAButton text="Begin Hosting" buttonFunction={submitHostDetails}/>
            </Box>
            
        </Box>
      </section>

      <section className="join-section">
        <Box className="text-wrapper">
            <h2 className="subtitle-text">
                <span>join</span>
                <span>a</span>
                {/* <br/>
                <span>own</span> */}
                <span>party</span>
            </h2>
        </Box>

        <Box className="participant-details">

            <Box className="text-wrapper">
                <p className="instructions">
                    Simply fill in your display name and provide a 
                    valid Youtube video url. After that, you are on
                    your way to having a memorable hag session!
                </p>
            </Box>

            <Box className="input-wrapper">
                <Box className="input">
                    <label htmlFor="participant-name" className="input-label">Party Display Name</label>
                    <input 
                        id="participant-name" 
                        type="text"
                        onChange={(e)=> {
                            setParticipantDisplayName(e.target.value);
                        }}
                    />
                </Box>
                
                <Box className="input">
                    <label htmlFor="room-id" className="input-label">Room Id</label>
                    <input 
                        id="room-id" 
                        type="text"
                        onChange={(e)=> {
                            setJoinRoomID(e.target.value);
                        }}
                    />
                </Box>

                {joinFieldEmpty && <span className="empty-join-field-message">Fill out all fields to proceed</span>}

                <CTAButton text="Join Party" buttonFunction={submitParticipantDetails}/>
                
            </Box>
            
        </Box>
      </section>


    </main>
  )
}

export default Home;
