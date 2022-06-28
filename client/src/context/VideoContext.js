import React, {useState, useContext, createContext} from 'react';

const VideoContext = createContext();

export function useVideoContext(){
    return useContext(VideoContext);
}

export function VideoContextProvider({children}){

    const [fullVideo, setFullVideo] = useState(false);
    const [playVideo, setPlayVideo] = useState(true);

    const videoProps = {
        fullVideo, setFullVideo,
        playVideo, setPlayVideo
    };

     return (
        <VideoContext.Provider value={{videoProps}}>
            {children}
        </VideoContext.Provider>
    );
}