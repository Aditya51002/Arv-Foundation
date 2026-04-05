const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const dns = require("dns");
const helmet = require("helmet");

dotenv.config();
const app = express();

// Middleware
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Allow images to be viewed cross-origin
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173", credentials: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI_FALLBACK = process.env.MONGODB_URI_FALLBACK;

// Some networks block SRV lookups used by mongodb+srv. Allow explicit DNS servers.
const customDnsServers = process.env.MONGODB_DNS_SERVERS
  ? process.env.MONGODB_DNS_SERVERS.split(",").map((server) => server.trim()).filter(Boolean)
  : [];

if (customDnsServers.length > 0) {
  dns.setServers(customDnsServers);
  console.log("Using custom DNS servers for MongoDB:", customDnsServers.join(", "));
}

async function connectToMongo() {
  const baseOptions = {
    family: 4,
    serverSelectionTimeoutMS: 10000,
  };

  try {
    await mongoose.connect(MONGODB_URI, baseOptions);
    console.log("MongoDB Connected");
  } catch (err) {
    const isSrvLookupError =
      typeof err.message === "string" && err.message.includes("querySrv");

    if (isSrvLookupError && MONGODB_URI_FALLBACK) {
      console.warn(
        "Primary MongoDB URI failed with SRV lookup error. Retrying with MONGODB_URI_FALLBACK..."
      );

      try {
        await mongoose.connect(MONGODB_URI_FALLBACK, baseOptions);
        console.log("MongoDB Connected via fallback URI");
        return;
      } catch (fallbackErr) {
        console.error("MongoDB Fallback Connection Error:", fallbackErr.message);
      }
    }

    console.error("MongoDB Connection Error:", err.message);
  }
}

connectToMongo();

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
// Certificate Routes
app.use("/api/certificates", require("./routes/certificateRoutes"));
app.use("/api/admin/certificates", require("./routes/adminCertificates"));
// ADDED: Admin internship applications API route
app.use("/api/admin/internships", require("./routes/adminInternships"));
// ADDED: Admin partnership proposals API route
app.use("/api/admin/partnerships", require("./routes/adminPartnerships"));
app.use("/api/partnerships", require("./routes/partnerships"));
app.use("/api/sections", require("./routes/sectionRoutes"));
// ADDED: Admin contributions API route
app.use("/api/admin/contributions", require("./routes/adminContributions"));
app.use("/api/contributions", require("./routes/contribution.routes"));
// ADDED: Admin content management API route
app.use("/api/admin/content", require("./routes/adminContent"));
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




