const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const rateLimit = require('express-rate-limit');

// Simple rate limit to prevent subscription spamming
const subscribeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 3, 
  message: { message: "Too many subscription attempts, please try again later" }
});

// POST /api/newsletter/subscribe
router.post('/subscribe', subscribeLimiter, async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      if (!existing.active) {
        // Re-subscribe them implicitly
        existing.active = true;
        await existing.save();
        return res.status(200).json({ message: "Successfully resubscribed to the newsletter!" });
      }
      return res.status(400).json({ message: "Email is already subscribed" });
    }

    // Create new sub
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ message: "Successfully subscribed to the newsletter!" });
  } catch (err) {
    console.error('Subscription Error:', err.message);
    res.status(500).json({ message: "Server error during subscription" });
  }
});

module.exports = router;
