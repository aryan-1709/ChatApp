const callHandeler = ({socket, io}) => {
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
}

module.exports = {
    callHandeler,
};