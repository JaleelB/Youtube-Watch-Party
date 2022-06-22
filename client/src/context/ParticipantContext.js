import { createContext, useReducer, useEffect, useState } from "react";
import { ParticipantReducer } from "../reducers/ParticipantReducer";

const INITIAL_STATE = {
    name: JSON.parse(sessionStorage.getItem("name")) || null,
    host: JSON.parse(sessionStorage.getItem("host")) || null
};

export const ParticipantContext = createContext(INITIAL_STATE);

export const ParticipantContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(ParticipantReducer, INITIAL_STATE);

    //saves user informaton after login to prevent losing it when refreshing
    useEffect(() => {
        // if(state.host === true){
            sessionStorage.setItem("name", JSON.stringify(state.name))
            sessionStorage.setItem("host", JSON.stringify(state.host))
            // if(state.host === false) sessionStorage.setItem("room", JSON.stringify(state.room))
            
        // }

    }, [state.name]);

    return (
        <ParticipantContext.Provider
            value={{
                name: state.name,
                id: state.id,
                host: state.host,
                // roomID: state.room,
                dispatch,
                // hostName, setHostName
            }}
        >
            {children}
        </ParticipantContext.Provider>
    );


};