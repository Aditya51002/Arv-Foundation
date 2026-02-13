const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  filename: { type: String },
  size: { type: Number },
  title: { type: String },
  placement: { type: String, default: null } // example: "work:orphanage-support:0"
}, { timestamps: true });

module.exports = mongoose.model("Image", imageSchema);
