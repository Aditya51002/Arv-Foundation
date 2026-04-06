const express = require("express");
const router = express.Router();
const PartnershipProposal = require("../models/PartnershipProposal");
const nodemailer = require("nodemailer");
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { formLimiter } = require('../middleware/rateLimiter');

router.post("/", 
  formLimiter,
  [
    body('organizationName').trim().notEmpty().isLength({ max: 150 }),
    body('contactPerson').trim().notEmpty().isLength({ max: 100 }),
    body('email').isEmail().normalizeEmail(),
    body('phone').trim().notEmpty().isLength({ max: 20 }),
    body('location').trim().notEmpty().isLength({ max: 200 }),
    body('focusCategories').isArray({ min: 1 }),
    body('description').trim().notEmpty().isLength({ max: 3000 })
  ],
  validate,
  async (req, res) => {
  try {
    // Save to MongoDB
    const proposal = new PartnershipProposal(req.body);
    await proposal.save();

    // Send email notification to admin
    const transporter = nodemailer.createTransport({
      service: "gmail", // Using Gmail SMTP
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"ARV Foundation" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL, // Admin receives the email
      subject: "New Partnership Proposal Submitted",
      text: `A new partnership proposal has been submitted:\n\n${JSON.stringify(req.body, null, 2)}`,
    };

    // Execute email reliably (Non-fatal if SMTP fails)
    try {
      await transporter.sendMail(mailOptions);
    } catch(mailErr) {
      console.warn("Mail dispatch failed, but partnership proposal was saved:", mailErr.message);
    }

    res.status(201).json({ message: "Proposal submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
