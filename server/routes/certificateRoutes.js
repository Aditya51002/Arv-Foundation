const express = require("express");
const router = express.Router();
const CertificateRequest = require("../models/CertificateRequest");
const protectUser = require("../middleware/authMiddleware");

// POST /api/certificates/request
router.post("/request", protectUser, async (req, res) => {
  try {
    const { userName, email, certificateType, description } = req.body;

    const newRequest = new CertificateRequest({
      user: req.user.id,
      userName,
      email,
      certificateType,
      description
    });

    await newRequest.save();

    res.status(201).json({ message: "Certificate request submitted successfully", data: newRequest });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/certificates/my-requests
router.get("/my-requests", protectUser, async (req, res) => {
  try {
    const requests = await CertificateRequest.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
