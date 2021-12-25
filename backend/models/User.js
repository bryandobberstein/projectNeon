const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
      ref: 'Folder',
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
