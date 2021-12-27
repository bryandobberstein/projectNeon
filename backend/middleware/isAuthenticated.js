module.exports = (req, res, next) => {
  if (!req.session.authenticated) {
    return res.status(500).false;
  }
  next();
};
