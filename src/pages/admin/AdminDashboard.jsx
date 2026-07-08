import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logoutAdmin } from "../../utils/adminAuth.js";
import { fetchAllImages } from "../../utils/imageApi.js";
import AdminLayout from "../../components/AdminLayout.jsx";
import { API_URL } from "../../config";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
        const res = await fetch(`${API_URL}/api/admin/drives`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setDrives(data);
        } else {
          console.error(data.message || "Failed to fetch drives for dashboard");
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

  const chartData = [
    { name: "Total Drives", count: drives.length },
    { name: "Active Drives", count: drives.filter(d => d.active).length },
    { name: "Gallery Items", count: galleryCount }
  ];

  // Derive active drives from the state
  const activeDrives = drives.filter((d) => d.active);

  // Safe wrapper for navigation buttons
  const NavButton = ({ to, children }) => (
    <button
      type="button"
      onClick={() => navigate(to)}
      className="z-10 relative rounded-full border border-slate-300 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-800 hover:bg-slate-100 transition"
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
          <div className="glass-card p-3 sm:p-5 border border-slate-300 rounded-2xl">
            <p className="text-[10px] sm:text-xs uppercase tracking-wide text-slate-500">Total Drives</p>
            <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-semibold text-amber-600">{drives.length}</p>
          </div>
          <div className="glass-card p-3 sm:p-5 border border-slate-300 rounded-2xl">
            <p className="text-[10px] sm:text-xs uppercase tracking-wide text-slate-500">Active Drives</p>
            <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-semibold text-emerald-700">{activeDrives.length}</p>
          </div>
          <div className="glass-card p-3 sm:p-5 border border-slate-300 rounded-2xl">
            <p className="text-[10px] sm:text-xs uppercase tracking-wide text-slate-500">Gallery Items</p>
            <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-semibold text-amber-600">{galleryCount}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="glass-card p-4 sm:p-6 border border-slate-300 rounded-2xl space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold">Drive Management</h2>
            <p className="text-xs sm:text-sm text-slate-600">Create, manage and publish community drives.</p>
            <NavButton to="/admin/drives">Manage Drives</NavButton>
          </div>

          <div className="glass-card p-4 sm:p-6 border border-slate-300 rounded-2xl space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold">Photo Gallery</h2>
            <p className="text-xs sm:text-sm text-slate-600">Upload and curate photos for the website gallery.</p>
            <NavButton to="/admin/gallery">Manage Gallery</NavButton>
          </div>

          <div className="glass-card p-4 sm:p-6 border border-slate-300 rounded-2xl space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold">Content Management</h2>
            <p className="text-xs sm:text-sm text-slate-600">Edit all website text, descriptions and page content.</p>
            <NavButton to="/admin/content">Edit Content</NavButton>
          </div>

          <div className="glass-card p-4 sm:p-6 border border-slate-300 rounded-2xl space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold">Internship Applications</h2>
            <p className="text-xs sm:text-sm text-slate-600">Review and manage internship submissions.</p>
            <NavButton to="/admin/internships">View Applications</NavButton>
          </div>

          <div className="glass-card p-4 sm:p-6 border border-slate-300 rounded-2xl space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold">Partnership Requests</h2>
            <p className="text-xs sm:text-sm text-slate-600">Manage collaboration & partnership proposals.</p>
            <NavButton to="/admin/partnerships">View Partnerships</NavButton>
          </div>

          <div className="glass-card p-4 sm:p-6 border border-slate-300 rounded-2xl space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold">Contributions</h2>
            <p className="text-xs sm:text-sm text-slate-600">Track donations and contribution records.</p>
            <NavButton to="/admin/contributions">View Contributions</NavButton>
          </div>

          <div className="glass-card p-4 sm:p-6 border border-slate-300 rounded-2xl space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold">Certificate Requests</h2>
            <p className="text-xs sm:text-sm text-slate-600">Approve or reject community certificates.</p>
            <NavButton to="/admin/certificates">Manage Certificates</NavButton>
          </div>
        </div>

        <div className="mt-6 glass-card p-4 sm:p-6 border border-slate-300 rounded-2xl h-80">
          <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-4">Platform Overview</h2>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#ffffff80" fontSize={12} />
              <YAxis stroke="#ffffff80" fontSize={12} />
              <Tooltip cursor={{fill: '#ffffff10'}} wrapperStyle={{ backgroundColor: '#0b1411', border: '1px solid #ffffff20' }} />
              <Bar dataKey="count" fill="#34d399" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </AdminLayout>
  );
};

export default AdminDashboard;
