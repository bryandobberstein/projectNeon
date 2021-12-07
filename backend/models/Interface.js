const mongoose = require('mongoose');

const interfaceSchema = new mongoose.Schema();

const interfaceOption = new interfaceSchema({
  mode: String,
  user: User,
});

module.exports = mongoose.model(
  'interfaceOption',
  interfaceOption
);
