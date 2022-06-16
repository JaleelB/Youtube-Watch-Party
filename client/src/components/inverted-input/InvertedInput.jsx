import { Box } from '@mui/material';
import React from 'react';
import './InvertedInput.scss'

const InvertedInput = () => {
    return(
        <Box id="inverted-input">
            <input type="text" className="youtube-input" placeholder="Enter valid video link"/>
        </Box>
    );
};

export default InvertedInput;