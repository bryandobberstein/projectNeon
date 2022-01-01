const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
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
  },
  folder: {
    type: String,
  },
});

module.exports = mongoose.model('Link', LinkSchema);
