require('dotenv').config();

const bp = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const userRoute = require('./routes/user');
const folderRouter = require('./routes/folder');

const app = express();

app.use(bp.json());

app.use('/user', userRoute);
app.use('/folders', folderRouter);

const runApp = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    app.listen(process.env.PORT);
  } catch (err) {
    console.log(err);
  }
};

runApp();
