const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema();

const gameSettings = new gameSchema({
  gameMode: {
    type: String,
  },
  score: {
    type: Number,
  },
  user: {
    type: User,
  },
});

module.exports = gameSettings;
