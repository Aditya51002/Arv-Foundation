const express = require("express");
const router = express.Router();
const PartnershipProposal = require("../models/PartnershipProposal");
const protectAdmin = require("../middleware/adminMiddleware");

// ADDED: New admin API to fetch partnership proposals
// GET /api/admin/partnerships
router.get("/", protectAdmin, async (_req, res) => {
  try {
    // ADDED: Pull latest proposals from PartnershipProposal schema
    const proposals = await PartnershipProposal.find().sort({ createdAt: -1 });

    // ADDED: Normalize DB fields to match AdminPartnerships.jsx UI keys
    const data = proposals.map((p) => ({
      _id: p._id,
      organizationName: p.organizationName,
      contactPerson: p.contactName,
      email: p.email,
      phone: p.phone,
      location: p.location,
      focusCategories: Array.isArray(p.partnershipTypes) ? p.partnershipTypes : [],
      description: p.offerDetails,
      duration: p.duration,
      expectedScale: p.capacity,
      status: p.status || "active",
      createdAt: p.createdAt,
    }));

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to fetch partnership proposals",
    });
  }
});

// PATCH /api/admin/partnerships/:id
router.patch("/:id", protectAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !['active', 'inactive'].includes(status)) {
      return res.status(400).json({ message: "Valid status ('active' or 'inactive') is required" });
    }
    
    const updated = await PartnershipProposal.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!updated) {
      return res.status(404).json({ message: "Partnership proposal not found" });
    }
    
    return res.status(200).json({ message: "Status updated successfully", proposal: updated });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to update partnership status",
    });
  }
});

module.exports = router;
