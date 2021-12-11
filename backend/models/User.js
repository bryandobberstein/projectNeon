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
  folder: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Folder,
    },
  ],
  interface: {
    type: [String],
  },
});

module.exports = mongoose.model('User', User);
