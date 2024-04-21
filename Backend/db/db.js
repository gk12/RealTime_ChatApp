const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.DB_URL;

const database = async (cb) => {
  try {
    mongoose.connect(url);
    cb();
    console.log(`database connection established`);
  } catch (error) {
    console.log(error, 'error connecting to database');
  }
};

module.exports = database;
