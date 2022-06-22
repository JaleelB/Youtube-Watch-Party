import { v4 as uuidv4 } from 'uuid';

const ACTIONS = {
    CREATE_HOST_PARTICIPANT: 'create-host-participant',
    CREATE_PARTICIPANT: 'create-participant',

    ADD_PARTICIPANT: 'add-participant',
    REMOVE_PARTICIPANT: 'renove-participant'
};

//creates a new participant using name provided and generating a unique id for each user as a fallback
const newParticipant = (name) => {
    return { id: uuidv4() , name: name};
}

export const ParticipantReducer = (state, action) => {
    
    switch(action.type){
        case ACTIONS.CREATE_PARTICIPANT:
            // console.log(action)
            // return [...participants, newParticipant(action.payload.name)]
            return {
                name: action.payload,
                host: false,
                // room: action.payload.room
            };
        case ACTIONS.CREATE_HOST_PARTICIPANT:
            // return [...participants, newParticipant(action.payload.name)]
            return {
                name: action.payload,
                host: true
            };
        case ACTIONS.ADD_PARTICIPANT:
            // return [...participants, newParticipant(action.payload.name)]
            return {
                // id: action.payload.id,
                name: action.payload.name,
                // host: null
            }
        case ACTIONS.REMOVE_PARTICIPANT:
            // return participants.filter(participant => participant.id !== action.payload.id)
            return{
                id: null,
                name: null,
                // host: null
            }
        default: 
            return state;
    }
};




