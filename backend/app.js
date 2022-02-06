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
  credentials: true,
  methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Content-Type'],
};

app.use(bp.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/user', userRoute);
app.use('/folders', folderRoute);
app.use('/link', linkRoute);

const runApp = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    app.listen(process.env.PORT);
  } catch (err) {
    console.error(err);
  }
};

runApp();
