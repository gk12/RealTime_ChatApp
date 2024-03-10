const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
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
  },
  hashPass: {
    type: String,
  },
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
