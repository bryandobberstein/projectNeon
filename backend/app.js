require('dotenv').config();

const bp = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoute = require('./routes/user');
const folderRoute = require('./routes/folder');
const linkRoute = require('./routes/link');

const app = express();

app.use(bp.json());
app.use({
  origin: ['http://localhost'],
});

app.use('/user', userRoute);
app.use('/folders', folderRoute);
app.use('/link', linkRoute);

const runApp = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    app.listen(process.env.PORT);
  } catch (err) {
    console.log(err);
  }
};

runApp();
