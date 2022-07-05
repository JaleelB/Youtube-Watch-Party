import React, {useState, useContext, useEffect, useRef, createContext} from 'react';
import { useSocketContext } from './SocketContext';
import screenfull from 'screenfull'

const VideoContext = createContext();

export function useVideoContext(){
    return useContext(VideoContext);
}

export function VideoContextProvider({children}){

    const socket = useSocketContext();

    const [playVideo, setPlayVideo] = useState(false);
    const [videoDuration, setVideoDuration] = useState(null);
    const [isSeeking, setIsSeeking] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [secondsElapsed, setSecondsElapsed] = useState(0);

    const videoPlayerRef = useRef(null);
    const videoWrapperRef = useRef(null);

    //this function sets the total length of the vidoe
    const setDuration = (duration) => setVideoDuration(duration);

    //switches between pause and play states
    const togglePlay = () => setPlayVideo(!playVideo);
    
    //makes use of the fullscreen component. makes video wrapper take total viewport width
    const handleClickFullscreen = () =>  screenfull.toggle(videoWrapperRef.current);

    //sets current time of video based on video slider input
    const handleSeekChange = (seconds) =>  setCurrentTime(seconds);  

    //sets the amount of seconds that have passed in the video
    const timeElapsed = (elapsedSeconds) => setSecondsElapsed(elapsedSeconds);

    //whenever current time of video changes, seek to that portion of video
    const handleVideoSeek = (progress) => {
        if(videoPlayerRef.current) videoPlayerRef.current.seekTo(progress, 'seconds')
    }

    // const emitVideoTimeStamp = (elapsedSeconds) => {
    //     const interval = setInterval(() => socket.emit("update_timeStamp_on_videoSeek", {timeSeek}), 1000);
    //     return () => {
    //         clearInterval(interval);
    //     };
    // };
    
    //takes a time value in seconds and returns it in hr - minute - second format
    const formatTime = (timeValue) => {
        timeValue = Number(timeValue);

        let hours = Math.floor(timeValue / 3600);
        let minutes = Math.floor(timeValue % 3600 / 60);
        let seconds = Math.floor(timeValue % 3600 % 60);

        return hours ? hours + ":" + minutes + ":" + seconds
               : !hours && minutes ? minutes + ":" + seconds
               : "0:" + seconds;
    }

    //wjhen participant seeks through video, video timestamp is updated when participant releases mouse
    const emitTimeOnSeek = (elapsedSeconds) => socket.emit("update_timeStamp_on_videoSeek", {elapsedSeconds})

    useEffect(()=>{

        if(!socket) return;
        
        //when user joins party emit pause message to every one in the party 
        socket.on('video_pause', ({playVideo})=>{ 
            setPlayVideo(playVideo); 
        })

        //this maybe the problem. when user joins, the event is emitted by the pause button
        //a new user has zero seconds elapsed so it sets it for all videos
        socket.on('receive_pause_all_videos', ({playStatus, currentTimeStamp})=>{ 
            setPlayVideo(playStatus); 
            setCurrentTime(currentTimeStamp);
            setSecondsElapsed(currentTimeStamp);
        })

        //when user seeks video update time

        socket.on('receive_play_all_videos', (data)=>{ 
            setPlayVideo(data.playVideo); 
        })

        // socket.on('receive_timeStamp_when_user_joins', (data)=>{ 
        //     setSecondsElapsed(data.currentTimeStamp); 
        //     handleVideoSeek(data.currentTimeStamp)
        // })

        return () => {
            socket.off('video_pause');
            socket.off('receive_pause_all_videos');
            socket.off('receive_play_all_videos');
            // socket.off('receive_timeStamp');
        }

    },[socket, playVideo])


    useEffect(()=>{
        handleVideoSeek(currentTime)
    },[currentTime])


    //gets and sets the seconds played thus far in party for video  
    useEffect(()=>{
        if(videoPlayerRef.current){
            const interval = setInterval(() => {
                timeElapsed(videoPlayerRef.current.getCurrentTime());
               emitTimeOnSeek(videoPlayerRef.current.getCurrentTime());
            }, 1000);
            return () => {
                clearInterval(interval);
            };
        }  
    },[videoPlayerRef.current])


    const videoProps = {
        //fullVideo, setFullVideo,
        playVideo, togglePlay,
        videoDuration, setVideoDuration,
        setDuration, formatTime, currentTime,
        videoPlayerRef,isSeeking, setIsSeeking,
        handleClickFullscreen, handleSeekChange,
        handleVideoSeek, videoWrapperRef, secondsElapsed,
        emitTimeOnSeek
    };


     return (
        <VideoContext.Provider value={{videoProps}}>
            {children}
        </VideoContext.Provider>
    );
}