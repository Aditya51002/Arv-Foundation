// ==========================================================
// ADMIN CONTENT ROUTES
// GET    /api/admin/content              — Fetch all content data
// PUT    /api/admin/content/:key         — Update specific content 
// PUT    /api/admin/content/batch        — Batch update content
// POST   /api/admin/content/reset        — Reset all content to defaults
// POST   /api/admin/content/reset/:page  — Reset specific page content
// ==========================================================

const express = require('express');
const { 
  getAllContent, 
  updateContent, 
  batchUpdateContent, 
  resetContent 
} = require('../controllers/content.controller.js');
const protectAdmin = require('../middleware/adminMiddleware.js');

const router = express.Router();

// Apply admin authentication middleware to all content routes
router.use(protectAdmin);

// Get all content data
router.get('/', getAllContent);

// Update specific content by key
router.put('/:key', updateContent);

// Batch update content
router.put('/batch', batchUpdateContent);

// Reset all content to defaults
router.post('/reset', resetContent);

// Reset specific page content to defaults  
router.post('/reset/:page', resetContent);

module.exports = router;