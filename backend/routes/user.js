const bcrypt = require('bcrypt');
const express = require('express');

const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const exists = await User.findOne({
      email: req.body.email,
    });
    if (exists) {
      res.status(400).send(false);
    }
    const pwHash = await bcrypt.hash(req.body.password, 15);
    const newUser = User({
      email: req.body.email.trim().toLowerCase(),
      password: pwHash,
    });
    const result = newUser.save();
    res.status(201).send(true);
  } catch (err) {
    console.error(err);
    res.status(500).send(false);
  }
});

module.exports = router;
