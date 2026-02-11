const express = require('express');
const router = express.Router();
const Image = require('../models/Image');

// ─── GET all gallery images ───
router.get('/', async (req, res) => {
  try {
    const images = await Image.find().sort({ uploadedAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// ─── GET images by placement prefix (e.g. "work:orphanage-support") ───
router.get('/placement/:prefix', async (req, res) => {
  try {
    const prefix = req.params.prefix;
    const images = await Image.find({
      placement: { $regex: `^${prefix}` }
    }).sort({ placement: 1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch placed images' });
  }
});

// ─── GET all placed images (for all pages) ───
router.get('/placed', async (req, res) => {
  try {
    const images = await Image.find({
      placement: { $ne: null }
    }).sort({ placement: 1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch placed images' });
  }
});

// ─── POST upload new image(s) ───
router.post('/', async (req, res) => {
  try {
    const { images } = req.body; // array of { url, filename, size, title }
    
    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: 'No images provided' });
    }

    const docs = await Image.insertMany(
      images.map(img => ({
        url: img.url,
        filename: img.filename || 'untitled',
        size: img.size || 0,
        title: img.title || img.filename?.replace(/\.[^/.]+$/, '') || 'Untitled',
        placement: img.placement || null,
      }))
    );

    res.status(201).json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

// ─── PUT assign/update placement for an image ───
router.put('/:id/placement', async (req, res) => {
  try {
    const { placement } = req.body; // "work:orphanage-support:0" or null to unassign

    // If assigning to a slot, first clear any existing image in that slot
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

    if (!image) return res.status(404).json({ error: 'Image not found' });
    res.json(image);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update placement' });
  }
});

// ─── DELETE an image ───
router.delete('/:id', async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image not found' });
    res.json({ message: 'Image deleted', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

module.exports = router;
