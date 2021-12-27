require('dotenv').config();

const bp = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoSession = require('connect-mongodb-session')(
  session
);
const userRoute = require('./routes/user');

const app = express();
const sessionStore = mongoSession({
  uri: process.env.DB_URI,
  collection: 'sessions',
});

app.use(bp.json());
app.use(
  session({
    secret: process.env.KEY1,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 },
    store: sessionStore,
  })
);
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
