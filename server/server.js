const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", //client is on different url so this specifies location of client
      methods: ["GET", "POST"], //specifies methods that cors should allow to go through to our client
    },
});

// io.on('connection', (socket) => {

//     console.log(`User ${socket.id} connected`);

//     socket.on('disconnect', () => {
//       console.log(`User ${socket.id} disconnected`);
//     });

//     socket.on('send_message', (data) => {
//         socket.broadcast.emit("receive_message", data);
//     })
// });

io.on('connection', (socket) => {

    console.log(`User ${socket.id} connected`);

    socket.on('disconnect', ()=>{
        console.log(`User ${socket.id} disconnected`);
    })

    socket.on('send_message', (data)=>{
        console.log(data.message);
        socket.broadcast.emit("receive_message", data);
    })
})

server.listen(4000, () => {
    console.log("SERVER Is RUNNING");
});