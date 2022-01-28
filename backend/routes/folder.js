const express = require("express");

const Folder = require("../models/Folder");
const Link = require("../models/Link");
const tokenVerify = require("../middleware/tokenVerify");

const router = express.Router();

//get folders
router.post("/getFolders", tokenVerify, async (req, res) => {
  try {
    const folders = await Folder.find({
      owner: req.user,
    });
    if (!folders) {
      return res.status(404);
    }
    return res.json(folders);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

//create folder
router.post("/addFolder", tokenVerify, async (req, res) => {
  try {
    if (!req.body.title || !req.body.position) {
      return res.status(400).send(false);
    }
    if (req.parent) {
      const folder = new Folder({
        title: req.body.title,
        position: req.body.position,
        parent: req.body.parent,
        owner: req.user,
      });
      await folder.save();
      return res.status(200).json(folder);
    }
    const folder = new Folder({
      title: req.body.title,
      position: req.body.position,
      owner: req.user,
    });
    await folder.save();
    return res.status(200).json(folder);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: err });
  }
});

//update folder

router.post("/updateFolder", tokenVerify, async (req, res) => {
  console.log(req.body);
  try {
    const folder = await Folder.findById(req.body._id);
    if (!folder) {
      return res.status(401).send("Not Found");
    }
    folder.title = req.body.title;
    folder.position = req.body.position;
    folder.save();
    return res.status(200).json(folder);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

//delete folder
router.post("/deleteFolder", tokenVerify, async (req, res) => {
  try {
    await Folder.findOneAndDelete({
      owner: req.user,
      _id: req.body._id,
    });
    await Link.deleteMany({ folder: req.body._id });
    return res.status(200).send(true);
  } catch (err) {
    console.log(err);
    return res.status(500).send(false);
  }
});

module.exports = router;
