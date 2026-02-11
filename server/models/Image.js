const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  // The actual image data as base64 string
  url: {
    type: String,
    required: true
  },
  // Original filename
  filename: {
    type: String,
    required: true
  },
  // File size in bytes
  size: {
    type: Number,
    default: 0
  },
  // Display title
  title: {
    type: String,
    default: ''
  },
  // Where this image is assigned (null = gallery only, not assigned to any page)
  // Format: "page:section:slotIndex" e.g. "work:orphanage-support:0"
  placement: {
    type: String,
    default: null
  },
  // Upload timestamp
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for quick lookups by placement
imageSchema.index({ placement: 1 });

module.exports = mongoose.model('Image', imageSchema);
