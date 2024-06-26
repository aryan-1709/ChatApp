const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const User = require("./schemas/UserSchema"); // Adjust the path to your User schema
const Message = require("./schemas/MessageSchema"); // Adjust the path to your Message schema
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 3000;
const URL = process.env.URL;

// Connect to MongoDB
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error", err));

app.use(bodyParser.json());

// Example route to check if server is running
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("New Socket Connected:", socket.id);

  // Emit data to the client when connected
  User.find().populate({
    path: 'conversations.messages',
    populate: { path: 'sender recipient' }
  }).then((result) => {
    socket.emit("get", result);
  });

  // Handle authentication from client
  socket.on("auth", (info) => {
    const dataReceived = info;
    console.log(dataReceived[0], " ", dataReceived[1]);

    // Check if user exists and create if not
    User.findOne({ email: dataReceived[1] }).then((existingData) => {
      if (!existingData) {
        const newUser = new User({
          username: dataReceived[0],
          email: dataReceived[1],
          status: "student",
        });
        newUser.save();
        socket.emit("state", "New User Created")
        console.log("New User Created");
      } else {
        socket.emit("state", "User already exists")
        console.log("User already exists");
      }
    }).catch((err) => {
      console.error('Error checking user:', err);
    });
  });

  // Handle incoming messages from client
  socket.on("msg", async (msg) => {
    const dataReceived = msg;
    console.log(dataReceived);

    try {
      // Find the sender and recipient users
      const sender = await User.findById(dataReceived.sender);
      const recipient = await User.findById(dataReceived.recipient);

      // const sender = await User.findOne({ _id: dataReceived.sender});
      // const recipient = await User.findOne({ _id: dataReceived.recipient });

      if (!sender || !recipient) {
        console.error('Sender or recipient not found');
        return;
      }

      // Create a new message
      const newMessage = new Message({
        msg: dataReceived.msg,
        msgType: dataReceived.msgType,
        time: dataReceived.time,
      });

      await newMessage.save();

      // Find or create a conversation between the sender and recipient
      let senderConvo = sender.conversations.find(convo => convo.participant.equals(recipient._id));
      let recipientConvo = recipient.conversations.find(convo => convo.participant.equals(sender._id));

      if (!senderConvo) {
        senderConvo = {
          participant: recipient._id,
          messages: []
        };
        sender.conversations.push(senderConvo);
      }

      if (!recipientConvo) {
        recipientConvo = {
          participant: sender._id,
          messages: []
        };
        recipient.conversations.push(recipientConvo);
      }
      // Add the new message to both conversations
      senderConvo.messages.push(newMessage);
      recipientConvo.messages.push(newMessage);

      await sender.save();
      await recipient.save();

      // Emit updated data to all clients after update
      const allUsers = await User.find().populate({
        path: 'conversations.messages',
        populate: { path: 'sender recipient' }
      });

      io.emit("getData", allUsers); // Emit to all connected clients
    } catch (err) {
      console.error('Error updating document:', err);
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




// const express = require("express");
// const app = express();
// const http = require("http");
// const mongoose = require("mongoose");
// const Schema = require("./schemas/UserSchema"); // Assuming UserSchema is defined in "UserSchema.js"
// const bodyParser = require("body-parser");
// const { Server } = require("socket.io");
// require('dotenv').config();

// // Now you can use process.env to access your environment variables
// const dbHost = process.env.DB_HOST;
// const dbUser = process.env.DB_USER;
// const dbPass = process.env.DB_PASS;

// // Example usage
// console.log(`Connecting to database at ${dbHost} with user ${dbUser}`);


// app.use(bodyParser.json());

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// const PORT = process.env.PORT || 3000;
// const URL = process.env.URL
// // Connect to MongoDB
// mongoose.connect(URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Connection Error", err));

// // Example route to check if server is running
// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

// // Socket.io connection handling
// io.on("connection", (socket) => {
//   console.log("New Socket Connected:", socket.id);

//   // Emit data to the client when connected
//   Schema.find().then((result) => {
//     socket.emit("get", result);
//     // console.log(result)
//   });

//   // Handle authentication from client
//   socket.on("auth", (info) => {
//     const dataReceived = info;
//     console.log(dataReceived[0], " ", dataReceived[1]); 

//     // Check if user exists and create if not
//     Schema.findOne({ email: dataReceived[1] }).then((existingData) => {
//       if (!existingData) {
//         const newData = new Schema({
//           // _id: dataReceived.uid,
//           username: dataReceived[0],
//           email: dataReceived[1],
//           status: "student",
//         });
//         newData.save();
//         socket.emit("state", "New User Created")
//         console.log("New User Created");
//       } else {
//         socket.emit("state", "User already exists")
//         console.log("User already exists");
//       }
//     }).catch((err) => {
//       console.error('Error checking user:', err);
//     });
//   });

//   // Handle incoming messages from client
//   socket.on("msg", (msg) => {
//     const dataReceived = msg;
//     console.log(dataReceived)
//     // Update or create a document in MongoDB
//     Schema.findOneAndUpdate(
//       { username: dataReceived.username },
//       {
//         $set: { [`messages.${dataReceived.sender}.id`]: dataReceived.sender },
//         $push: {
//           [`messages.${dataReceived.sender}.msgs`]: {
//             msg: dataReceived.msg,
//             msgType: dataReceived.msgType,
//             time: dataReceived.time,
//           },
//         },
//       },
//       { new: true, upsert: true }
//     ).then(() => {
//       // Emit updated data to all clients after update
//       Schema.find().then((result) => {
//         io.emit("getData", result); // Emit to all connected clients
//       });
//     }).catch((err) => {
//       console.error('Error updating document:', err);
//     });
//   });

//   // Handle disconnect
//   socket.on("disconnect", () => {
//     console.log(`Socket disconnected: ${socket.id}`);
//   });
// });

// // Start server
// server.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
