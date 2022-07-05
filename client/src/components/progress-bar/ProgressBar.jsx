import React from 'react';
import {Box} from '@mui/material';
import './ProgressBar.scss';
import { Fullscreen, Pause, PlayArrow } from '@mui/icons-material';
import {useVideoContext} from '../../context/VideoContext';
import './ProgressBar.scss';
import { VideoSeekSlider } from "react-video-seek-slider";
import "react-video-seek-slider/styles.css";
import { useSocketContext } from '../../context/SocketContext';

const ProgressBar = () => {

    const socket = useSocketContext();

    const videoProps = useVideoContext();
    const { 
        togglePlay, videoDuration, playVideo, currentTime,
        formatTime, handleClickFullscreen, handleSeekChange,
        secondsElapsed, emitTimeOnSeek
    } = videoProps.videoProps;

    return(
        <Box id="progress-bar">
            
                <Box className="video-actions">
                    <Box
                        onClick={togglePlay}
                    >
                        {playVideo ? 
                            <Pause 
                                className="pause-icon icon"
                                onClick={ ()=>{
                                    socket.emit("pause_all_videos", {playVideo: false} )
                                }}
                            />
                            :
                            <PlayArrow 
                                className="play-icon icon"
                                onClick= {() => {
                                    console.log('play all videos is fired')
                                    socket.emit("play_all_videos", {playVideo: true}) 
                                }}
                            />
                        }
                    </Box>
                    <VideoSeekSlider
                        max={videoDuration}
                        currentTime={secondsElapsed}
                        progress={400}
                        onChange={(time)=>{
                            // setIsSeeking(true);
                            handleSeekChange(time);
                            emitTimeOnSeek(time);
                        }}
                        offset={0}
                        secondsPrefix="00:00:"
                        minutesPrefix="00:"
                    />

                    <Box className="video-timestamp">{formatTime(secondsElapsed) + " / " + formatTime(videoDuration)}</Box>
                    <Fullscreen className="icon" onClick={handleClickFullscreen}/>
                </Box>

        </Box>
        
    )
    
};

export default ProgressBar;