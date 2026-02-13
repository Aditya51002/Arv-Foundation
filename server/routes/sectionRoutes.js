const express = require("express");
const router = express.Router();
const Section = require("../models/Section");
const protectAdmin = require("../middleware/adminMiddleware");

// 🔓 GET ALL SECTIONS (public read)
router.get("/", async (req, res) => {
  try {
    const sections = await Section.find().sort({ order: 1 });
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔒 UPDATE STATUS (Admin)
router.put("/:id/toggle", protectAdmin, async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    section.status =
      section.status === "active" ? "hidden" : "active";

    await section.save();

    res.json(section);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔒 MOVE SECTION (Admin)
router.put("/:id/move", protectAdmin, async (req, res) => {
  try {
    const { direction } = req.body;

    const current = await Section.findById(req.params.id);
    if (!current) {
      return res.status(404).json({ message: "Section not found" });
    }

    const swapWith = await Section.findOne({
      order:
        direction === "up"
          ? current.order - 1
          : current.order + 1,
    });

    if (!swapWith) {
      return res.json({ message: "Cannot move" });
    }

    const temp = current.order;
    current.order = swapWith.order;
    swapWith.order = temp;

    await current.save();
    await swapWith.save();

    res.json({ message: "Moved successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
