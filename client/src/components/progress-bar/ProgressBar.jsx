import React from 'react';
import {Box} from '@mui/material';
import './ProgressBar.scss';
import { Fullscreen, Pause, PlayArrow } from '@mui/icons-material';
import {useVideoContext} from '../../context/VideoContext';
import './ProgressBar.scss';
import { VideoSeekSlider } from "react-video-seek-slider";
import "react-video-seek-slider/styles.css";

const ProgressBar = () => {

    const videoProps = useVideoContext();
    const { 
        setPlayVideo, setFullVideo, 
        fullVideo, playVideo
    } = videoProps.videoProps;

    return(
        <Box id="progress-bar">
            
                <Box className="video-actions">
                    <Box
                        onClick={()=> setPlayVideo(!playVideo)}
                    >
                        {playVideo ? 
                            <Pause className="pause-icon icon"/>:
                            <PlayArrow className="play-icon icon"/>
                        }
                    </Box>
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
                    <Fullscreen className="icon" onClick={()=> setFullVideo(!fullVideo)}/>
                </Box>

        </Box>
        
    )
    
};

export default ProgressBar;