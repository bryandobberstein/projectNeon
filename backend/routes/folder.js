const express = require('express');

const Folder = require('../models/Folder');
const tokenVerify = require('../middleware/tokenVerify');

const router = express.Router();

router.post('/getFolders', tokenVerify, (req, res) => {
  res.status(200).json({ msg: 'success' });
});

module.exports = router;
