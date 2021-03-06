const express = require('express');

const Folder = require('../models/Folder');
const Link = require('../models/Link');
const tokenVerify = require('../middleware/tokenVerify');

const router = express.Router();

//get folders
router.post('/getFolders', tokenVerify, async (req, res) => {
  try {
    const folders = await Folder.find({
      owner: req.user,
    }).sort('title');
    if (!folders) {
      return res.status(404).send();
    }
    return res.json(folders).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
});

//create folder
router.post('/addFolder', tokenVerify, async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).send(false).send();
    }
    const folder = new Folder({
      title: req.body.title,
      owner: req.user,
    });
    await folder.save();
    return res.status(200).json(folder).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: err }).send();
  }
});

//update folder

router.post('/updateFolder', tokenVerify, async (req, res) => {
  try {
    const folder = await Folder.findById(req.body._id);
    if (!folder) {
      return res.status(401).send('Not Found');
    }
    folder.title = req.body.title;
    folder.position = req.body.position;
    folder.save();
    return res.status(200).json(folder).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
});

//delete folder
router.post('/deleteFolder', tokenVerify, async (req, res) => {
  try {
    await Folder.findOneAndDelete({
      owner: req.user,
      _id: req.body._id,
    });
    await Link.deleteMany({ parent: req.body._id });
    return res.status(200).send(true);
  } catch (err) {
    console.error(err);
    return res.status(500).send(false);
  }
});

module.exports = router;
