const User = require("../schemas/UserSchema");
const authController = require("./authController");
const { handleMessage } = require("./handelMessage");
const { callHandeler } = require("./callHandeler");

const handleConnection = (socket, io) => {
  User.find()
    .populate({
      path: "conversations.messages",
      populate: { path: "sender recipient" },
    })
    .then((result) => {
      io.emit("get", result);
    });

  socket.on("auth", (info) => {
    authController.handleAuth(socket, info, io);
  });

  socket.on("msg", (info) => {
    handleMessage(socket, info, io);
  });

  socket.on("disconnect", async () => {
    try {
      await User.findOne({ socketid: socket.id }).then(async (user) => {
        user.online = false;
        await user.save();
      });
      User.find()
        .populate({
          path: "conversations.messages",
          populate: { path: "sender recipient" },
        })
        .then((result) => {
          io.emit("get", result);
        });
    } catch (error) {
      console.log("Error Updating");
    }
  });

  socket.on("makeCall", () => {
    callHandeler(socket, io);
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
};

module.exports = {
  handleConnection,
};
