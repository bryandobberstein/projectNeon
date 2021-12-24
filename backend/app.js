require('dotenv').config();
const bp = require('body-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const express = require('express');

const { dbConnect } = require('./util/db');
const app = express();

app.use(bp.json());
app.use(cors());
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.KEY1, process.env.KEY2],
    maxAge: 24 * 3600000,
  })
);

const PORT = process.env.PORT;

dbConnect(() => {
  app.listen(PORT, () =>
    console.log(`Running on port:${PORT}`)
  );
});
