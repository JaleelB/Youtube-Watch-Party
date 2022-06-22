const participants = [];

//join participant to room
function participantJoin(id, username, room){

    const newParticipant = {
        id, 
        username, 
        room
    };

    participants.push(newParticipant);
    return newParticipant;
}

//finds and returns participant stored in participant list
//so user information stored in server can be accessed
function getParticipant(id){
    return participants.find(participant => participant.id === id);
}

modules.export = {
    participantJoin,
    getParticipant
};