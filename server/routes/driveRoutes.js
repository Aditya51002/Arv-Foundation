const express = require("express");
const router = express.Router();
const Drive = require("../models/Drive");
const protectAdmin = require("../middleware/adminMiddleware");

// ─────────────────────────────
// 🔓 PUBLIC ROUTES (No Token)
// ─────────────────────────────

/** * @desc Get all active drives for normal users 
 * Access: GET /api/drives/public OR /api/drives/active
 */
router.get("/public", async (req, res) => {
  try {
    // Only return drives marked as active
    const drives = await Drive.find({ active: true }).sort({ createdAt: -1 });
    res.json(drives);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/** * @desc Get the single most recent active drive
 * Access: GET /api/drives/latest
 */
router.get("/latest", async (req, res) => {
  try {
    const drive = await Drive.findOne({ active: true }).sort({ createdAt: -1 });
    res.json(drive);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────
// 🔒 ADMIN ROUTES (Token Required)
// ─────────────────────────────

/** * @desc Get EVERY drive (including inactive drafts) for dashboard
 * Access: GET /api/admin/drives/
 */
router.get("/", protectAdmin, async (req, res) => {
  try {
    const drives = await Drive.find().sort({ createdAt: -1 });
    res.json(drives);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/** * @desc Create a new drive
 * Access: POST /api/admin/drives/
 */
router.post("/", protectAdmin, async (req, res) => {
  try {
    const drive = new Drive({
      ...req.body,
      createdBy: req.adminId // From protectAdmin middleware
    });
    await drive.save();
    res.status(201).json(drive);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/** * @desc Toggle active/inactive status
 * Access: PUT /api/admin/drives/toggle/:id
 */
router.put("/toggle/:id", protectAdmin, async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);
    if (!drive) return res.status(404).json({ message: "Drive not found" });

    drive.active = !drive.active;
    await drive.save();
    res.json(drive);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/** * @desc Delete drive permanently
 * Access: DELETE /api/admin/drives/:id
 */
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    const drive = await Drive.findByIdAndDelete(req.params.id);
    if (!drive) return res.status(404).json({ message: "Drive not found" });
    res.json({ message: "Drive deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;