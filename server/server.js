const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { family: 4 })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err.message));

// Routes
app.use("/api/admin/images", require("./routes/adminImageRoutes"));
app.use("/api/images", require("./routes/imageRoutes"));

// Drive Routes
app.use("/api/admin/drives", require("./routes/driveRoutes"));
app.use("/api/drives", require("./routes/driveRoutes"));

// Other Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contact", require("./routes/contact.routes"));
app.use("/api/admin", require("./routes/adminAuth"));
app.use("/api/volunteer", require("./routes/volunteer"));
app.use("/api/internship", require("./routes/internship"));
// ADDED: Admin internship applications API route
app.use("/api/admin/internships", require("./routes/adminInternships"));
// ADDED: Admin partnership proposals API route
app.use("/api/admin/partnerships", require("./routes/adminPartnerships"));
app.use("/api/partnerships", require("./routes/partnerships"));
app.use("/api/sections", require("./routes/sectionRoutes"));
// ADDED: Admin contributions API route
app.use("/api/admin/contributions", require("./routes/adminContributions"));
app.use("/api/contributions", require("./routes/contribution.routes"));
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




