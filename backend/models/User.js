const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  provider: String,
  providerId: String,   
  email: String,
  photo: String
});

module.exports = mongoose.model('User', UserSchema);