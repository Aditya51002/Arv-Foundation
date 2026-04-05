const mongoose = require("mongoose");

const certificateRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  certificateType: {
    type: String,
    required: true,
    enum: ["Volunteer", "Internship", "Donation", "Other"],
    default: "Volunteer",
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  description: {
    type: String,
    trim: true,
  },
  issuedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CertificateRequest", certificateRequestSchema);
