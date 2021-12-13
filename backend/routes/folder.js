const { Router } = require('express');

const authenticateToken = require('../middleware/tokenAuthentication');
const folderRouter = Router();

//folder create (post)
folderRouter.post(
  '/folders',
  authenticateToken,
  (req, res) => {}
);
//folder delete (delete)
folderRouter.delete(
  '/folders',
  authenticateToken,
  (req, res) => {}
);
//folders get (get)
folderRouter.get(
  '/folders',
  authenticateToken,
  (req, res) => {}
);
//folder edit (patch)
folderRouter.patch(
  '/folders',
  authenticateToken,
  (req, res) => {}
);

module.exports = folderRouter;
