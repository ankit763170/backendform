const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  LastName: String,
  email: String,
  MobileNum: String,
  project: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
