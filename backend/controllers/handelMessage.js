const User = require("../schemas/UserSchema");
const Message = require("../schemas/MessageSchema");
// Handle sending a message
const handleMessage = async (socket, info, io) => {
  const { sender, recipient, msg, time } = info;
  try {
    // Find sender and recipient
    const senderUser = await User.findById(sender);
    const recipientUser = await User.findById(recipient);

    if (!senderUser || !recipientUser) {
      console.error("Sender or recipient not found");
      return;
    }

    // Create new message
    const newMessageSent = new Message({
      msg,
      msgType: "sent",
      time,
    });

    const newMessageReceived = new Message({
      msg,
      msgType: "received",
      time,
    });

    // Find or create conversation between sender and recipient
    let senderConversation = senderUser.conversations.find((conv) =>
      conv.participant.equals(recipientUser._id)
    );
    let recipientConversation = recipientUser.conversations.find((conv) =>
      conv.participant.equals(senderUser._id)
    );

    if (!senderConversation) {
      senderConversation = {
        participant: recipientUser._id,
        messages: [],
      };
      senderUser.conversations.push(senderConversation);
      await senderUser.save();
      let newsenderConversation = senderUser.conversations.find((conv) =>
        conv.participant.equals(recipientUser._id)
      );
      newsenderConversation.messages.push(newMessageSent);
      await senderUser.save();
    }

    if (!recipientConversation) {
      recipientConversation = {
        participant: senderUser._id,
        messages: [],
      };
      recipientUser.conversations.push(recipientConversation);
      await recipientUser.save();
      let newrecipientConversation = recipientUser.conversations.find((conv) =>
        conv.participant.equals(senderUser._id)
      );
      newrecipientConversation.messages.push(newMessageReceived);
      await recipientUser.save();
    }
    // Add new message to conversations
    senderConversation.messages.push(newMessageSent);
    recipientConversation.messages.push(newMessageReceived);

    await senderUser.save();
    await recipientUser.save();

    info.msgType = "received";

    io.to(recipientUser.socketid).emit("toReceiver", info);
  } catch (err) {
    console.error("Error handling message:", err);
  }
};

module.exports = {
  handleMessage,
};
