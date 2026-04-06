const express = require("express");
const router = express.Router();
const Image = require("../models/Image");
const protectAdmin = require("../middleware/adminMiddleware");
const { uploadImage } = require("../middleware/uploadMiddleware");

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
router.post("/", protectAdmin, uploadImage.array("images", 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
       return res.status(400).json({ message: "No images provided" });
    }
    
    // Map uploaded multer files (Cloudinary urls) to our Document structure
    const imageDocs = req.files.map(file => ({
      url: file.path, 
      filename: file.filename, // public_id from Cloudinary
      size: file.size,
      title: file.originalname.replace(/\.[^/.]+$/, ""),
    }));

    const savedImages = await Image.insertMany(imageDocs);
    res.status(201).json(savedImages);
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
