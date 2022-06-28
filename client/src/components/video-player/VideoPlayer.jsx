import { Box } from '@mui/material';
import React, {useContext} from 'react';
import { ParticipantContext } from '../../context/ParticipantContext';
import {useVideoContext} from '../../context/VideoContext';
import './VideoPlayer.scss';
import {ProgressBar} from '../../components';
import ReactPlayer from 'react-player'

const VideoPlayer = () => {

    const { currentVideoPlaying } = useContext(ParticipantContext);
    const videoProps = useVideoContext();
    const { playVideo, fullVideo } = videoProps.videoProps

    return (
        <Box className={`video-player ${fullVideo ? 'fullscreen-player' : ''}`}>
            <Box className="video-container">
                <ReactPlayer
                    className = "video-player"
                    url = {currentVideoPlaying}
                    config={{
                        youtube: {playerVars: {showinfo: 1}},
                    }}
                    controls={false} 
                    playing={playVideo}
                />
            </Box>
            <ProgressBar/>
        </Box>
    );
};

export default VideoPlayer;