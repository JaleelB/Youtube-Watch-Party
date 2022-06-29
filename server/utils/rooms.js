const rooms = {};

//Layout
/*
    Rooms
        --> room{
                --> participants
                --> videoDetails{
                                    --> currentVideoPlaying
                                    --> currentVideoTimestamp
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
    console.log("Rooms: ", rooms)
}

function addParticipantToRoom(roomID, participant){
    if(rooms[roomID]) 
        rooms[roomID].participants.push(participant);
    // console.log("room: ", roomID, " Participants Room: ",  rooms[roomID].participants)
}

function removeParticipantFromRoom(roomID){
    //
}

function getRoomParticipants(roomID){
    console.log(rooms[roomID].participants)
    return rooms[roomID].participants;
}

function getRoom(roomID){
    return rooms[roomID];
}

module.exports = {
    createRoom,
    addParticipantToRoom,
    getRoomParticipants,
    getRoom
}