import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logoutAdmin } from "../../utils/adminAuth.js";
import AdminLayout from "../../components/AdminLayout.jsx";
import AddDriveModal from "../../components/AddDriveModal.jsx";
import { MapPin, Clock, Trash2, ToggleLeft, ToggleRight, Plus } from "lucide-react";

const AdminDrives = () => {
  const navigate = useNavigate();
  const [driveModalOpen, setDriveModalOpen] = useState(false);
  const [drives, setDrives] = useState([]);

  // Fetch drives on mount
  useEffect(() => {
    fetchDrives();
  }, []);

  // Fetch drives function
  const fetchDrives = async () => {
    try {
      // CHANGED: Use adminToken to match Login logic
      const token = localStorage.getItem("adminToken");

      const res = await fetch("http://localhost:5000/api/drives", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        setDrives(data);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Failed to fetch drives", err);
    }
  };

  // Refresh drives helper
  const refreshDrives = () => {
    fetchDrives();
  };

  // Logout
  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  // Delete drive
  const handleDeleteDrive = async (id) => {
    try {
      // CHANGED: Use adminToken
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`http://localhost:5000/api/drives/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        refreshDrives();
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Failed to delete drive", err);
    }
  };

  // Toggle drive active status
  const handleToggleDrive = async (id) => {
    try {
      // CHANGED: Use adminToken
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`http://localhost:5000/api/drives/toggle/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        refreshDrives();
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Failed to toggle drive", err);
    }
  };

  const activeDrives = drives.filter((d) => d.active);

  return (
    <>
      <AdminLayout
        title="Drive Management"
        subtitle="Create, manage and publish community drives."
        onLogout={handleLogout}
      >
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="glass-card p-5 border border-white/10 rounded-2xl">
            <p className="text-xs uppercase tracking-wide text-white/60">Total Drives</p>
            <p className="mt-2 text-3xl font-semibold text-amber-200">{drives.length}</p>
          </div>
          <div className="glass-card p-5 border border-white/10 rounded-2xl">
            <p className="text-xs uppercase tracking-wide text-white/60">Active Drives</p>
            <p className="mt-2 text-3xl font-semibold text-emerald-200">{activeDrives.length}</p>
          </div>
          <div className="glass-card p-5 border border-white/10 rounded-2xl">
            <p className="text-xs uppercase tracking-wide text-white/60">Inactive Drives</p>
            <p className="mt-2 text-3xl font-semibold text-white/60">{drives.length - activeDrives.length}</p>
          </div>
        </div>

        {/* Add New Drive */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Published Drives</h2>
          <button
            type="button"
            onClick={() => setDriveModalOpen(true)}
            className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/20 transition"
          >
            <Plus size={16} />
            Add New Drive
          </button>
        </div>

        {/* Published Drives List */}
        {drives.length > 0 ? (
          <div className="space-y-3">
            {drives.map((drive) => (
              <div
                key={drive._id}
                className={`glass-card p-4 border rounded-2xl flex flex-col sm:flex-row gap-4 items-start ${
                  drive.active ? "border-emerald-400/30" : "border-white/10 opacity-60"
                }`}
              >
                {drive.image && (
                  <img
                    src={drive.image}
                    alt={drive.category}
                    className="w-full sm:w-24 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="pill text-xs">{drive.category}</span>
                    {drive.active && (
                      <span className="text-xs text-emerald-300 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-white/80 line-clamp-2">{drive.description}</p>
                  <div className="flex items-center gap-4 text-xs text-white/50">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {drive.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />{" "}
                      {new Date(drive.dateTime).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleToggleDrive(drive._id)}
                    title={drive.active ? "Deactivate" : "Activate"}
                    className="p-2 rounded-lg hover:bg-white/10 transition text-white/60 hover:text-white"
                  >
                    {drive.active ? (
                      <ToggleRight size={20} className="text-emerald-300" />
                    ) : (
                      <ToggleLeft size={20} />
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteDrive(drive._id)}
                    title="Delete drive"
                    className="p-2 rounded-lg hover:bg-red-500/10 transition text-white/60 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
              <MapPin size={24} className="text-white/40" />
            </div>
            <p className="text-white/60 mb-2">No drives published yet</p>
            <button
              onClick={() => setDriveModalOpen(true)}
              className="text-emerald-300 hover:text-emerald-200 text-sm font-semibold"
            >
              Create your first drive
            </button>
          </div>
        )}
      </AdminLayout>

      {/* Add Drive Modal */}
      <AddDriveModal
        open={driveModalOpen}
        onClose={() => setDriveModalOpen(false)}
        onPublished={refreshDrives}
      />
    </>
  );
};

export default AdminDrives;
