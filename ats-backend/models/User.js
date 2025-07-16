const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['applicant', 'recruiter'],
      default: 'applicant',
    },

    phone: {
      type: String,
    },

    linkedin: {
      type: String,
    },

    github: {
      type: String,
    },

    portfolio: {
      type: String,
    },

    resumeLink: {
      type: String, // Or use resumeFile: { type: String } if storing uploaded file path
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
