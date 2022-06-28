const participants = [];

//join participant to room
function participantJoin(id, username, room, host, currentVideoPlaying){

    const newParticipant = {
        id, 
        username, 
        room,
        isHost: host || null,
        currentVideoPlaying
    };

    participants.push(newParticipant);

    console.log("Participants: " ,participants)
    return newParticipant;
}

//finds and returns participant stored in participant list
//so user information stored in server can be accessed
function getParticipant(id){
    console.log("get Participants: ", participants)
    return participants.find(participant => participant.id === id);
}

function removeParticipantOnLeave(id){
    const participantInRoom = participants.findIndex(participant => participant.id === id);
    if(participantInRoom !== -1) return participants.splice(participantInRoom, 1)[0];
}

function getParticipntsInRoom(room){
    return participants.filter(participant => participant.room === room)
}

module.exports = {
    participantJoin,
    getParticipant,
    removeParticipantOnLeave,
    getParticipntsInRoom
};