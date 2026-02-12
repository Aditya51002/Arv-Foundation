const express = require("express");
const router = express.Router();
const Image = require("../models/Image");
const protectAdmin = require("../middleware/adminMiddleware");

// GET all images (admin)
router.get("/", protectAdmin, async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST upload images
// In routes/adminImageRoutes.js
router.post("/", protectAdmin, async (req, res) => {
  try {
    // Access the 'images' array from the wrapper object sent by the frontend
    const images = await Image.insertMany(req.body.images);
    res.status(201).json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// DELETE image
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    await Image.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE placement
router.patch("/:id/placement", protectAdmin, async (req, res) => {
  try {
    const { placement } = req.body;

    if (placement) {
      await Image.updateMany(
        { placement },
        { $set: { placement: null } }
      );
    }

    const image = await Image.findByIdAndUpdate(
      req.params.id,
      { placement },
      { new: true }
    );

    res.json(image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
