const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  position: {
    type: Number,
  },
  owner: {
    type: String,
  },
  parent: {
    type: String,
  },
});

module.exports = mongoose.model('Folder', FolderSchema);
