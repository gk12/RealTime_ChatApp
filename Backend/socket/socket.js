const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["*","http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};
const userSocketMap = {}; //userId as socketId
io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  // here we get userId in query from frontend
  const userId = socket.handshake.query.userId;
  console.log(userId, "userID");
  // when userId is defined then store it in userSocketMap
  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }
  // this is used to send events to all the connected clients
  io.emit("onlineusers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("onlineusers", Object.keys(userSocketMap));
  });
});
module.exports = { app, io, server, getReceiverSocketId };
