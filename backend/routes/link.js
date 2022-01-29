const express = require("express");
const validator = require("validator");

const Link = require("../models/Link");
const tokenVerify = require("../middleware/tokenVerify");
const { default: isURL } = require("validator/lib/isURL");

const router = express.Router();

//get links

router.get("/get-links", tokenVerify, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user });
    if (!links) {
      return res.status(404).send(false);
    }
    return res.status(200).json(links);
  } catch (err) {
    console.log(err);
    return res.status(500).send(false);
  }
});

//create link

router.post("/create-link", tokenVerify, async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.title || !isURL(req.body.url) || !req.body.folder) {
      return res.status(400).send(false);
    }
    const link = new Link({
      title: req.body.title,
      url: req.body.url,
      position: req.body.position,
      folder: req.body.folder,
      owner: req.user,
    });
    await link.save();
    return res.status(200).json(link);
  } catch (err) {
    console.error(err);
    return res.status(500).send(false);
  }
});

//update link

router.put("/update-link", tokenVerify, async (req, res) => {
  try {
    await Link.updateOne(
      { id: req.body._id },

      { $set: { title: req.body.title } },
      { $set: { position: req.body.position } },
      { $set: { url: req.body.url } },
      { $set: { folder: req.body.folder } },

      (err, link) => {
        if (err) return console.log(err);
        return res.status(200).json(link);
      }
    ).clone();
  } catch (err) {
    console.log(err);
    return res.status(500).send(false);
  }
});

//delete link

router.post("delete-link", tokenVerify, async (req, res) => {
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
