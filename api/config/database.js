const mongoose = require('mongoose');
const dev = require('.');

const connectDB = async () => {
  try {
    await mongoose.connect(dev.db.url);
    console.log('database connected!');
  } catch (error) {
    console.log('db is not connected');
    console.log(error);
  }
};
module.exports = connectDB;
