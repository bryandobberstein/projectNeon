const bp = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');

const app = express();

if (app.get('env') === 'development') {
  require('dotenv').config();
}

app.use(bp.json());
app.use(userRoute);

const runApp = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    app.listen(process.env.PORT);
  } catch (err) {
    console.log(err);
  }
};

runApp();
