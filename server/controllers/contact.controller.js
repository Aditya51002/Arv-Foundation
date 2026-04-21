const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

const sendWelcomeEmail = async (email, name) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: `"ARV Foundation" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank You for Reaching Out!",
      html: `<div style="font-family: sans-serif; color: #333;">
        <h3>Hi ${name},</h3><p>We have received your message. Our team will read it and get back to you shortly.</p>
        <p>Thank you for supporting our mission.</p>
        <br/><b>ARV Foundation Team</b>
      </div>`
    });
  } catch (err) {
    console.error("Email dispatch failed:", err);
  }
};

exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required"
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      message
    });

    // Fire & Forget email dispatch
    sendWelcomeEmail(email, name);

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact
    });

  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
