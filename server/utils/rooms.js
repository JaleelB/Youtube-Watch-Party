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
    if(rooms[roomID] && rooms[roomID].participants.length !== 0){
        console.log("get Room Participants: ", rooms[roomID].participants)
        return rooms[roomID].participants;
    }
    return null;
}

function getRoom(roomID){
    if(rooms[roomID]) return rooms[roomID];

    return null;
}

function deleteRoom(roomID){
    if(roomID && rooms[roomID].participants.length === 0) delete rooms[roomID];
    console.log("Delete Rooms update: ", rooms[roomID])
}

function updateRoomVideoTimeStamp(roomID, timeStamp){
    if(rooms[roomID]){
        rooms[roomID].videoDetails.currentVideoTimestamp = timeStamp;
        console.log("Updated TimeStamp: ", rooms[roomID].videoDetails.currentVideoTimestamp);
    }
}

function getRoomVideoTimeStamp(roomID){
    
    if(rooms[roomID]){
        console.log("get room timestamp: ", rooms[roomID].videoDetails.currentVideoTimestamp);
        return rooms[roomID].videoDetails.currentVideoTimestamp;
    }
    return null;
}

module.exports = {
    createRoom,
    addParticipantToRoom,
    getRoomParticipants,
    getRoom,
    removeParticipantFromRoom,
    updateRoomVideoTimeStamp,
    getRoomVideoTimeStamp
}