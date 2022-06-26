import React from 'react';
import {Box, Modal} from '@mui/material';
import {CTAButton} from '../../components';

const style = { 
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: "translate(-50%, -50%)",
    bgcolor: '#272727',
    width: '90%',
    maxWidth: 400,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    textAlign: 'center'

};


const ModalPopup = ({open, handleClose, text, ctaText, title}) => {
  return (
    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box className="modal-inner" sx={style}>
            <h2>{title}</h2>
            <p>{text}</p>
            <CTAButton text={ctaText} buttonFunction={handleClose}/>
        </Box>  
    </Modal>
  )
}

export default ModalPopup;
