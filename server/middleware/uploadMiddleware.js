const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for Documents/PDFs (e.g. Resumes)
const resumeStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "arv_resumes",
    allowed_formats: ["pdf", "doc", "docx"],
    resource_type: "raw", // MUST be raw for PDFs
  },
});

// Storage for Standard Images (Gallery, Drives)
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "arv_images",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
  },
});

const uploadResume = multer({ 
  storage: resumeStorage,
  limits: { fileSize: 1 * 1024 * 1024 } // 1 MB limit
});

const uploadImage = multer({ 
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB limit
});

module.exports = {
  cloudinary,
  uploadResume,
  uploadImage,
};
