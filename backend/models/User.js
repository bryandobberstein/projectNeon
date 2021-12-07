const mongoose = require('mongoose');

const userSchema = mongoose.Schema();

const User = new userSchema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  scoreHistory: {
    type: Array,
  },
  weakspot: {
    type: Array,
  },
  game: {
    type: gameSettings,
  },
  interface: {
    type: Interface,
  },
});

module.exports = User;
