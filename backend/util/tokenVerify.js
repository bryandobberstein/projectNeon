require('dotenv').config;
const jwt = require('jsonwebtoken');

const generateToken = async user => {
  const token = await jwt.sign(
    { data: user },
    process.env.JWT_TOKEN,
    { expiresIn: 14000 }
  );
  return token;
};

const validateToken = (req, res, nxt) => {
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

module.exports = { generateToken, validateToken };
