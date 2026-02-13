const mongoose = require("mongoose");

const partnershipSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  contactName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  offerDetails: { type: String, required: true },
  duration: { type: String },
  capacity: { type: String },
  partnershipTypes: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PartnershipProposal", partnershipSchema);
