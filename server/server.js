const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const {formatUserMessage, formatSystemMessage} = require('./utils/messageFormat');

app.use(cors());

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", //client is on different url so this specifies location of client
      methods: ["GET", "POST"], //specifies methods that cors should allow to go through to our client
    },
});

// const participants = {};

io.on('connection', (socket) => {

    const id  = socket.handshake.query.id;
    // socket.join(id)

    console.log(`User ${socket.id} connected`);
    console.log(formatSystemMessage(`User ${socket.id} has left the party`))
    
    //welcome message to user
    socket.emit('system_message', formatSystemMessage('You joined the party chat'))

    //broadfcast to everyone when a user joins
    socket.broadcast.emit('system_message', formatSystemMessage('User has joined chat'))

    socket.on('disconnect', ()=>{
        // console.log(`${socket.id} has disconnected`)
        // delete participants[socket.id];
        io.emit('system_message', formatSystemMessage(`User ${socket.id} has left the party`))
    })

    socket.on('chat_message', (data)=>{
        // socket.broadcast.emit("receive_chat_message", data);
        console.log(formatUserMessage(data))
        io.emit("receive_chat_message", formatUserMessage(data));
    })
})

server.listen(process.env.PORT || 4000, () => {
    console.log("SERVER Is RUNNING");
});