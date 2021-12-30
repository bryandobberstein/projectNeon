require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(403).send(false);
    }
    const { user } = await jwt.verify(
      token,
      process.env.JWT_TOKEN,
      err => {
        if (err) {
          return res.status(401).send(false);
        }
        req.user = user;
        next();
      }
    );
  } catch (err) {
    console.error(err);
    res.status(403).send(false);
  }
};
