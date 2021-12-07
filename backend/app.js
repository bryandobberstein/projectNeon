const bp = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const connectionString = require('./database/db');

const app = express();

app.use(bp.json());
app.use(cors);

const PORT = process.env.port || 8000;

mongoose
  .connect(connectionString)
  .then(result => {
    console.log('Mongo is only pawn in game of life');
    app.listen(PORT, () => {
      if (PORT === 8000) {
        console.log(
          `api started on http://localhost:${PORT}`
        );
      } else {
        console.log(`api started on ${PORT}`);
      }
    });
  })
  .catch(err => {
    console.error(err);
  });
