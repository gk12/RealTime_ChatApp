const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema(
  {
    participantsId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    messageId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Chats = mongoose.model("Chats", chatSchema);
module.exports = Chats;
