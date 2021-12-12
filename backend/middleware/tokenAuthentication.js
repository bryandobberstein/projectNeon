require('dotenv').config();

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, nxt) => {
  const token =
    req.body.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send('Access denied');
  }
  try {
    const authenticated = jwt.verify(
      token,
      process.env.JWT_TOKEN
    );
    req.user = authenticated;
  } catch (error) {
    return res.status(401).send('Access denied');
  }
  return nxt;
};

module.exports = authenticateToken;
