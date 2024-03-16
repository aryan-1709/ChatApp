const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    id:{
        type:String,
        required:true
    },
    msg:{
        type: String,
        required: true,
    },
    msgType:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }
},{timestamps: true})

const model = mongoose.model("Messages", MessageSchema);

module.exports = model;