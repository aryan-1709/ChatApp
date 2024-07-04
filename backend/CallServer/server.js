const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods:['GET', 'POST']
  },
});

io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded");
    })

    socket.on("callUser", (data) => {
        console.log("Calling in progress");
        console.log({userId:data.userToCall, from:data.from, name:data.name })
        io.to(data.userToCall).emit("callUser", {signal:data.signalData, from:data.from, name:data.name});
    })

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
    })
})

server.listen(5000, () => console.log("Server Started"));