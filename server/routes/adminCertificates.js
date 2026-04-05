const express = require("express");
const router = express.Router();
const CertificateRequest = require("../models/CertificateRequest");
const protectAdmin = require("../middleware/adminMiddleware");

// Apply admin protection to all routes in this file
router.use(protectAdmin);

// GET /api/admin/certificates - Get all requests
router.get("/", async (req, res) => {
  try {
    const requests = await CertificateRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PATCH /api/admin/certificates/:id/status - Approve or reject
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updateFields = { status };
    if (status === "approved") {
      updateFields.issuedAt = new Date();
    }

    const updatedRequest = await CertificateRequest.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Certificate request not found" });
    }

    res.json(updatedRequest);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /api/admin/certificates/:id - Delete a request
router.delete("/:id", async (req, res) => {
  try {
    const deletedRequest = await CertificateRequest.findByIdAndDelete(req.params.id);
    if (!deletedRequest) {
      return res.status(404).json({ message: "Certificate request not found" });
    }
    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
