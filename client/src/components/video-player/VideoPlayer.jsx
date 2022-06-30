import { Box } from '@mui/material';
import React, {useContext,useRef} from 'react';
import { ParticipantContext } from '../../context/ParticipantContext';
import {useVideoContext} from '../../context/VideoContext';
import './VideoPlayer.scss';
import {ProgressBar} from '../../components';
import ReactPlayer from 'react-player'

const VideoPlayer = () => {

    const { currentVideoPlaying } = useContext(ParticipantContext);
    const videoProps = useVideoContext();
    const { 
        playVideo, fullVideo, setDuration, 
        videoPlayerRef, videoWrapperRef
    } = videoProps.videoProps
    

    return (
        <Box 
            className='video-player'
            ref={videoWrapperRef}
        >
            <Box className="video-container">
                <ReactPlayer
                    ref={videoPlayerRef}
                    className = "video-player"
                    url = {currentVideoPlaying}
                    config={{
                        youtube: {playerVars: {showinfo: 1}},
                    }}
                    controls={false} 
                    playing={playVideo}
                    onReady={()=> setDuration(videoPlayerRef.current.getDuration())}
                />
            </Box>
            <ProgressBar/>
        </Box>
    );
};

export default VideoPlayer;