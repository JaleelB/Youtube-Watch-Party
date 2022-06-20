import { createContext, useReducer, useEffect, useState } from "react";
import { ParticipantReducer } from "../reducers/ParticipantReducer";

const INITIAL_STATE = {
    name: null,
    host: null,
};

export const ParticipantContext = createContext(INITIAL_STATE);

export const ParticipantContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(ParticipantReducer, INITIAL_STATE);
    const [hostName, setHostName] = useState('');

    //saves user informaton after login to prevent losing it when refreshing
    useEffect(() => {
        if(state.host === true){
            setHostName(state.name)
        }

    }, [state.host]);

    return (
        <ParticipantContext.Provider
            value={{
                name: state.name,
                id: state.id,
                host: state.host,
                dispatch,
                hostName, setHostName
            }}
        >
            {children}
        </ParticipantContext.Provider>
    );


};