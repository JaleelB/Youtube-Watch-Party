import { createContext, useReducer, useEffect, useContext } from "react";
import { ParticipantReducer } from "../reducers/ParticipantReducer";
import { useSocketContext } from "./SocketContext";

const PREFIX = 'youtube-watch-party-'

const INITIAL_STATE = {
    name: JSON.parse(sessionStorage.getItem(PREFIX + "name")) || null,
    host: JSON.parse(sessionStorage.getItem(PREFIX + "host")) || null,
    roomID: JSON.parse(sessionStorage.getItem(PREFIX + "roomId")) || null
};

export const ParticipantContext = createContext(INITIAL_STATE);

export const ParticipantContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(ParticipantReducer, INITIAL_STATE);

    // const socket = useSocketContext();

    // const participantJoinRoom = () => {
    //     const roomId = getIdFromURL();
    //     console.log(roomId)
    //     socket.emit('join_room', {username: state.name, room: roomId} );
    // };

    // const getIdFromURL = () =>{
    //         const url = window.location.href.toString().split("/");
    //         const roomId = url[url.length - 1];
    //         return roomId;

    // }

    // useEffect(()=>{

    //     if(!socket) return;

    //     socket.on('system_message', (message)=>{
    //         addMessageToChat(message)
    //     })
        

    // },[socket])

   

    //saves user informaton after login to prevent losing it when refreshing
    useEffect(() => {
        // if(state.host === true){
            sessionStorage.setItem(PREFIX + "name", JSON.stringify(state.name))
            sessionStorage.setItem(PREFIX + "host", JSON.stringify(state.host))
            sessionStorage.setItem(PREFIX + "roomId", JSON.stringify(state.roomID))
            
        // }

    }, [state.name, state.host, state.roomID]);

    return (
        <ParticipantContext.Provider
            value={{
                name: state.name,
                id: state.id,
                host: state.host,
                room: state.roomID,
                dispatch,
                // participantJoinRoom
            }}
        >
            {children}
        </ParticipantContext.Provider>
    );


};