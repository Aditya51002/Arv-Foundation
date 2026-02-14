const express = require("express");
const router = express.Router();
const Contribution = require("../models/Contribution");
const protectAdmin = require("../middleware/adminMiddleware");

// ADDED: New admin API to fetch contribution submissions
// GET /api/admin/contributions
router.get("/", protectAdmin, async (_req, res) => {
  try {
    // ADDED: Pull latest records from Contribution schema
    const contributions = await Contribution.find().sort({ createdAt: -1 });

    // ADDED: Normalize DB fields to match AdminContributions.jsx UI keys
    const data = contributions.map((c) => ({
      _id: c._id,
      fullName: c.name,
      email: c.email,
      phone: c.phone,
      message: c.message,
      amount: null,
      paymentId: Array.isArray(c.types) ? c.types.join(", ") : "",
      date: c.createdAt,
      status: c.status === "completed" ? "success" : "pending",
    }));

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to fetch contributions",
    });
  }
});

module.exports = router;
