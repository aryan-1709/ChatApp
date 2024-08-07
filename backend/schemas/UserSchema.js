const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Message = require("./MessageSchema");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        // required: true,
    },
    conversations: [{
        participant: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        messages: [Message.schema]
    }],     
    status: {
        type: String,
        required: true,
    },
    curr: {
        type: String,
    },
    online:{
        type: Boolean,
        default:false
    },
    socketid:{
        type:String,
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const MessageSchema = require('./MessageSchema');

// const UserSchema = new Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         // required: true,
//     },
//     messages: [{
//         type: Schema.Types.ObjectId,
//         ref: 'Message',
//     }],
//     status: {
//         type: String,
//         // required: true,
//     },
//     curr: {
//         type: String,
//     }
// }, { timestamps: true });

// const User = mongoose.model('User', UserSchema);

// module.exports = User;
