import React, {useState, useContext} from 'react';
import {Box, Modal} from '@mui/material';
import {CTAButton} from '../../components';
import isValidYoutubeLink from '../../helper/isValidYoutubeLink';
import { useSocketContext } from '../../context/SocketContext';
import { ParticipantContext } from '../../context/ParticipantContext';
import useUrlId from '../../hooks/useUrlId';

import './ModalPopup.scss';

const ModalPopup = ({open, handleClose, text, ctaText, title, usesInput, modalType, buttonFunction}) => {

  const[inputText, setInputText] = useState('');
  const[error, setError] = useState('');

  const { roomId } = useUrlId(window.location.href);
  const {dispatch} = useContext(ParticipantContext);

  const socket = useSocketContext();

  return (
    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box className="modal-inner" >
            <h2>{title}</h2>
            {text && <p>{text}</p>}
            { 
              usesInput && 
                <input 
                  className="text-value-input"
                  onChange={(e)=> setInputText(e.target.value)}
                />
            }

            { 
              usesInput && error &&
                <span className="error-message">{error}</span>
            }
            <CTAButton 
              text={ctaText} 
              buttonFunction={()=>{
                
                if(modalType === 'invite-modal'){
                  navigator.clipboard.writeText(text)
                  handleClose();
                }

                if(modalType === 'video-modal'){
                    const validLink = isValidYoutubeLink(inputText)
                    if(!validLink) setError('Invalid Youtube Link');
                    else {
                      socket.emit('change_video_playing', {newVideo: inputText})
                      handleClose();
                    }
                }

                if(modalType === 'name-modal'){
                  if(inputText){
                    dispatch({ type: 'create-participant', payload: { name: inputText, roomID: roomId}})
                    socket.emit('join_room', { username: inputText, room: roomId });
                    buttonFunction();
                    handleClose();
                  }else{
                    setError('Enter a name.');
                  }
                }
              }}
            />
        </Box>  
    </Modal>
  )
}

export default ModalPopup;
