const participants = [];

//join participant to room
function participantJoin(id, username, room, host){

    const newParticipant = {
        id, 
        username, 
        room,
        isHost: host || null
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

module.exports = {
    participantJoin,
    getParticipant
};