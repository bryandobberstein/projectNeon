const mongoose = require('mongoose');

const feedSchema = mongoose.Schema();

const Feed = new feedSchema({});

module.exports = mongoose.model('Feed', Feed);
