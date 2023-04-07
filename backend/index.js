const express = require("express");

const app = express();
const cors = require("cors");
const http = require("http");
//importing Class Server
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection",(socket)=>{
    console.log("User Connected")
 
    socket.on("join_room",(data)=>[
        socket.join(data)
    ])
    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data)
    })


})

server.listen(8080,()=>{
    console.log("Server Running on port 8080")
})
