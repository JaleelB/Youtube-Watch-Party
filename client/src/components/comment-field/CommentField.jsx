import {Box} from '@mui/material';
import React,{useRef} from 'react';
import { usePartyRoomPropsContext } from '../../context/PartyRoomContext';
import {CTAButton} from '../../components';
import './CommentField.scss';
import { Send } from '@mui/icons-material';

const CommentField = () => {

    const partyRoomProps = usePartyRoomPropsContext();
    const { 
        messages, setMessages,
        userMessage, setUserMessage
    } = partyRoomProps.partyRoomProps;

    const inputRef = useRef(null);

    const getUserInput = (e) => setUserMessage(e.target.value);

    const addMessage = () => {
        if(userMessage !== ''){
            setMessages([
                ...messages, userMessage
            ])
        }

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
                        buttonFunction={addMessage}
                    />
                </Box>
                
            </Box>
            
        </Box>
        
    )
    
};

export default CommentField;