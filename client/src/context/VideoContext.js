import React, {useState, useContext, useEffect, useRef, createContext} from 'react';
import { useSocketContext } from './SocketContext';
import screenfull from 'screenfull'

const VideoContext = createContext();

export function useVideoContext(){
    return useContext(VideoContext);
}

export function VideoContextProvider({children}){

    const [playVideo, setPlayVideo] = useState(false);
    const [videoDuration, setVideoDuration] = useState(null);
    const [isSeeking, setIsSeeking] = useState(false);
    const [currentTime, setCurrentTime] = useState(null);
    const [secondsElapsed, setSecondsElapsed] = useState(null);

    const videoPlayerRef = useRef(null);
    const videoWrapperRef = useRef(null);

    const setDuration = (duration) => setVideoDuration(duration);
    const togglePlay = () => setPlayVideo(!playVideo);
 
    const handleClickFullscreen = () =>  screenfull.toggle(videoWrapperRef.current);

    //sets current time of video based on video slider input
    const handleSeekChange = (seconds) =>  setCurrentTime(seconds);  

    const timeElapsed = (elapsedSeconds) => setSecondsElapsed(elapsedSeconds);

    //whenever current time of video changes, seek to that portion of video
    const handleVideoSeek = (progress) => videoPlayerRef.current.seekTo(currentTime, 'seconds')

    const formatTime = (timeValue) => {
        timeValue = Number(timeValue);

        let hours = Math.floor(timeValue / 3600);
        let minutes = Math.floor(timeValue % 3600 / 60);
        let seconds = Math.floor(timeValue % 3600 % 60);

        return hours ? hours + ":" + minutes + ":" + seconds
               : !hours && minutes ? minutes + ":" + seconds
               : "0:" + seconds;
    }

    useEffect(()=>{
        handleVideoSeek()
    },[currentTime])

    //gets the seconds played thus far in video  
    useEffect(()=>{

        const interval = setInterval(() => timeElapsed(videoPlayerRef.current.getCurrentTime()), 1000);
        return () => {
            clearInterval(interval);
        };
        
    },[])


    const videoProps = {
        //fullVideo, setFullVideo,
        playVideo, togglePlay,
        videoDuration, setVideoDuration,
        setDuration, formatTime, currentTime,
        videoPlayerRef,isSeeking, setIsSeeking,
        handleClickFullscreen, handleSeekChange,
        handleVideoSeek, videoWrapperRef, secondsElapsed
    };

    // const socket = useSocketContext();

    

    //emit for video change when user changes video and emit who chnaged video
    //emit for video pause - [
        //when a user joins a party pause a video,
        //when user presses pause button emit who paused video
        //emit video timestamp
    //]
    //emit for video play
    //emit video timestamp when user joins 
    //emit current time when user seeks video

     return (
        <VideoContext.Provider value={{videoProps}}>
            {children}
        </VideoContext.Provider>
    );
}