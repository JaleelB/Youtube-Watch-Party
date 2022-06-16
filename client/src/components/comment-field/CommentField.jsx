import {Box} from '@mui/material';
import React,{useRef} from 'react';
import { usePartyRoomPropsContext } from '../../context/PartyRoomContext';
import {CTAButton} from '../../components';
import './CommentField.scss';
import { Send } from '@mui/icons-material';
// import io from 'socket.io-client';

// const socket = io.connect('http://localhost:4000');

const CommentField = () => {

    const partyRoomProps = usePartyRoomPropsContext();
    const { 
        // messages, setMessages,
        userMessage, setUserMessage, socket
    } = partyRoomProps.partyRoomProps;


  const inputRef = useRef(null);


    const getUserInput = (e) => setUserMessage(e.target.value);

    const emitMessage = () => {
        
        if(userMessage !== ''){
            socket.emit('send_message', {message: userMessage});
        }

        setUserMessage('');
        inputRef.current.value = "";
        
    };

    return(
        <Box id="comment-field">
            <span className="message">To: Everyone</span>
            <Box className="input-wrapper">
                <input 
                    ref={inputRef}
                    type="text" 
                    className="comment-input" 
                    placeholder="Type message here..."
                    onChange = {(e)=> {
                        getUserInput(e);
                    }}
                />
                
                <Box className="action-btn-wrapper">
                    <CTAButton 
                        component={<Send/>} 
                        buttonFunction={emitMessage}
                    />
                </Box>
                
            </Box>
            
        </Box>
        
    )
    
};

export default CommentField;