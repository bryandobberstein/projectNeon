require('dotenv').config();
const bp = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');

const server = express();

server.use(bp.json());
server.use(userRoute);

const runServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    server.listen(process.env.PORT);
  } catch (err) {
    console.log(err);
  }
};

runServer();
