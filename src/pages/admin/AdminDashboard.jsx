import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logoutAdmin } from "../../utils/adminAuth.js";
import { fetchAllImages } from "../../utils/imageApi.js";
import AdminLayout from "../../components/AdminLayout.jsx";
import { API_URL } from "../../config"; // Ensure this is imported

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Initialize with empty arrays to prevent .length errors
  const [drives, setDrives] = useState([]);
  const [galleryCount, setGalleryCount] = useState(0);

  useEffect(() => {
    // 1. Fetch Gallery Count
    fetchAllImages()
      .then((imgs) => setGalleryCount(imgs.length))
      .catch(() => setGalleryCount(0));

    // 2. Fetch Drives from API
    const fetchDrives = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // Using the fixed adminToken key
        const res = await fetch(`${API_URL}/api/drives`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setDrives(data);
        }
      } catch (err) {
        console.error("Failed to fetch drives for dashboard", err);
      }
    };

    fetchDrives();
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  // Derive active drives from the state
  const activeDrives = drives.filter((d) => d.active);

  // Safe wrapper for navigation buttons
  const NavButton = ({ to, children }) => (
    <button
      type="button"
      onClick={() => navigate(to)}
      className="z-10 relative rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/15 transition"
    >
      {children}
    </button>
  );

  return (
    <AdminLayout
        title="Dashboard"
        subtitle="Manage content like photos, drives, and announcements."
        onLogout={handleLogout}
      >
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
          <div className="glass-card p-3 sm:p-5 border border-white/10 rounded-2xl">
            <p className="text-[10px] sm:text-xs uppercase tracking-wide text-white/60">Total Drives</p>
            <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-semibold text-amber-200">{drives.length}</p>
          </div>
          <div className="glass-card p-3 sm:p-5 border border-white/10 rounded-2xl">
            <p className="text-[10px] sm:text-xs uppercase tracking-wide text-white/60">Active Drives</p>
            <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-semibold text-emerald-200">{activeDrives.length}</p>
          </div>
          <div className="glass-card p-3 sm:p-5 border border-white/10 rounded-2xl">
            <p className="text-[10px] sm:text-xs uppercase tracking-wide text-white/60">Gallery Items</p>
            <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-semibold text-amber-200">{galleryCount}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="glass-card p-4 sm:p-6 border border-white/10 rounded-2xl space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold">Drive Management</h2>
            <p className="text-xs sm:text-sm text-white/70">Create, manage and publish community drives.</p>
            <NavButton to="/admin/drives">Manage Drives</NavButton>
          </div>

          <div className="glass-card p-4 sm:p-6 border border-white/10 rounded-2xl space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold">Photo Gallery</h2>
            <p className="text-xs sm:text-sm text-white/70">Upload and curate photos for the website gallery.</p>
            <NavButton to="/admin/gallery">Manage Gallery</NavButton>
          </div>

          <div className="glass-card p-4 sm:p-6 border border-white/10 rounded-2xl space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold">Content Management</h2>
            <p className="text-xs sm:text-sm text-white/70">Edit all website text, descriptions and page content.</p>
            <NavButton to="/admin/content">Edit Content</NavButton>
          </div>

          <div className="glass-card p-4 sm:p-6 border border-white/10 rounded-2xl space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold">Internship Applications</h2>
            <p className="text-xs sm:text-sm text-white/70">Review and manage internship submissions.</p>
            <NavButton to="/admin/internships">View Applications</NavButton>
          </div>

          <div className="glass-card p-4 sm:p-6 border border-white/10 rounded-2xl space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold">Partnership Requests</h2>
            <p className="text-xs sm:text-sm text-white/70">Manage collaboration & partnership proposals.</p>
            <NavButton to="/admin/partnerships">View Partnerships</NavButton>
          </div>

          <div className="glass-card p-4 sm:p-6 border border-white/10 rounded-2xl space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold">Contributions</h2>
            <p className="text-xs sm:text-sm text-white/70">Track donations and contribution records.</p>
            <NavButton to="/admin/contributions">View Contributions</NavButton>
          </div>
        </div>
      </AdminLayout>
  );
};

export default AdminDashboard;

