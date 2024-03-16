const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Schema = require("./TestSchema");
const cors = require("cors");
const MessageSchema = require("./MessageSchema");
const bodyParser = require("body-parser");

const url =
  "mongodb+srv://mern_reboot:mern_reboot@userdb.v8snhp1.mongodb.net/?retryWrites=true&w=majority&appName=UserDB";
app.use(cors());
app.use(bodyParser.json());

app.listen(5000, () => console.log("Running"));

mongoose.connect(url).then((results) => console.log("connected"));
const ind = 2;
app.post("/api/data", (req, res) => {
  const dataReceived = req.body; // Data sent from the client
  console.log("Data received:", dataReceived.id);
  // Process the data or send a response back to the client
  
  Schema.findOne({name: dataReceived.name}).then((result)=>{
    const obj = result.message[0];
  
    const messageCount = Object.keys(obj).length;
    console.log("Number of messages:", messageCount);

    console.log("messeges found",obj);
  })

  Schema.findOneAndUpdate(
    { name: dataReceived.name }, // Find the document with the given name
    {
      $set: { [`message.${ind}.id`]:dataReceived.id
      },
      $push: { [`message.${ind}.msgs`]: {  // Push a new message object to the "msgs" array inside the first message object
        message: dataReceived.message,
        messageType: dataReceived.messageType,
        time: dataReceived.time,
      }}
    },
    { new: true, upsert: true } // Options: return the updated document and create if it doesn't exist
  ).then((result) => {
    // console.log('Document updated successfully:', result.message[0]);
    Schema.find().then((result) => {
      app.get("/get", (req, res) => {
        res.send(result);
      });
    });
  }).catch((err) => {
    console.error('Error updating document:', err);
  });

  res.send("Data received successfully");
});

const data = new Schema({
  name: "Zoro",
  status: "syudent",
  curr: "Hay aryan",
});

Schema.findOne({name: data.name})
  .then(existingData => {
    if(!existingData){
      data.save();
    }
    else{
      console.log("already exist");
    }
  })
Schema.find().then((result) => {
  app.get("/get", (req, res) => {
    res.send(result);
  });

});
