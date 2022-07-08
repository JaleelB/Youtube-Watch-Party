import { createContext, useReducer, useEffect, useContext } from "react";
import { ParticipantReducer } from "../reducers/ParticipantReducer";
import { useSocketContext } from "./SocketContext";

const PREFIX = 'youtube-watch-party-'

const INITIAL_STATE = {
    name: JSON.parse(sessionStorage.getItem(PREFIX + "name")) || null,
    host: JSON.parse(sessionStorage.getItem(PREFIX + "host")) || null,
    roomID: JSON.parse(sessionStorage.getItem(PREFIX + "roomId")) || null,
    participantList: JSON.parse(sessionStorage.getItem(PREFIX + "participants-in-room")) || [],
    currentVideoPlaying: JSON.parse(sessionStorage.getItem(PREFIX + "current-video-playing")) || null
};

export const ParticipantContext = createContext(INITIAL_STATE);

export const ParticipantContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(ParticipantReducer, INITIAL_STATE);

    const socket = useSocketContext();

    useEffect(()=>{

        if(!socket) return;

        socket.on('change_host_participant', ({isHost, username})=>{
            if(state.name === username) dispatch({type: 'change-host-participant', payload: {isHost}})
        })

        return () => {
            socket.off('change_host_participant');
        }

    },[socket, state.name, dispatch])

    //saves user informaton after login to prevent losing it when refreshing
    useEffect(() => {
        // if(state.host === true){
            sessionStorage.setItem(PREFIX + "name", JSON.stringify(state.name))
            sessionStorage.setItem(PREFIX + "host", JSON.stringify(state.host))
            sessionStorage.setItem(PREFIX + "roomId", JSON.stringify(state.roomID))
            sessionStorage.setItem(PREFIX + "participants-in-room", JSON.stringify(state.participantList))
            sessionStorage.setItem(PREFIX + "current-video-playing", JSON.stringify(state.currentVideoPlaying))
            
        // }

    }, [state.name, state.host, state.roomID, state.participantList, state.currentVideoPlaying]);

    return (
        <ParticipantContext.Provider
            value={{
                name: state.name,
                id: state.id,
                host: state.host,
                room: state.roomID,
                participantList: state.participantList,
                currentVideoPlaying: state.currentVideoPlaying,
                dispatch,
                // participantJoinRoom
            }}
        >
            {children}
        </ParticipantContext.Provider>
    );


};