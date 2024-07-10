const User = require("../schemas/UserSchema");

const handleAuth = (socket, info, io) => {
  const [name, email] = info;
  
  User.findOne({ email })
    .then(async (existingData) => {
      if (!existingData) {
        const newUser = new User({
          username: name,
          email,
          status: "student",
          online: true,
          socketid:socket.id
        });
        await newUser
          .save()
          .then(() => {
            console.log("New User Created");
          })
          .catch((err) => {
            console.error("Error saving new user:", err);
          });
      } else {
        existingData.online = true;
        existingData.socketid = socket.id;
        await existingData.save();
        console.log("User already exists", socket.id);
      }
      User.find()
        .populate({
          path: "conversations.messages",
          populate: { path: "sender recipient" },
        })
        .then((result) => {
          io.emit("get", result);
        });
      
    })
    .catch((err) => {
      console.error("Error checking user:", err);
    });
};

module.exports = {
  handleAuth,
};
