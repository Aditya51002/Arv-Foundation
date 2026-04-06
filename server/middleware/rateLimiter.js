const rateLimit = require('express-rate-limit');

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, // 5 requests per IP
  message: { success: false, message: "Too many submissions from this IP, please try again after 15 minutes", error: "Too many requests" }
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200, 
  message: { success: false, message: "Rate limit exceeded." }
});

module.exports = { formLimiter, apiLimiter };
