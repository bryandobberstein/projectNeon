const express = require('express');
const validator = require('validator');

const Folder = require('../models/Folder');
const tokenVerify = require('../middleware/tokenVerify');

const router = express.Router();

//get folders
router.get('/getFolders', tokenVerify, async (req, res) => {
  try {
    const folders = await Folder.findOne({
      owner: req.user._id,
    });
    if (!folders) {
      return res.status(404);
    }
    res.status(200).json({ folders });
  } catch (err) {
    res.status(500);
  }
});

//create folder
router.post('/addFolder', tokenVerify, async (req, res) => {
  try {
    if (req.parent) {
      const folder = new Folder({
        title: req.body.title,
        position: req.body.position,
        parent: req.body.parent,
        owner: req.user,
      });
      await folder.save();
      return res.status(200);
    }
    const folder = new Folder({
      title: req.body.title,
      position: req.body.position,
      owner: req.user,
    });
    await folder.save();
    return res.status(200).json(folder);
  } catch (err) {
    return res.status(500);
  }
});

//update folder

router.put(
  '/updateFolder',
  tokenVerify,
  async (req, res) => {
    try {
      if (
        validator.isEmpty(req.title) ||
        validator.isEmpty(req.position) ||
        validator.isEmpty(req.link)
      ) {
        return res.status(400);
      } else if (
        !validator.isURL(req.link) ||
        !validator.isNumeric(req.position)
      ) {
        return res.status(400);
      }
      if (req.parent) {
        await Folder.findOneAndUpdate(
          { _id: req._id },
          {
            title: req.title,
            position: req.position,
            link: req.link,
            owner: req.user,
            parent: req.parent,
          }
        );
        return res.status(200);
      }
      awaitFolder.findOneAndUpdate(
        {
          _id: req._id,
        },
        {
          title: req.title,
          position: req.position,
          link: req.link,
          owner: req.user,
        }
      );
      return res.status(200);
    } catch (err) {
      res.status(500);
    }
  }
);

//delete folder

module.exports = router;
