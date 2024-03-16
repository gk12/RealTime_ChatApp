const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    profilePicture: {
      type: String,
      required: true,
    },
    hashPass: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
