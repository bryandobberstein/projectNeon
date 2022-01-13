require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).send();
    }
    const decoded = await jwt.verify(
      token,
      process.env.JWT_TOKEN
    );
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};
