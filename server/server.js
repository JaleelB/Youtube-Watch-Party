const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const formatUserMessage = require('./utils/messageFormat')

app.use(cors());

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", //client is on different url so this specifies location of client
      methods: ["GET", "POST"], //specifies methods that cors should allow to go through to our client
    },
});

// const participants = {};

io.on('connection', (socket) => {

    console.log(`User ${socket.id} connected`);
    
    //welcome message to user
    socket.emit('system_message', 'You joined the party chat')

    //broadfcast to everyone when a user joins
    socket.broadcast.emit('system_message', 'User has joined chat')

    socket.on('disconnect', ()=>{
        // console.log(`${socket.id} has disconnected`)
        // delete participants[socket.id];
        io.emit('system_message',`User ${socket.id} has left the party`)
    })

    // socket.on('new_user', (name, room)=>{
    //     // participants[socket.id] = name;
    //     socket.join(room);
    //     socket.to(room).emit("user_connected", name);
    //     // socket.broadcast.emit("user_connected", name);
    // })

    socket.on('chat_message', (data)=>{
        // socket.broadcast.emit("receive_chat_message", data);
        io.emit("receive_chat_message", formatUserMessage(data));
    })
})

server.listen(process.env.PORT || 4000, () => {
    console.log("SERVER Is RUNNING");
});