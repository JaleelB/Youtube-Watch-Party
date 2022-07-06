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

        //in the event that the host leaves or is removed from party, a new host is assigned
        if(rooms[roomID].participants[participantInRoom] && rooms[roomID].participants[participantInRoom].isHost){
            const newHostIndex = generateRandomNumber(participantInRoom, rooms[roomID].participants.length);

            rooms[roomID].participants[newHostIndex] = {
                ...rooms[roomID].participants[newHostIndex], 
                isHost:true
            }

            io.to(roomID).emit('change_host_participant', {
                isHost: true,
                username: rooms[roomID].participants[newHostIndex].username
            })
            io.to(roomID).emit('system_message', formatSystemMessage(`${rooms[roomID].participants[newHostIndex].username} is now the new host`))
        }

        rooms[roomID].participants.splice(participantInRoom, 1)[0];   

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