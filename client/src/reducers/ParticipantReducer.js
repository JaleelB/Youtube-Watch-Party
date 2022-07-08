const ACTIONS = {
    CREATE_HOST_PARTICIPANT: 'create-host-participant',
    CREATE_PARTICIPANT: 'create-participant',
    UPDATE_PARTICIPANT_LIST: 'update-participant-list',
    UPDATE_PARTICIPANT_VIDEO: 'update-participant-video',
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
                currentVideoPlaying: action.payload.currentVideoPlaying
            };
        case ACTIONS.CREATE_HOST_PARTICIPANT:
            return {
                name: action.payload.name,
                host: true,
                roomID: action.payload.roomID,
                participantList: [],
                currentVideoPlaying: ''
            };
        case ACTIONS.UPDATE_PARTICIPANT_LIST:
            return{
                ...state,
                participantList: action.payload.participantList
            }
        case ACTIONS.UPDATE_PARTICIPANT_VIDEO:
            return{
                ...state,
                currentVideoPlaying: action.payload.currentVideoPlaying 
            }
        case ACTIONS.CHANGE_HOST_PARTICIPANT:
            return{
                    ...state,
                    host: action.payload.isHost
            }
        default: 
            return state;
    }
};




