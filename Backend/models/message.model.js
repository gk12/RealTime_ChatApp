const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    messageContent: {
      type: String,
    },
  },
  // it will create createdAt and updatedAt
  { timestamps: true }
);

const Messages = mongoose.model("Messages", messageSchema);
module.exports = Messages;
