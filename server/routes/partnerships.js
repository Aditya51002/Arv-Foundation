const express = require("express");
const router = express.Router();
const PartnershipProposal = require("../models/PartnershipProposal");
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
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

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Proposal submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
