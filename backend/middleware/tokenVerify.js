require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(403).send(false);
    }
    const decoded = await jwt.verify(
      token,
      process.env.JWT_TOKEN
    );
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(403).send(false);
  }
};
