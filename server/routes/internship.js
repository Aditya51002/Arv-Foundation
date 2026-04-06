const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const InternshipApplication = require("../models/InternshipApplication");
const { uploadResume } = require("../middleware/uploadMiddleware");
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { formLimiter } = require('../middleware/rateLimiter');

console.log("Email User:", process.env.EMAIL_USER);
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    // This prevents the socket from closing abruptly on local machines
    rejectUnauthorized: false 
  }
});

router.post("/apply", 
  formLimiter,
  uploadResume.single("resume"), 
  [
    body('fullName').trim().notEmpty().isLength({ max: 100 }),
    body('email').isEmail().normalizeEmail(),
    body('phone').trim().notEmpty().isLength({ max: 20 }),
    body('city').trim().notEmpty().isLength({ max: 100 }),
    body('college').trim().notEmpty().isLength({ max: 150 }),
    body('fieldOfStudy').trim().notEmpty().isLength({ max: 150 }),
    // areasOfInterest is a JSON string because it's multipart/form-data
    body('areasOfInterest').trim().notEmpty().isLength({ max: 1000 })
  ],
  validate,
  async (req, res) => {
  try {
    const resumeUrl = req.file ? req.file.path : null;
    const newApplication = new InternshipApplication({
      ...req.body,
      areasOfInterest: JSON.parse(req.body.areasOfInterest || "[]"),
      resume: resumeUrl, 
    });

    await newApplication.save();
    // Notify Applicant (Non-fatal if SMTP fails)
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: newApplication.email,
        subject: "Application Received - ARV Foundation",
        html: `<p>Hi ${newApplication.fullName}, we have received your application. We will review your resume (<a href="${resumeUrl}">link</a>) soon.</p>`,
      });
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Internship Applicant!",
        html: `
          <h3>New Application Received</h3>
          <p><strong>Name:</strong> ${newApplication.fullName}</p>
          <p><strong>Email:</strong> ${newApplication.email}</p>
          <p><strong>Resume:</strong> <a href="${resumeUrl}">Click here to view PDF</a></p>
        `,
      });
    } catch (mailErr) {
      console.warn("Mail dispatch failed, but internship application was saved:", mailErr.message);
    }
    res.status(201).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;