const mongoose = require("mongoose");
const url =
  "mongodb+srv://boffin:boffin12@cluster0.ewpjqrp.mongodb.net/chat_socket";

const database = async (cb) => {
  try {
    mongoose.connect(url);
    cb();
    console.log(`database connection established`);
  } catch (error) {
    console.log(error, "error connecting to database");
  }
};

module.exports = database;
