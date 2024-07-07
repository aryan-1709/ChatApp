const User = require("../schemas/UserSchema");
const authController = require("./authController");
const { handleMessage } = require("./handelMessage");
const { callHandeler } = require("./callHandeler");

const handleConnection = (socket, io) => {
  User.find().populate({
    path: 'conversations.messages',
    populate: { path: 'sender recipient' }
  }).then((result) => {
    io.emit("get", result);
  });

  socket.on("auth", (info) => {
    authController.handleAuth(socket, info, io); 
  });

  socket.on("msg", (info) => {
    handleMessage(socket, info, io); 
  });

  socket.on("disconnect", async () => {
    await User.findOne({socketid:socket.id}).then(async (user)=>{
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
  });

  socket.on("user_disconnect", msg => {
    console.log(msg);
  })

  socket.on("makeCall", () => {
    callHandeler(socket, io);
  })

  socket.on("notify", res => {
    console.log(res);
    io.to(res.toNotify.socketid).emit("userConnected", res.toNotify);
  })
};

module.exports = {
  handleConnection,
};