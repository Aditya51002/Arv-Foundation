import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logoutAdmin } from "../../utils/adminAuth.js";
import { API_URL } from "../../config.js";
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

      const res = await fetch(`${API_URL}/api/drives`, {
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
      const res = await fetch(`${API_URL}/api/drives/${id}`, {
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
      const res = await fetch(`${API_URL}/api/drives/toggle/${id}`, {
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
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="glass-card p-3 sm:p-5 border border-slate-300 rounded-2xl">
            <p className="text-[10px] sm:text-xs uppercase tracking-wide text-slate-500">Total Drives</p>
            <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-semibold text-amber-600">{drives.length}</p>
          </div>
          <div className="glass-card p-3 sm:p-5 border border-slate-300 rounded-2xl">
            <p className="text-[10px] sm:text-xs uppercase tracking-wide text-slate-500">Active Drives</p>
            <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-semibold text-emerald-700">{activeDrives.length}</p>
          </div>
          <div className="glass-card p-3 sm:p-5 border border-slate-300 rounded-2xl">
            <p className="text-[10px] sm:text-xs uppercase tracking-wide text-slate-500">Inactive</p>
            <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-semibold text-slate-500">{drives.length - activeDrives.length}</p>
          </div>
        </div>

        {/* Add New Drive */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base sm:text-lg font-semibold">Published Drives</h2>
          <button
            type="button"
            onClick={() => setDriveModalOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-700 hover:bg-emerald-500/20 transition"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add New Drive</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {/* Published Drives List */}
        {drives.length > 0 ? (
          <div className="space-y-3 max-h-[55vh] sm:max-h-[600px] overflow-y-auto scrollbar-thin pr-1">
            {drives.map((drive) => (
              <div
                key={drive._id}
                className={`glass-card p-4 border rounded-2xl flex flex-col sm:flex-row gap-4 items-start ${
                  drive.active ? "border-emerald-400/30" : "border-slate-300 opacity-60"
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
                      <span className="text-xs text-emerald-600 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-700 line-clamp-2">{drive.description}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
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
                <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => handleToggleDrive(drive._id)}
                    title={drive.active ? "Deactivate" : "Activate"}
                    className="p-2 rounded-lg hover:bg-white/90 transition text-slate-500 hover:text-slate-800"
                  >
                    {drive.active ? (
                      <ToggleRight size={20} className="text-emerald-600" />
                    ) : (
                      <ToggleLeft size={20} />
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteDrive(drive._id)}
                    title="Delete drive"
                    className="p-2 rounded-lg hover:bg-red-500/10 transition text-slate-500 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-white/80 border border-slate-300 flex items-center justify-center mx-auto mb-4">
              <MapPin size={24} className="text-slate-400" />
            </div>
            <p className="text-slate-500 mb-2">No drives published yet</p>
            <button
              onClick={() => setDriveModalOpen(true)}
              className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold"
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
