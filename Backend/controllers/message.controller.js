const Chats = require("../models/chat.model");
const Messages = require("../models/message.model");
const { getReceiverSocketId, io } = require("../socket/socket");

const sendMessage = async (req, res) => {
  try {
    const { messageContent } = req.body;
    const { id: receiver } = req.params;
    const sender = req.user._id;
    let chat = await Chats.findOne({
      participantsId: { $all: [sender, receiver] },
    });
    if (!chat) {
      chat = await Chats.create({
        participantsId: [sender, receiver],
      });
    }
    const message = await Messages.create({
      sender,
      receiver,
      messageContent,
    });

    // if we have multiple save operations then we can use
    // await Promise.all([chat.save(),message.save()])

    chat.messageId.push(message._id);
    const receiverSocketId = getReceiverSocketId(receiver);
    if (receiverSocketId) {
      // this is used to send messages to a specific client so i have used to first else message will send
      // to all the clients
      io.to(receiverSocketId).emit("newMessage", message);
    }
    await chat.save();
    res.status(201).json({
      message: "message created successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "error creating message",
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUserId = req.user._id;
    const messages = await Chats.findOne({
      participantsId: { $all: [id, loggedInUserId] },
    }).populate("messageId");

    res.json({
      messages,
    });
    console.log(chat, "chats");
    // const messages = chat.messageId;
  } catch (error) {}
};

module.exports = { sendMessage, getMessages };
