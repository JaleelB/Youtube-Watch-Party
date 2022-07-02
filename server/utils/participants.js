const {
    addParticipantToRoom, getRoomParticipants
} = require('./rooms')

const allParticipants = [];

//join participant to room
function createParticipant(id, username, room, host){

    const newParticipant = {
        id, 
        username, 
        room,
        isHost: host || null
    };

    allParticipants.push(newParticipant);

    addParticipantToRoom(room, newParticipant);

    return newParticipant;
}

//finds and returns participant stored in participant list
//so user information stored in server can be accessed
function getParticipant(id){
    const participant = allParticipants.find(participant => participant.id === id);
    const participantsInRoom = participant ? getRoomParticipants(participant.room) : null;
    if(participantsInRoom) return participantsInRoom.find(participant => participant.id === id);

    return null;
}

//remove user from list of all users
function removeParticipantFromList(id){
    const participantinList = allParticipants.findIndex(participant => participant.id === id);
    if(participantinList !== -1) return allParticipants.splice(participantinList, 1)[0];

    return null;
}


module.exports = {
    createParticipant,
    getParticipant,
    removeParticipantFromList
};