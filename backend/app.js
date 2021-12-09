require('dotenv').config();
const bp = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(bp.json());
app.use(cors());

const PORT = process.env.PORT;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('Mongo is only pawn in game of life');
    app.listen(PORT, () => {
      console.log(`api started on ${PORT}`);
    });
  })
  .catch(err => {
    console.error(err);
  });
