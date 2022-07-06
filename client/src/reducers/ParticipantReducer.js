const ACTIONS = {
    CREATE_HOST_PARTICIPANT: 'create-host-participant',
    CREATE_PARTICIPANT: 'create-participant',

    UPDATE_HOST_PARTICIPANT: 'update-host-participant',
    UPDATE_PARTICIPANT: 'update-participant',

    CHANGE_HOST_PARTICIPANT: 'change-host-participant'
};


export const ParticipantReducer = (state, action) => {
    
    switch(action.type){
        case ACTIONS.CREATE_PARTICIPANT:
            return {
                name: action.payload.name,
                host: false,
                roomID: action.payload.roomID,
                participantList: [],
                currentVideoPlaying: ''
            };
        case ACTIONS.CREATE_HOST_PARTICIPANT:
            return {
                name: action.payload.name,
                host: true,
                roomID: action.payload.roomID,
                participantList: [],
                currentVideoPlaying: ''
            };
        case ACTIONS.UPDATE_HOST_PARTICIPANT:
            return {
                ...state, 
                participantList: action.payload.participantList,
                currentVideoPlaying: action.payload.currentVideoPlaying  
            }
        case ACTIONS.UPDATE_PARTICIPANT:
            return{
                ...state,
                participantList: action.payload.participantList,
                currentVideoPlaying: action.payload.currentVideoPlaying 
            }
        case ACTIONS.CHANGE_HOST_PARTICIPANT:
            console.log(action.payload)
            return{
                    ...state,
                    host: action.payload.isHost
            }
        default: 
            return state;
    }
};




