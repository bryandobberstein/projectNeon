require('dotenv').config();

const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  if (!validator.isEmail(email)) {
    res.status(406).send(false);
  }
  try {
    const exists = await User.findOne({
      email: email,
    });
    if (exists) {
      return res.status(400).send(false);
    }
    const pwHash = await bcrypt.hash(req.body.password, 15);
    const newUser = User({
      email: email,
      password: pwHash,
    });
    await newUser.save();
    res.status(201).send(true);
  } catch (err) {
    console.error(err);
    res.status(500).send(false);
  }
});

router.post('/authenticate', async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  try {
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      return res.status(403).send(false);
    }
    const passwordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordValid) {
      return res.status(403).send(false);
    }
    const token = await jwt.sign(
      { user: user._id },
      process.env.JWT_TOKEN,
      { expiresIn: 4 * 3600 }
    );
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send(false);
  }
});

router.post('/logout', (req, res) => {
  res.status(200).send(true);
});

module.exports = router;
