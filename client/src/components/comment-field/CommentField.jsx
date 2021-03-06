import {Box} from '@mui/material';
import React,{useContext, useRef} from 'react';
import { useConversationContext } from '../../context/ConversationContext';
import {CTAButton} from '../../components';
import './CommentField.scss';
import { Send } from '@mui/icons-material';
import { ParticipantContext } from '../../context/ParticipantContext';


const CommentField = () => {

    const props = useConversationContext();
    const { 
        emitMessage, getUserInput, inputRef
    } = props.conversationProps;


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