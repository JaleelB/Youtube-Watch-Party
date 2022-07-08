const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const {formatUserMessage, formatSystemMessage} = require('./utils/messageFormat');
const {
    createParticipant, getParticipant,
    removeParticipantFromList
} = require('./utils/participants');
const {
    createRoom, getRoomParticipants,
    getRoom, removeParticipantFromRoom,
    updateRoomVideoTimeStamp, getRoomVideoPlaying,
    getRoomVideoTimeStamp, updateRoomVideoPlaying
} = require('./utils/rooms');

app.use(cors());

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", //client is on different url so this specifies location of client
      methods: ["GET", "POST"], //specifies methods that cors should allow to go through to our client
    },
});

io.on('connection', (socket) => {

    console.log(`User ${socket.id} connected`);

    socket.on('host_room', ({username, currentVideoPlaying}) => {
        const hostRoom = socket.handshake.query.id;
        createRoom(hostRoom, currentVideoPlaying);
        const host = createParticipant(socket.id, username, hostRoom, true);

        socket.join(hostRoom);

        //welcome message to user
        socket.emit('system_message', formatSystemMessage('You joined the party chat'))

        //broadfcast to everyone when a user joins≥
        socket.broadcast.to(hostRoom).emit('system_message', formatSystemMessage(`${host.username} has joined the party`))

        //sends current list of users in roo to client
        io.to(host.room).emit('room_information', {
            participantList: getRoomParticipants(host.room),
            currentVideoPlaying: getRoom(host.room).videoDetails.currentVideoPlaying
        })

    })

    
    socket.on('join_room', ({username, room, isHost}) => {

        //creates a new participant and adds them to list of participants to get participants in room
        const participant = createParticipant(socket.id, username, room, isHost);
        socket.join(participant.room);

        //welcome message to user
        socket.emit('system_message', formatSystemMessage('You joined the party chat'))

        //broadfcast to everyone when a user joins
        socket.broadcast.to(participant.room).emit('system_message', formatSystemMessage(`${username} has joined the party`))
        
        //sends current list of users in roo to client
        io.to(participant.room).emit('room_information', {
            participantList: getRoomParticipants(participant.room),
            currentVideoPlaying: getRoomVideoPlaying(participant.room)
        })

        io.to(participant.room).emit('video_pause_on_userJoin', { 
            playVideo: false
        })
        
    })
    

    socket.on('disconnect', ()=>{

        console.log(`User ${socket.id} disconnected`);

        const participant = removeParticipantFromList(socket.id);

        if(participant){

            removeParticipantFromRoom(participant.room, socket.id, io, socket);

            io.to(participant.room).emit('system_message', formatSystemMessage(`${participant.username} has left the party`))

            //sends current list of users in roo to client
            io.to(participant.room).emit('room_information', {
                participantList: getRoomParticipants(participant.room) ? getRoomParticipants(participant.room) : null,
                currentVideoPlaying: getRoomVideoPlaying(participant.room)
            })
        }

    })

    socket.on('chat_message', (data)=>{
        const participant = getParticipant(socket.id)
         if(participant) io.to(participant.room).emit("receive_chat_message", formatUserMessage(data));
    })

    socket.on("update_timeStamp_on_videoSeek", (data)=>{
        const participant = getParticipant(socket.id)

         if(participant){
             if(data.elapsedSeconds){
                updateRoomVideoTimeStamp(participant.room, data.elapsedSeconds)
            }

             io.to(participant.room).emit("receive_timeStamp_when_video_seeks", {timeStampAfterSeek: getRoomVideoTimeStamp(participant.room)});
         }
    })

    socket.on('pause_all_videos', (data)=>{
        const participant = getParticipant(socket.id)
        if(participant){
            io.to(participant.room).emit("receive_pause_all_videos", {
                playStatus: data.playVideo,
                currentTimeStamp: getRoomVideoTimeStamp(participant.room)
            });
            socket.to(participant.room).emit('system_message', formatSystemMessage(`${participant.username} paused the video`));
        }
        
    })

    socket.on('play_all_videos', (data)=>{
        const participant = getParticipant(socket.id)
        if(participant){
            io.to(participant.room).emit("receive_play_all_videos", {
                playStatus: data.playVideo,
                currentTimeStamp: getRoomVideoTimeStamp(participant.room)
            });
            socket.to(participant.room).emit('system_message', formatSystemMessage(`${participant.username} played the video`));
        }
    })

    socket.on('change_video_playing', (data)=>{
        const participant = getParticipant(socket.id)
        if(participant){
            updateRoomVideoPlaying(participant.room, data.newVideo);
            console.log("vid link new: ", data.newVideo)
            io.to(participant.room).emit("update_video_playing", {
                newVideo: getRoomVideoPlaying(participant.room)
            });
            socket.to(participant.room).emit('system_message', formatSystemMessage(`${participant.username} changed the video`));
        }
    })

    
})

server.listen(process.env.PORT || 4000, () => {
    console.log("SERVER Is RUNNING");
});