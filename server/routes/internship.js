const express = require("express");
const router = express.Router();
const multer = require("multer");
const nodemailer = require("nodemailer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const InternshipApplication = require("../models/InternshipApplication");

// 1. Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Cloudinary Storage (Replaces diskStorage)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "internship_resumes",
    allowed_formats: ["pdf", "doc", "docx"],
    resource_type: "raw", // MUST be "raw" for PDFs
  },
});

const upload = multer({ storage });
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

router.post("/apply", upload.single("resume"), async (req, res) => {
  try {
    const resumeUrl = req.file ? req.file.path : null;
    const newApplication = new InternshipApplication({
      ...req.body,
      areasOfInterest: JSON.parse(req.body.areasOfInterest || "[]"),
      resume: resumeUrl, 
    });

    await newApplication.save();
    // Notify Applicant
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: newApplication.email,
      subject: "Application Received - ARV Foundation",
      html: `<p>Hi ${newApplication.fullName}, we have received your application. We will review your resume (<a href="${resumeUrl}">link</a>) soon.</p>`,
    });
    await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER, // Or the client's office email
  subject: "New Internship Applicant!",
  html: `
    <h3>New Application Received</h3>
    <p><strong>Name:</strong> ${newApplication.fullName}</p>
    <p><strong>Email:</strong> ${newApplication.email}</p>
    <p><strong>Resume:</strong> <a href="${resumeUrl}">Click here to view PDF</a></p>
  `,
});
    res.status(201).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;