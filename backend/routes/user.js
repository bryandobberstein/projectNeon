const bcrypt = require('bcrypt');
const env = require('dotenv').config;
const { Router } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const userRouter = Router();

//user signup (post)
userRouter.post('/userSignup', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const salt = await bcrypt.genSalt();
  const encrypted_pw = await bcrypt.hash(password, salt);
  const newUser = new User({
    email: email,
    password: encrypted_pw,
  });

  try {
    await newUser.save();
    res.status(200).json({
      message: `User account for ${email} created`,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
//user login (post)

userRouter.post('/userLogin', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  if (user === null) {
    res
      .status(400)
      .json({ error: `Unable to locate user: ${email}` });
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(
        user,
        process.env.JWT_TOKEN
      );
    }
  } catch (error) {
    res.status(500);
  }
});
//interface set (post)

module.exports = userRouter;
