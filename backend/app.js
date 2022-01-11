require('dotenv').config();

const bp = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/user');
const folderRoute = require('./routes/folder');
const linkRoute = require('./routes/link');

const app = express();

const whitelist = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:8000',
  'http://localhost:8000',
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(whitelist));
app.use(bp.json());
app.use(cookieParser());

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
