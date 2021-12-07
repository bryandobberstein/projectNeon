const mongoose = require('mongoose');

const interfaceSchema = new mongoose.Schema();

const Interface = new interfaceSchema({
  mode: String,
  user: User,
});
