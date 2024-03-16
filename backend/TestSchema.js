const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Messages = require('./MessageSchema');


const MessageSchema = new Schema({
    id:{
        type:String,
        required:true
    },
    msgs:[{
        message:{
            type: String,
            required: true,
        },
        messageType:{
            type:String,
            required:true
        },
        time:{
            type:String,
            required:true
        }
    }]
})


const testSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    status:{
        type:String,
        required: true
    },
    curr:{
        type: String,
        required: true
    },
    message:[{
        type:MessageSchema
    }]   
},{timestamps: true})

const model = mongoose.model("UserDB", testSchema);

module.exports = model;