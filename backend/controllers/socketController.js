const User = require("../schemas/UserSchema");
const authController = require("./authController");
const { handleMessage } = require("./handelMessage");


const handleConnection = (socket, io) => {
  // Emit data to the client when connected
  User.find().populate({
    path: 'conversations.messages',
    populate: { path: 'sender recipient' }
  }).then((result) => {
    io.emit("get", result);
  });

  // Handle authentication from client
  socket.on("auth", (info) => {
    authController.handleAuth(socket, info, io); // Pass `socket` to handleAuth
  });

  // Handle incoming messages from client
  socket.on("msg", (info) => {
    handleMessage(socket, info, io); // Pass `socket` to handleAuth
  });
//   socket.on("msg", require("./handelMessage").handleMessage);

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
};

module.exports = {
  handleConnection,
};
