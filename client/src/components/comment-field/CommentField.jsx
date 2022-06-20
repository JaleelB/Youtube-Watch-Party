import {Box} from '@mui/material';
import React,{useEffect, useRef} from 'react';
import { useConversationContext } from '../../context/ConversationContext';
import {CTAButton} from '../../components';
import './CommentField.scss';
import { Send } from '@mui/icons-material';


const CommentField = () => {

    const props = useConversationContext();
    const { 
        messages, setMessages,
        userMessage, setUserMessage, socket
    } = props.conversationProps;


    const inputRef = useRef(null);
    const getUserInput = (e) => setUserMessage(e.target.value);

    const emitMessage = () => {
        
        //updates message list on senders screen to see message they sent
        setMessages([
            ...messages, userMessage
        ]);
        
        if(userMessage !== ''){
            socket.emit('send_message', {
                message: userMessage,
                // isSender: true
            });
        }

        setUserMessage('');
        inputRef.current.value = "";
        
    };

    const emitMessageOnEnerKeypress = (event) => {
        if(event.keyCode === 13){
            console.log(userMessage)
            emitMessage();
        }
        
    }

    //listens for enter keypress after typing message. if enter key is pressed it calls emit function
    useEffect(()=>{

        window.addEventListener('keypress', emitMessageOnEnerKeypress);
        return () => {
            window.removeEventListener('keypress', emitMessageOnEnerKeypress);
        };

    },[])

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