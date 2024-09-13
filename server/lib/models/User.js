const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'user' // other options: 'admin', 'editor'
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
