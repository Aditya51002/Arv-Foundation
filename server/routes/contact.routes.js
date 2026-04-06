const express = require("express");
const router = express.Router();

const { createContact } = require("../controllers/contact.controller");
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { formLimiter } = require('../middleware/rateLimiter');

router.post("/", 
  formLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }).withMessage('Name too long (max 100 char)'),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('phone').trim().isLength({ max: 20 }).withMessage('Phone too long'),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 1000 }).withMessage('Message too long (max 1000 char)')
  ],
  validate,
  createContact
);

module.exports = router;