const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    cityState: String,
    qualification: String,
    college: String,
    fieldOfStudy: String,
    availability: String,
    duration: String,
    motivation: String,
    areasOfInterest: [String],
    resume: String, // Stores Cloudinary URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("InternshipApplication", internshipSchema);