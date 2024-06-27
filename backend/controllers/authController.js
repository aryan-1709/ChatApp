const User = require("../schemas/UserSchema");

const handleAuth = (socket, info, io) => {
  const [name, email] = info;
  console.log(name, email);

  // Check if user exists and create if not
  User.findOne({ email })
    .then(async (existingData) => {
      if (!existingData) {
        const newUser = new User({
          username: name,
          email,
          status: "student",
        });
        await newUser
          .save()
          .then(() => {
            // io.emit("state", "New User Created");
            console.log("New User Created");
          })
          .catch((err) => {
            console.error("Error saving new user:", err);
          });
      } else {
        console.log("User already exists");
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
