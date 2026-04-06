const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map(e => e.msg).join(", "),
      error: "Validation failed" // Fallback for differing frontends expecting error property
    });
  }
  next();
};

module.exports = { validate };
