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
        togglePlay, videoDuration, playVideo, currentTime,
        formatTime, handleClickFullscreen, handleCurrentTIme
    } = videoProps.videoProps;

    return(
        <Box id="progress-bar">
            
                <Box className="video-actions">
                    <Box
                        onClick={togglePlay}
                    >
                        {playVideo ? 
                            <Pause className="pause-icon icon"/>:
                            <PlayArrow className="play-icon icon"/>
                        }
                    </Box>
                    <VideoSeekSlider
                        max={videoDuration}
                        currentTime={currentTime}
                        progress={400}
                        onChange={(time)=>{
                            // this.setState({
                            //     currentTime:time
                            // } as State);
                            console.log(time)
                            handleCurrentTIme(time)
                        }}
                        offset={0}
                        secondsPrefix="00:00:"
                        minutesPrefix="00:"
                    />

                    <Box className="video-timestamp">{formatTime(currentTime) + " / " + formatTime(videoDuration)}</Box>
                    <Fullscreen className="icon" onClick={handleClickFullscreen}/>
                </Box>

        </Box>
        
    )
    
};

export default ProgressBar;