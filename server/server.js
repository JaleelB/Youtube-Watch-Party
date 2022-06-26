const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const {formatUserMessage, formatSystemMessage} = require('./utils/messageFormat');
const {
    participantJoin, getParticipant,
    removeParticipantOnLeave, getParticipntsInRoom
} = require('./utils/participants');

app.use(cors());

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", //client is on different url so this specifies location of client
      methods: ["GET", "POST"], //specifies methods that cors should allow to go through to our client
    },
});

io.on('connection', (socket) => {

    console.log(`User ${socket.id} connected`);

    // const hostRoom = socket.handshake.query.id;
    // socket.join(hostRoom); 
    // socket.emit('system_message', formatSystemMessage('You joined the party chat')) 

    socket.on('host_room', ({username}) => {

        const hostRoom = socket.handshake.query.id;
        const host = participantJoin(socket.id, username, hostRoom, true);
        socket.join(hostRoom);

        //welcome message to user
        socket.emit('system_message', formatSystemMessage('You joined the party chat'))

        //broadfcast to everyone when a user joins≥
        socket.broadcast.to(hostRoom).emit('system_message', formatSystemMessage(`${host.username} has joined the party`))

        //sends current list of users in roo to client
        io.to(host.room).emit('room_participants', {
            participantList: getParticipntsInRoom(host.room)
        })

    })

    
    socket.on('join_room', ({username, room, isHost}) => {

        //creates a new participant and adds them to list of participants to get participants in room
        const participant = participantJoin(socket.id, username, room, isHost);
        socket.join(participant.room);

        //welcome message to user
        socket.emit('system_message', formatSystemMessage('You joined the party chat'))

        //broadfcast to everyone when a user joins≥
        socket.broadcast.to(participant.room).emit('system_message', formatSystemMessage(`${username} has joined the party`))
        
        //sends current list of users in roo to client
        io.to(participant.room).emit('room_participants', {
            participantList: getParticipntsInRoom(participant.room)
        })
    })
    

    socket.on('disconnect', ()=>{
        const participant = removeParticipantOnLeave(socket.id)
        console.log("remove participant: ", participant)
        if(participant){
            io.to(participant.room).emit('system_message', formatSystemMessage(`${participant.username} has left the party`))

            //sends current list of users in roo to client
            io.to(participant.room).emit('room_participants', {
                participantList: getParticipntsInRoom(participant.room)
            })
        }
    })

    socket.on('chat_message', (data)=>{
        // console.log("socket: ", socket.id)
        const participant = getParticipant(socket.id)
        console.log("participant: ", participant)
        io.to(participant.room).emit("receive_chat_message", formatUserMessage(data));
    })
})

server.listen(process.env.PORT || 4000, () => {
    console.log("SERVER Is RUNNING");
});