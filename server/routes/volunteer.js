const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");
const nodemailer = require("nodemailer");

// POST /api/volunteer
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 1. Basic Validation
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // 2. Prevent Duplicate Submissions
    const existing = await Volunteer.findOne({ email, message });
    if (existing) {
      return res.status(400).json({ message: "You have already submitted this request." });
    }

    // 3. Save to MongoDB
    const volunteer = new Volunteer({ name, email, message });
    await volunteer.save();

    // 4. Setup Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 5. ADMIN EMAIL: Alert for you
    const adminMailOptions = {
      from: `"ARV Volunteer Hub" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🤝 New Volunteer: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #10b981; padding: 20px; text-align: center;">
            <h1 style="margin: 0; color: #fff; font-size: 22px;">New Volunteer Inquiry</h1>
          </div>
          <div style="padding: 20px; color: #334155;">
            <p>Hello Admin,</p>
            <p>Someone wants to join the mission! Here are their details:</p>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            </div>
            <p><strong>Their Note:</strong></p>
            <div style="padding: 15px; border-left: 4px solid #10b981; background: #f0fdf4; font-style: italic;">
              "${message}"
            </div>
            <p style="margin-top: 20px; text-align: center;">
              <a href="mailto:${email}" style="background: #10b981; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">Contact Volunteer</a>
            </p>
          </div>
        </div>
      `,
    };

    // 6. VOLUNTEER EMAIL: Warm Welcome
    const welcomeMailOptions = {
      from: `"ARV Foundation" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Welcome to the ARV Family, ${name}!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #334155; line-height: 1.6; border: 1px solid #fde68a; border-radius: 12px; padding: 25px;">
          <h2 style="color: #10b981;">Namaste ${name},</h2>
          <p>Thank you for your interest in volunteering with <strong>ARV Foundation</strong>. It’s people like you who help us bring real change to the community.</p>
          
          <p>We have received your message regarding: <em>"${message}"</em></p>
          
          <p>Our volunteer coordinator will review your application and reach out to you within 48 hours to discuss upcoming drives and orientation.</p>

          <div style="margin: 20px 0; padding: 15px; background: #f0fdf4; border-radius: 10px; text-align: center;">
            <p style="margin: 0; font-weight: bold; color: #065f46;">"Small acts, when multiplied by millions of people, can transform the world."</p>
          </div>

          <p>We are excited to work with you!</p>

          <p>Warm regards,<br/>
          <strong>The ARV Foundation Team</strong></p>
        </div>
      `,
    };

    // 7. Send Emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(welcomeMailOptions);

    res.status(201).json({ message: "Volunteer submitted successfully and emails sent." });
  } catch (err) {
    console.error("Volunteer Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;