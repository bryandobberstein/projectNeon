const mongoose = require('mongoose');

const linkSchema = mongoose.Schema();

const Link = new linkSchema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
  },
});

module.exports = mongoose.model('Link', Link);
