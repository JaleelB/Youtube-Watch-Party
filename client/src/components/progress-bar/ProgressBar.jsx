import React from 'react';
import {Box} from '@mui/material';
import './ProgressBar.scss';
import { Fullscreen, Pause } from '@mui/icons-material';
import './ProgressBar.scss';
import { VideoSeekSlider } from "react-video-seek-slider";
import "react-video-seek-slider/styles.css";

const ProgressBar = () => {

    return(
        <Box id="progress-bar">
            
                <Box className="video-actions">
                    <Pause className="pause-icon icon"/>
                    <VideoSeekSlider
                        max={12000}
                        currentTime={1700}
                        progress={400}
                        // onChange={(time)=>{
                        //     this.setState({
                        //         currentTime:time
                        //     } as State);
                        // }}
                        offset={0}
                        secondsPrefix="00:00:"
                        minutesPrefix="00:"
                    />

                    <Box className="video-timestamp">1:00:35</Box>
                    <Fullscreen className="icon"/>
                </Box>

        </Box>
        
    )
    
};

export default ProgressBar;