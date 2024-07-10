const User = require("../schemas/UserSchema");
const Message = require("../schemas/MessageSchema");
// Handle sending a message
const handleMessage = async (socket, info, io) => {
  const { sender, recipient, msg, time } = info;
<<<<<<< HEAD
=======

>>>>>>> e067ce3a85e851d7c05bd414b9b9a171320e60b7
  try {
    // Find sender and recipient
    const senderUser = await User.findById(sender);
    const recipientUser = await User.findById(recipient);

    if (!senderUser || !recipientUser) {
<<<<<<< HEAD
      console.error("Sender or recipient not found");
=======
      console.error('Sender or recipient not found');
>>>>>>> e067ce3a85e851d7c05bd414b9b9a171320e60b7
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

    try {
      await newMessageSent.save();
      await newMessageReceived.save();
    } catch (err) {
<<<<<<< HEAD
      console.error("Error saving messages:", err);
    }

    // Find or create conversation between sender and recipient
    let senderConversation = senderUser.conversations.find((conv) =>
      conv.participant.equals(recipientUser._id)
    );
    let recipientConversation = recipientUser.conversations.find((conv) =>
      conv.participant.equals(senderUser._id)
    );
=======
      console.error('Error saving messages:', err);
    }
    
    // Find or create conversation between sender and recipient
    let senderConversation = senderUser.conversations.find(conv => conv.participant.equals(recipientUser._id));
    let recipientConversation = recipientUser.conversations.find(conv => conv.participant.equals(senderUser._id));
>>>>>>> e067ce3a85e851d7c05bd414b9b9a171320e60b7

    if (!senderConversation) {
      senderConversation = {
        participant: recipientUser._id,
<<<<<<< HEAD
        messages: [],
      };
      senderUser.conversations.push(senderConversation);
      await senderUser.save();
      let newsenderConversation = senderUser.conversations.find((conv) =>
        conv.participant.equals(recipientUser._id)
      );
      newsenderConversation.messages.push(newMessageSent);
=======
        messages: []
      };
      senderUser.conversations.push(senderConversation);
      await senderUser.save();
      let newsenderConversation = senderUser.conversations.find(conv => conv.participant.equals(recipientUser._id));
      newsenderConversation.messages.push(newMessageReceived);
>>>>>>> e067ce3a85e851d7c05bd414b9b9a171320e60b7
      await senderUser.save();
    }

    if (!recipientConversation) {
      recipientConversation = {
        participant: senderUser._id,
<<<<<<< HEAD
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
=======
        messages: []
      };
      recipientUser.conversations.push(recipientConversation);
      await recipientUser.save();
      let newrecipientConversation = recipientUser.conversations.find(conv => conv.participant.equals(senderUser._id));
      newrecipientConversation.messages.push(newMessageSent);
      await recipientUser.save();
    }
    // Add new message to conversations
    senderConversation.messages.push(newMessageReceived);
    recipientConversation.messages.push(newMessageSent);
>>>>>>> e067ce3a85e851d7c05bd414b9b9a171320e60b7

    await senderUser.save();
    await recipientUser.save();

    info.msgType = "received";

<<<<<<< HEAD
    io.to(recipientUser.socketid).emit("toReceiver", info);
  } catch (err) {
    console.error("Error handling message:", err);
=======
    io.emit("toReceiver", info);

  } catch (err) {
    console.error('Error handling message:', err);
>>>>>>> e067ce3a85e851d7c05bd414b9b9a171320e60b7
  }
};

module.exports = {
  handleMessage,
<<<<<<< HEAD
};
=======
};
>>>>>>> e067ce3a85e851d7c05bd414b9b9a171320e60b7
