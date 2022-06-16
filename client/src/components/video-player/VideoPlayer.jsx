import { Box } from '@mui/material';
import React from 'react';
import './VideoPlayer.scss';
import {ProgressBar} from '../../components';

const VideoPlayer = () => {
    return (
        <Box id='video-player'>
            <Box className="video-container">
                <ProgressBar/>
            </Box>
        </Box>
    );
};

export default VideoPlayer;