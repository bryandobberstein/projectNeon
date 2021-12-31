const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  position: {
    type: Number,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  parent: {
    type: mongoose.Types.ObjectId,
    ref: 'Folder',
  },
});

module.exports = mongoose.model('Folder', FolderSchema);
