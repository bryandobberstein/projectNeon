const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
  },
  link: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Link',
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Folder', FolderSchema);
