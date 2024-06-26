const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    // sender: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
    // recipient: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
    msg: {
        type: String,
        required: true,
    },
    msgType: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        default: Date.now,
    }
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const MessageSchema = new Schema({
//     sender: {
//         id: String,
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         // required: true,
//     },
//     recipient: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         // required: true,
//     },
//     msg: {
//         type: String,
//         required: true,
//     },
//     msgType: {
//         type: String,
//         required: true,
//     },
//     time: {
//         type: String,
//         // default: Date.now,
//     }
// }, { timestamps: true });

// const Message = mongoose.model('Message', MessageSchema);

// module.exports = Message;
