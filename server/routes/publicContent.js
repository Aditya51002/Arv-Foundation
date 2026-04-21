const express = require('express');
const router = express.Router();
const Content = require('../models/Content');

router.get('/', async (req, res) => {
  try {
    const docs = await Content.find({}).lean();
    const content = {};
    docs.forEach(d => {
      content[d.key] = { value: d.value, type: d.type };
    });
    res.json({ success: true, content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
