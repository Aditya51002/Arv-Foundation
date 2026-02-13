const express = require("express");
const router = express.Router();
const Image = require("../models/Image");

// GET all images
router.get("/", async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// GET images by placement prefix
router.get("/placement/:prefix", async (req, res) => {
  try {
    const images = await Image.find({
      placement: { $regex: `^${req.params.prefix}` }
    });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// GET all placed images
router.get("/placed", async (req, res) => {
  try {
    const images = await Image.find({
      placement: { $ne: null }
    }).sort({ placement: 1 });

    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch placed images" });
  }
});

module.exports = router;
