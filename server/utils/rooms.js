const {generateRandomNumber} = require('./helper');
const {formatSystemMessage} = require('./messageFormat');
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
            currentVideoTimestamp: 0
        }
    }
    rooms[roomID] = newRoom;
}

function addParticipantToRoom(roomID, participant){
    if(rooms[roomID]) 
        rooms[roomID].participants.push(participant);
}

function removeParticipantFromRoom(roomID, id, io){
    const participantInRoom = rooms[roomID].participants.findIndex(participant => participant.id === id);

    if(participantInRoom !== -1){

        let hostHasBeenRemoved;

        if(rooms[roomID].participants[participantInRoom] && rooms[roomID].participants[participantInRoom].isHost){
            hostHasBeenRemoved = true;
        }

        rooms[roomID].participants.splice(participantInRoom, 1)[0];   

        //in the event that the host leaves or is removed from party, a new host is assigned
        if(hostHasBeenRemoved && rooms[roomID].participants.length > 0){

            rooms[roomID].participants[0] = {
                ...rooms[roomID].participants[0], 
                isHost:true
            }

            io.to(roomID).emit('change_host_participant', {
                isHost: true,
                username: rooms[roomID].participants[0].username
            })
            io.to(roomID).emit('system_message', formatSystemMessage(`${rooms[roomID].participants[0].username} is now the new host`))
        }

    }
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
    if(rooms[roomID] && timeStamp){
        rooms[roomID].videoDetails.currentVideoTimestamp = timeStamp; 
        console.log("Updated Video TimeStamp: ", timeStamp)  
    }
}

function getRoomVideoTimeStamp(roomID){
    
    if(rooms[roomID]){
        return rooms[roomID].videoDetails.currentVideoTimestamp;
    }
    return null;
}

function updateRoomVideoPlaying(roomID, videoURL){
    if(rooms[roomID] && videoURL){
        rooms[roomID].videoDetails.currentVideoPlaying = videoURL;   
    }
}

function getRoomVideoPlaying(roomID){
    if(rooms[roomID]) return rooms[roomID].videoDetails.currentVideoPlaying;   
    
    return null;
}

module.exports = {
    createRoom,
    addParticipantToRoom,
    getRoomParticipants,
    getRoom,
    removeParticipantFromRoom,
    updateRoomVideoTimeStamp,
    getRoomVideoTimeStamp,
    updateRoomVideoPlaying,
    getRoomVideoPlaying
}