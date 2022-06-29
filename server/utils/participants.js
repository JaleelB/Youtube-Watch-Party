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

    // console.log("Participants: " ,allParticipants)
    return newParticipant;
}

//finds and returns participant stored in participant list
//so user information stored in server can be accessed
function getParticipant(roomID, id){
    const participantsInRoom = getRoomParticipants(roomID)
    return participantsInRoom.find(participant => participant.id === id);
}

// function getParticipant(id){
//     const participantsInRoom = getAllParticipantsInARoom()
//     return participants.find(participant => participant.id === id);
// }

function removeParticipantOnLeave(id){
    const participantInRoom = allParticipants.findIndex(participant => participant.id === id);
    if(participantInRoom !== -1) return allParticipants.splice(participantInRoom, 1)[0];
}

// function getParticipntsInRoom(room){
//     return participants.filter(participant => participant.room === room)
// }

module.exports = {
    createParticipant,
    getParticipant,
    removeParticipantOnLeave,
    // getParticipntsInRoom
};