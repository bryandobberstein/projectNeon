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
  feed: {
    type: Feed,
  },
  interface: {
    type: [String],
  },
});

module.exports = mongoose.model('User', User);
