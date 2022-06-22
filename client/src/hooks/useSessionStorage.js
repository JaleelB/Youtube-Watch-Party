import {useEffect, useState} from 'react';

//used to identify what values are associated with each app on the different localhost servers
const PREFIX = 'youtube-watch-party-';

export default function useSessionStorage(key, initialValue){
    const prefixedKey = PREFIX + key;
    const [value, setValue] = useState(()=>{
        const jsonData = sessionStorage.getItem(prefixedKey);
        if(jsonData !== null) return JSON.parse(jsonData);

        //if the item specified is not in session storage
        //and the fucntion version of useState was called
        if(typeof initialValue === 'function'){
            return initialValue;
        }else{
            //if not just return the intial value of use state
            return initialValue;
        }
    })

    //if key or value is chnaged, update value in session storage
    //doing so overides old value
    useEffect(()=>{
        sessionStorage.getItem(prefixedKey, JSON.stringify(value))
    },[prefixedKey, value])

    return[value, setValue];
}