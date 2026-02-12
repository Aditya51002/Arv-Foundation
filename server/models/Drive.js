// models/Drive.js
const mongoose = require("mongoose");

const driveSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    dateTime: {
      type: Date,
      required: true
    },
    image: {
      type: String
    },
    active: {
      type: Boolean,
      default: true   // 👈 IMPORTANT
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Drive", driveSchema);
