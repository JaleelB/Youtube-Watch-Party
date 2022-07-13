import { Avatar, Box } from '@mui/material';
import React, { useContext } from 'react';
import { ParticipantContext } from '../../context/ParticipantContext';
import './HeaderBar.scss';

const HeaderBar = () => {

    const {participantList} = useContext(ParticipantContext);

    return(
        <Box id='header-bar'>
            <Box className="logo-wrapper">
                <h2 className="text-1">block</h2>
                <h2 className="text-2">watch</h2>
            </Box>
            <Box className="host-details">
                <Avatar className="profile-icon"/>
                <Box className="host-name-title">
                    <h2 className="host-name">
                        {
                            participantList.map((participant)=>{
                                if(participant.isHost) return participant.username;
                            })
                        }
                    </h2>
                    <h2 className="host-title">Party Host</h2>
                </Box>
            </Box>
           
        </Box>
    )
}

export default HeaderBar;

