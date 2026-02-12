const mongoose = require("mongoose");

const ContributionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  types: [{ type: String }], // e.g., ["volunteer", "donate-food"]
  status: { type: String, default: "pending" }, // pending, contacted, completed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Contribution", ContributionSchema);