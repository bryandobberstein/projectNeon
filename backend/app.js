require('dotenv').config();
const bp = require('body-parser');
const cors = require('cors');
const express = require('express');

const { dbConnect } = require('./util/db');
const app = express();

app.use(bp.json());
app.use(cors());

const PORT = process.env.PORT;

dbConnect(() => {
  app.listen(PORT, () =>
    console.log(`Running on port:${PORT}`)
  );
});