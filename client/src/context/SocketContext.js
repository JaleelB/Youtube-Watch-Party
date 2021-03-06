import React, {useEffect, useState, useContext, createContext} from 'react';
import io from 'socket.io-client';

const SocketPropsContext = createContext();

export function useSocketContext(){
    return useContext(SocketPropsContext);
}

export function SocketContextProvider({id, children}){
    
    const [socket, setSocket] = useState();

    //create a socket when page initialy loads or whenever host id changes
    useEffect(()=>{
        // const newSocket = io('http://localhost:4000', {query: {id} })
        const newSocket = io('https://jaleelbdev-youtube-watch-party.herokuapp.com', {query: {id} })
        
        // const newSocket = io.connect('http://localhost:4000')
        setSocket(newSocket);

        //close out the current socket when new scoket is created. This prevents having multiple sockets runnning on
        //the same server which can result in duplicate messages etc
        return ()=> newSocket.close();
    },[id])

    return(
        <SocketPropsContext.Provider value={socket}>
            {children}
        </SocketPropsContext.Provider>
    )
}