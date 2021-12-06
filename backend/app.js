const bp = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(bp.json());
app.use(cors);

const PORT = process.env.port || 8000;

app.listen(PORT, () => {
  if (PORT === 8000) {
    console.log(`api started on http://localhost:${PORT}`);
  } else {
    console.log(`api started on ${PORT}`);
  }
});
