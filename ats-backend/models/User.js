const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  phone: String,
  linkedin: String,
  github: String,
  portfolio: String,
  resumeLink: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
