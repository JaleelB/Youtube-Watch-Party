import { Box } from '@mui/material';
import React from 'react';
import './SubmitLinkBody.scss'
import {InvertedInput, CTAButton} from '../../components';
import { YouTube } from '@mui/icons-material';

const SubmitLinkBody = () => {
    return(
        <Box id="submit-link-body">
            <Box className="submit-link-inner">
                <YouTube className="youtube-icon"/>
                <Box className="supplemental-message">
                    Enter youtube video to begin streaming. 
                    Make sure to provide a valid Youtube video link
                </Box>
                <InvertedInput/>
                <CTAButton text="Submit Video Link" height={40}/>
            </Box>
            
        </Box>
    );
};

export default SubmitLinkBody;