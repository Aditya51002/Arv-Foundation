const express = require("express");
const router = express.Router();
const Contribution = require("../models/Contribution");
const nodemailer = require("nodemailer");

// POST: /api/contributions
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message, types } = req.body;

    // 1. Save to MongoDB
    const newEntry = new Contribution({
      name,
      email,
      phone,
      message,
      types,
    });
    await newEntry.save();

    // 2. Setup Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Your 16-character App Password
      },
    });

    // 3. ADMIN EMAIL: Professional Alert for you
    const adminMailOptions = {
      from: `"ARV System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, 
      subject: `🚩 New Inquiry: ${name} is interested in ${types[0]}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #333; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #f59e0b; padding: 20px; text-align: center;">
            <h1 style="margin: 0; color: #fff; font-size: 24px;">New Contribution Alert</h1>
          </div>
          <div style="padding: 20px; line-height: 1.6;">
            <p>Hello Admin,</p>
            <p>A new visitor has expressed interest in supporting <strong>ARV Foundation</strong>. Here are the details:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="tel:${phone}">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Interest:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">
                  ${types.map(t => `<span style="background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-right: 5px; border: 1px solid #fde68a;">${t}</span>`).join('')}
                </td>
              </tr>
            </table>

            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <strong>Message from User:</strong><br/>
              <em style="color: #555;">"${message}"</em>
            </div>

            <p style="margin-top: 25px; text-align: center;">
              <a href="mailto:${email}" style="background-color: #f59e0b; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Reply to Donor</a>
            </p>
          </div>
        </div>
      `
    };

    // 4. DONOR EMAIL: Warm "Thank You" Auto-Reply
    const donorMailOptions = {
      from: `"ARV Foundation" <${process.env.EMAIL_USER}>`,
      to: email, 
      subject: `Thank you for reaching out to ARV Foundation, ${name}!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #333; line-height: 1.6; border: 1px solid #fde68a; border-radius: 12px; padding: 25px;">
          <h2 style="color: #f59e0b;">Namaste ${name},</h2>
          <p>Thank you so much for your interest in contributing to the <strong>ARV Foundation</strong>. We have received your inquiry regarding <strong>${types.join(", ")}</strong>.</p>
          
          <p>Our team is currently reviewing your message, and one of our coordinators will get in touch with you via phone or email within the next 24-48 hours to discuss how we can work together.</p>
          
          <div style="padding: 20px; background-color: #fffbeb; border-radius: 10px; border: 1px dashed #f59e0b; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #92400e;">Your Message to Us:</h4>
            <p style="font-size: 14px; margin-bottom: 0; color: #78350f;">"${message}"</p>
          </div>

          <p>Every small effort makes a huge difference in the lives of the children and families we support. We are excited to have you as part of our journey.</p>

          <p>Warm regards,<br/>
          <strong>The ARV Foundation Team</strong><br/>
          <span style="font-size: 12px; color: #666;">Helping Hands, Changing Lives.</span></p>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 11px; color: #999; text-align: center;">
            Follow our journey on social media to see the impact of your support.
          </p>
        </div>
      `
    };

    // 5. Execute Emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(donorMailOptions);

    res.status(201).json({ 
      success: true, 
      message: "Contribution recorded and emails dispatched successfully." 
    });

  } catch (err) {
    console.error("❌ Contribution/Email Error:", err.message);
    res.status(500).json({ 
      success: false, 
      error: "Internal Server Error" 
    });
  }
});

module.exports = router;