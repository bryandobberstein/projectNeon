const express = require('express');
const validator = require('validator');

const Link = require('../models/Link');
const tokenVerify = require('../middleware/tokenVerify');

const router = express.Router();

//get links

router.get('/get-links', tokenVerify, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user }).sort('title');
    if (!links) {
      return res.status(404).send(false);
    }
    return res.status(200).json(links);
  } catch (err) {
    console.error(err);
    return res.status(500).send(false);
  }
});

//create link

router.post('/create-link', tokenVerify, async (req, res) => {
  try {
    if (!req.body.title || !req.body.url || !req.body.parent) {
      return res.status(400).send(false);
    }
    const link = new Link({
      title: req.body.title,
      url: req.body.url,
      position: req.body.position,
      parent: req.body.parent,
      owner: req.user,
    });
    await link.save();
    return res.status(200).json(link).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send(false).send();
  }
});

//update link

router.put('/update-link', tokenVerify, async (req, res) => {
  try {
    await Link.updateOne(
      { id: req.body._id },

      { $set: { title: req.body.title } },
      { $set: { position: req.body.position } },
      { $set: { url: req.body.url } },
      { $set: { folder: req.body.folder } },

      (err, link) => {
        if (err) return console.error(err);
        return res.status(200).json(link).send();
      }
    ).clone();
  } catch (err) {
    console.error(err);
    return res.status(500).send(false);
  }
});

//delete link

router.post('delete-link', tokenVerify, async (req, res) => {
  try {
    await Link.findOneAndDelete({
      owner: req.user,
      folder: req.body.folder,
      _id: req.body._id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send(false);
  }
});
module.exports = router;
