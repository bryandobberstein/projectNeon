const mongoose = require('mongoose');

const folderSchema = mongoose.Schema();

const Folder = new folderSchema({
  title: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  links: [
    [
      {
        title: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        position: {
          type: Number,
          required: true,
        },
      },
    ],
  ],
});
