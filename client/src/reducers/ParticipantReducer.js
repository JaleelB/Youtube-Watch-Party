const ACTIONS = {
    CREATE_HOST_PARTICIPANT: 'create-host-participant',
    CREATE_PARTICIPANT: 'create-participant',

    ADD_PARTICIPANT: 'add-participant',
    REMOVE_PARTICIPANT: 'renove-participant'
};


export const ParticipantReducer = (state, action) => {
    
    switch(action.type){
        case ACTIONS.CREATE_PARTICIPANT:
            // console.log(action)
            // return [...participants, newParticipant(action.payload.name)]
            return {
                name: action.payload.name,
                host: false,
                roomID: action.payload.roomID
            };
        case ACTIONS.CREATE_HOST_PARTICIPANT:
            // return [...participants, newParticipant(action.payload.name)]
            // console.log(action.payload)
            return {
                name: action.payload.name,
                host: true,
                roomID: action.payload.roomID
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




