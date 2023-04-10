const express = require("express");

const app = express();
const cors = require("cors");
const http = require("http");
//importing Class Server
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://captainamerica.vercel.app",
    methods:"*",
  },
});

io.on("connection", (socket) => {
  console.log("User Connected");

  var roomName = ""; // roomName for the current user
  socket.on("join_room", (data) => {
    roomName = data;
    socket.join(data);
    const clients = io.sockets.adapter.rooms.get(roomName);

    if (clients && clients.size === 2) {
      // Both players are in the room, emit gameReady event to start the game
      io.to(roomName).emit("gameReady");
    } else {
      // Waiting for other player to join
      socket.emit("waitingForPlayer");
    }
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("send_scores", (data) => {
    console.log(data)
    socket.to(data.room).emit("receive_scores", data);
  });

  socket.on("disconnect", () => {
    const clients = io.sockets.adapter.rooms.get(roomName);
    if (clients && clients.size === 1) {
      // Only one player is left in the room, emit playerDisconnected event to the remaining player
      socket.to(roomName).emit("playerDisconnected");
    }
  });
});

server.listen(8080, () => {
  console.log("Server Running on port 8080");
});