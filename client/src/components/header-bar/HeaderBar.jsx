import { Avatar, Box } from '@mui/material';
import React from 'react';
import './HeaderBar.scss';

const HeaderBar = () => {
    return(
        <Box id='header-bar'>
            <Box className="logo-wrapper">
                <h1 className="app-title"> Block Watch </h1>
            </Box>
            <Box className="host-details">
                <Avatar className="profile-icon"/>
                <Box className="host-name-title">
                    <h2 className="host-name">Random Name</h2>
                    <h2 className="host-title">Party Host</h2>
                </Box>
            </Box>
           
        </Box>
    )
}

export default HeaderBar;

