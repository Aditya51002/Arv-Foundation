const express = require("express");
const router = express.Router();
const InternshipApplication = require("../models/InternshipApplication");
const protectAdmin = require("../middleware/adminMiddleware");

// ADDED: New admin API to fetch internship applications
// GET /api/admin/internships
router.get("/", protectAdmin, async (_req, res) => {
  try {
    // ADDED: Pull latest applications from InternshipApplication schema
    const applications = await InternshipApplication.find().sort({ createdAt: -1 });

    // ADDED: Normalize DB fields to match AdminInternships.jsx UI keys
    const data = applications.map((app) => ({
      _id: app._id,
      fullName: app.fullName,
      email: app.email,
      phone: app.phone,
      city: app.cityState || "",
      college: app.college,
      fieldOfStudy: app.fieldOfStudy,
      areaOfInterest: Array.isArray(app.areasOfInterest)
        ? app.areasOfInterest.join(", ")
        : "",
      preferredDuration: app.duration,
      availability: app.availability,
      resumeUrl: app.resume,
      appliedDate: app.createdAt,
    }));

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to fetch internship applications",
    });
  }
});

module.exports = router;
