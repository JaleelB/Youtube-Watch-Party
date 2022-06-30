const rooms = {};

//Layout
/*
    Rooms{
        --> room{
                --> participants
                --> videoDetails{
                                    --> currentVideoPlaying
                                    --> currentVideoTimestamp
                                }
                                
                }
        }
*/

function createRoom(roomID, videoPlaying){
    const newRoom = {
        participants: [],
        videoDetails: {
            currentVideoPlaying: videoPlaying || null,
            currentVideoTimestamp: ''
        }
    }
    rooms[roomID] = newRoom;
}

function addParticipantToRoom(roomID, participant){
    if(rooms[roomID]) 
        rooms[roomID].participants.push(participant);
}

function removeParticipantFromRoom(roomID, id){
    const participantInRoom = rooms[roomID].participants.findIndex(participant => participant.id === id);

    if(participantInRoom !== -1) rooms[roomID].participants.splice(participantInRoom, 1)[0];
    else { return null; }

    deleteRoom(roomID);

}

function getRoomParticipants(roomID){
    console.log("get Room Participants: ", rooms[roomID].participants)
    return rooms[roomID].participants;
}

function getRoom(roomID){
    return rooms[roomID];
}

function deleteRoom(roomID){
    if(roomID && rooms[roomID].participants.length === 0) delete rooms[roomID];
    console.log("Delete Rooms update: ", rooms[roomID])
}

module.exports = {
    createRoom,
    addParticipantToRoom,
    getRoomParticipants,
    getRoom,
    removeParticipantFromRoom
}