const express = require("express");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const Schema = require("./TestSchema");
const cors = require("cors");
const MessageSchema = require("./MessageSchema");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// io.on('connection', (socket)=>{
//   console.log("connected", socket.id)
//   socket.broadcast.emit("brodcast", socket.id);//message goes to other user than the current one
//   socket.emit("welcome", "Welcome Again"); //message goes to same user
//   socket.on("disconnect", ()=>{
//     console.log("user diconnected", socket.id);
//   })
//   socket.on("message",(m)=>{
//     console.log(m);
//     socket.broadcast.emit("receive", m);
//     io.to(m.id).emit("receive", data);
//   })

// });

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("check");
});

const url =
  "mongodb+srv://mern_reboot:mern_reboot@userdb.v8snhp1.mongodb.net/?retryWrites=true&w=majority&appName=UserDB";

server.listen(5000, () => {
  console.log("server started");
});
// app.listen(5000, () => console.log("Running"));

mongoose.connect(url).then((results) => console.log("connected"));


io.on("connection", (socket) => {
  console.log("New Socket Connected", socket.id);

  socket.on("reconnect", (attemptNumber) => {
    console.log("Reconnected after %d attempts", attemptNumber);
  });

  Schema.find().then((result) => {
    socket.emit("get", result);
    // app.get("/get", (req, res) => {
    //   res.send(result);
    // });
  });

  socket.on("auth", (info) => {
    const dataReceived = info.user; 
    console.log(dataReceived.uid)
    const data = new Schema({
      _id: dataReceived.uid,
      name: dataReceived.displayName,
      status: "student",
    });
    console.log(data._id);
    Schema.findOne({ _id: data._id }).then((existingData) => {
      if (!existingData) {
        data.save();
        console.log("Created User");
      } else {
        console.log("already exists");
      }
    });
  });

  socket.on("msg", (msg)=>{
    const dataReceived = msg; // Data sent from the client
    console.log("data received", msg)
    console.log("Data received:", dataReceived.id);
    
    Schema.findOneAndUpdate(
      { name: dataReceived.name }, // Find the document with the given name
      {
        $set: { [`message.0.id`]:dataReceived.id
        },
        $push: { [`message.0.msgs`]: { 
          message: dataReceived.message,
          messageType: dataReceived.messageType,
          time: dataReceived.time,
        }}
      },
      { new: true, upsert: true } 

    ).then((result) => {
      Schema.find().then((result) => {
        app.get("/get", (req, res) => {
          res.send(result);
        });
      });
    }).catch((err) => {
      console.error('Error updating document:', err);
    });
  })

});