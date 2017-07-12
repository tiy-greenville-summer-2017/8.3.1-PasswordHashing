
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: {
    type: Object,
    iterations: Number,
    salt: String,
    hash: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
