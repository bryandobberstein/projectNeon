const User = require('../models/User');
const bcrypt = require('bcrypt');
const env = require('dotenv').config;
const { Router } = require('express');
const jwt = require('jsonwebtoken');

const authenticateToken = require('../middleware/tokenAuthentication');
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
  const user = await User.find(email);
  if (user === null) {
    res
      .status(400)
      .json({ error: `Unable to locate user: ${email}` });
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_TOKEN,
        { expiresIn: '1h' }
      );
    }
    user.token = accessToken;
    res.status(200).send('Successfully created');
  } catch (error) {
    res.status(500);
  }
});
//interface set (post)

userRouter.post(
  '/updateInterface',
  authenticateToken,
  async (req, res) => {
    const interface = req.body.interface;
    const email = req.body.email;
    try {
      const result = await User.updateInterface(
        email,
        interface
      );
      if (!result) {
        return res.status(500).send('Update failed');
      }
      res.status(200).send('Success');
    } catch (err) {
      console.error(err);
      res.status(500).send('Sever error');
    }
  }
);

module.exports = userRouter;
