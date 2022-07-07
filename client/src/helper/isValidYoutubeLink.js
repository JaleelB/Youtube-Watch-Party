// import {useState} from 'react';

export default function isValidYoutubeLink (ytVideoURL){

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;

    if(ytVideoURL !== undefined || ytVideoURL !== null){
        const match = ytVideoURL.match(regExp);
        if(match && match[2].length === 11){
            // setIsValid(true);
            return true;
        }
        // else{
        //     setIsValid(false)
        // }
    }

    return false;
};