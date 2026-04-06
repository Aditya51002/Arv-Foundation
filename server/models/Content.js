const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  key: { 
    type: String, 
    required: true, 
    unique: true // Extremely important to prevent duplicated keys e.g. 'home:hero:tagline'
  }, 
  value: { 
    type: String, 
    default: "" 
  },
  type: { 
    type: String, 
    default: "text" // 'text', 'textarea', or 'richtext'
  }
}, { timestamps: true });

module.exports = mongoose.model("Content", contentSchema);
