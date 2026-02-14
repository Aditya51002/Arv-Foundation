// ==========================================================
// ADMIN API ENDPOINTS
// GET    /api/admin/internships        â€” Fetch all applications
// DELETE /api/admin/internships/:id    â€” Delete an application
// ==========================================================

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { logoutAdmin } from "../../utils/adminAuth.js";
import AdminLayout from "../../components/AdminLayout.jsx";
import { API_URL } from "../../config";
import {
  Trash2,
  Download,
  Search,
  Loader2,
  AlertCircle,
  Inbox,
  X,
} from "lucide-react";

const AdminInternships = () => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null); // id to confirm
  const [toast, setToast] = useState(null);

  // ================= BACKEND INTEGRATION =================
  // GET /api/admin/internships
  // Replace the mock below with actual API call, e.g.:
  //   const token = localStorage.getItem("adminToken");
  //   const res = await fetch(`${API_URL}/api/admin/internships`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const data = await res.json();
  //   if (res.ok) setInternships(data);
  // =======================================================
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("adminToken");
        const res = await fetch(`http://localhost:5000/api/admin/internships`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.message || "Failed to load internship applications.");
        }
        setInternships(Array.isArray(data) ? data : []);
      } catch (_err) {
        setError("Failed to load internship applications.");
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, []);

  // Logout
  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  // ---------- Delete ----------
  const confirmDelete = (id) => setDeleteTarget(id);
  const cancelDelete = () => setDeleteTarget(null);

  const handleDeleteInternship = (id) => {
    // ================= BACKEND INTEGRATION =================
    // DELETE /api/admin/internships/:id
    // const token = localStorage.getItem("adminToken");
    // await fetch(`${API_URL}/api/admin/internships/${id}`, {
    //   method: "DELETE",
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // =======================================================

    // Temporary UI removal
    setInternships((prev) => prev.filter((item) => item._id !== id));
    setDeleteTarget(null);
    showToast("Application deleted successfully.");
  };

  // ---------- Toast ----------
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // ---------- Search ----------
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return internships;
    const q = searchQuery.toLowerCase();
    return internships.filter(
      (i) =>
        i.fullName?.toLowerCase().includes(q) ||
        i.email?.toLowerCase().includes(q) ||
        i.college?.toLowerCase().includes(q) ||
        i.areaOfInterest?.toLowerCase().includes(q)
    );
  }, [internships, searchQuery]);

  // ---------- Render helpers ----------
  const StatCard = ({ label, value, color = "text-amber-200" }) => (
    <div className="glass-card p-5 border border-white/10 rounded-2xl">
      <p className="text-xs uppercase tracking-wide text-white/60">{label}</p>
      <p className={`mt-2 text-3xl font-semibold ${color}`}>{value}</p>
    </div>
  );

  return (
    <>
      <AdminLayout
        title="Internship Applications"
        subtitle="View and manage incoming internship requests."
        onLogout={handleLogout}
      >
        {/* -------- Loading -------- */}
        {loading && (
          <div className="glass-card border border-white/10 rounded-2xl p-16 flex flex-col items-center justify-center gap-4">
            <Loader2 size={36} className="animate-spin text-emerald-300" />
            <p className="text-white/60 text-sm">Loading applicationsâ€¦</p>
          </div>
        )}

        {/* -------- Error -------- */}
        {!loading && error && (
          <div className="glass-card border border-red-400/30 rounded-2xl p-8 flex flex-col items-center gap-3">
            <AlertCircle size={32} className="text-red-400" />
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* -------- Content -------- */}
        {!loading && !error && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <StatCard label="Total Applications" value={internships.length} />
              <StatCard
                label="Displayed"
                value={filtered.length}
                color="text-emerald-200"
              />
              <StatCard
                label="Search Active"
                value={searchQuery ? "Yes" : "No"}
                color="text-white/60"
              />
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                />
                <input
                  type="text"
                  placeholder="Search by name, email, college, interestâ€¦"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400/40 transition"
                />
              </div>
            </div>

            {/* Table / Cards */}
            {filtered.length > 0 ? (
              <div className="glass-card border border-white/10 rounded-2xl overflow-hidden">
                <div className="max-h-[600px] overflow-y-auto scrollbar-thin">
                  {/* Desktop table */}
                  <table className="hidden lg:table w-full text-sm text-left">
                    <thead className="sticky top-0 z-10 bg-white/5 backdrop-blur-md">
                      <tr className="text-xs uppercase tracking-wide text-white/50 border-b border-white/10">
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Phone</th>
                        <th className="px-4 py-3">City / State</th>
                        <th className="px-4 py-3">College</th>
                        <th className="px-4 py-3">Field</th>
                        <th className="px-4 py-3">Interest</th>
                        <th className="px-4 py-3">Duration</th>
                        <th className="px-4 py-3">Availability</th>
                        <th className="px-4 py-3">Resume</th>
                        <th className="px-4 py-3">Applied</th>
                        <th className="px-4 py-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((item) => (
                        <tr
                          key={item._id}
                          className="border-b border-white/5 hover:bg-white/[0.03] transition"
                        >
                          <td className="px-4 py-3 text-white/90 font-medium whitespace-nowrap">
                            {item.fullName}
                          </td>
                          <td className="px-4 py-3 text-white/70 whitespace-nowrap">
                            {item.email}
                          </td>
                          <td className="px-4 py-3 text-white/70 whitespace-nowrap">
                            {item.phone}
                          </td>
                          <td className="px-4 py-3 text-white/70 whitespace-nowrap">
                            {item.city}
                          </td>
                          <td className="px-4 py-3 text-white/70 whitespace-nowrap">
                            {item.college}
                          </td>
                          <td className="px-4 py-3 text-white/70 whitespace-nowrap">
                            {item.fieldOfStudy}
                          </td>
                          <td className="px-4 py-3 text-white/70 whitespace-nowrap">
                            {item.areaOfInterest}
                          </td>
                          <td className="px-4 py-3 text-white/70 whitespace-nowrap">
                            {item.preferredDuration}
                          </td>
                          <td className="px-4 py-3 text-white/70 whitespace-nowrap">
                            {item.availability}
                          </td>
                          <td className="px-4 py-3">
                            {item.resumeUrl ? (
                              <a
                                href={item.resumeUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 px-3 py-1 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/20 transition"
                              >
                                <Download size={12} /> Resume
                              </a>
                            ) : (
                              <span className="text-white/30 text-xs">N/A</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-white/50 whitespace-nowrap text-xs">
                            {item.appliedDate
                              ? new Date(item.appliedDate).toLocaleDateString(
                                  "en-IN",
                                  { dateStyle: "medium" }
                                )
                              : "â€”"}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => confirmDelete(item._id)}
                              title="Delete application"
                              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition
                                bg-gradient-to-r from-red-500/80 to-orange-500/80 text-white shadow-lg shadow-red-500/20
                                hover:from-red-500 hover:to-orange-500 hover:shadow-red-500/30"
                            >
                              <Trash2 size={13} /> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Mobile cards */}
                  <div className="lg:hidden space-y-3 p-4">
                    {filtered.map((item) => (
                      <div
                        key={item._id}
                        className="glass-card border border-white/10 rounded-2xl p-4 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-white/90">
                              {item.fullName}
                            </p>
                            <p className="text-xs text-white/50">{item.email}</p>
                          </div>
                          <button
                            onClick={() => confirmDelete(item._id)}
                            className="shrink-0 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition
                              bg-gradient-to-r from-red-500/80 to-orange-500/80 text-white
                              hover:from-red-500 hover:to-orange-500"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-white/60">
                          <span>Phone: {item.phone}</span>
                          <span>City: {item.city}</span>
                          <span>College: {item.college}</span>
                          <span>Field: {item.fieldOfStudy}</span>
                          <span>Interest: {item.areaOfInterest}</span>
                          <span>Duration: {item.preferredDuration}</span>
                          <span>Avail: {item.availability}</span>
                          <span>
                            Applied:{" "}
                            {item.appliedDate
                              ? new Date(item.appliedDate).toLocaleDateString(
                                  "en-IN",
                                  { dateStyle: "medium" }
                                )
                              : "â€”"}
                          </span>
                        </div>
                        {item.resumeUrl && (
                          <a
                            href={item.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 px-3 py-1 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/20 transition mt-1"
                          >
                            <Download size={12} /> Download Resume
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* No data */
              <div className="glass-card border border-white/10 rounded-2xl py-16 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Inbox size={28} className="text-white/30" />
                </div>
                <p className="text-white/50 text-sm">
                  No internship applications found.
                </p>
              </div>
            )}
          </>
        )}
        </AdminLayout>

        {/* -------- Delete Confirmation Modal -------- */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm">
          <div className="glass-card border border-white/15 rounded-2xl p-6 w-full max-w-sm space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Confirm Delete</h3>
              <button
                onClick={cancelDelete}
                className="p-1 rounded-lg hover:bg-white/10 transition text-white/60"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-white/70">
              Are you sure you want to delete this internship application? This
              action cannot be undone.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/15 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteInternship(deleteTarget)}
                className="rounded-full px-4 py-2 text-sm font-semibold transition
                  bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25
                  hover:shadow-red-500/40"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------- Toast -------- */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-[fadeInUp_0.3s_ease] glass-card border border-emerald-400/30 rounded-xl px-5 py-3 text-sm font-medium text-emerald-200 shadow-lg">
          {toast}
        </div>
      )}
    </>
  );
};

export default AdminInternships;


