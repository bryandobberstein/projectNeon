const { Router } = require('express');

const Folder = require('../models/Folder');

const folderRouter = Router();

const tokenCheck = (res, req, nxt) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ');
  if (token === null) {
    return res.status(401);
  }

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) {
      return res.status(403);
    }
    req.user = user;
    nxt();
  });
};

//folder create (post)
folderRouter.post('/folders', tokenCheck, (req, res) => {});
//folder delete (delete)
folderRouter.delete(
  '/folders',
  tokenCheck,
  (req, res) => {}
);
//folders get (get)
folderRouter.get('/folders', tokenCheck, (req, res) => {});
//folder edit (patch)
folderRouter.patch(
  '/folders',
  tokenCheck,
  (req, res) => {}
);

module.exports = folderRouter;
