const User = require("../schemas/UserSchema");
const authController = require("./authController");
const { handleMessage } = require("./handelMessage");
const { callHandeler } = require("./callHandeler");

const handleConnection = (socket, io) => {
<<<<<<< HEAD
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
=======
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
>>>>>>> e067ce3a85e851d7c05bd414b9b9a171320e60b7
        .populate({
          path: "conversations.messages",
          populate: { path: "sender recipient" },
        })
        .then((result) => {
          io.emit("get", result);
        });
<<<<<<< HEAD
      
    } catch (error) {
      console.log("Error Updating");
    }
  });

  socket.on("makeCall", () => {
    callHandeler(socket, io);
  });
=======
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
>>>>>>> e067ce3a85e851d7c05bd414b9b9a171320e60b7
};

module.exports = {
  handleConnection,
<<<<<<< HEAD
};
=======
};
>>>>>>> e067ce3a85e851d7c05bd414b9b9a171320e60b7
