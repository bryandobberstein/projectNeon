require('dotenv').config();
const tokenVerify = require('../middleware/tokenVerify');

const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  if (!validator.isEmail(email)) {
    return res.status(406).send();
  }
  if (req.body.password !== req.body.verifyPW) {
    return res.status(400).send();
  }
  try {
    const exists = await User.findOne({
      email: email,
    });
    if (exists) {
      return res.status(403).send();
    }
    const pwHash = await bcrypt.hash(req.body.password, 15);
    const newUser = User({
      email: email,
      password: pwHash,
    });
    const user = await newUser.save();
    const token = await jwt.sign({ user: user._id }, process.env.JWT_TOKEN, {
      expiresIn: 24 * 3600,
    });
    return res
      .status(200)
      .cookie('token', token, {
        expire: 2400 * 3600,
        httpOnly: true,
        sameSite: 'strict',
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post('/authenticate', async (req, res) => {
  try {
    const email = req.body.email.trim();
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      return res.status(403).send();
    }
    const passwordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordValid) {
      return res.status(403).send();
    }
    const token = await jwt.sign({ user: user._id }, process.env.JWT_TOKEN, {
      expiresIn: 24 * 3600,
    });
    return res
      .cookie('token', token, {
        maxAge: 2400 * 3600,
        httpOnly: true,
        sameSite: 'strict',
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send(false);
  }
});

router.post('/logout', tokenVerify, (req, res) => {
  return res.clearCookie('token').status(200).send();
});

module.exports = router;
