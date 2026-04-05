// ==========================================================
// ADMIN API ENDPOINTS
// GET   /api/admin/partnerships        - Fetch all partnership requests
// PATCH /api/admin/partnerships/:id    - Toggle active / inactive status
// ==========================================================

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { logoutAdmin } from "../../utils/adminAuth.js";
import AdminLayout from "../../components/AdminLayout.jsx";
import { API_URL } from "../../config";
import {
  ToggleLeft,
  ToggleRight,
  Search,
  Loader2,
  AlertCircle,
  Inbox,
  Filter,
} from "lucide-react";

const AdminPartnerships = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "active" | "inactive"

  // ================= BACKEND INTEGRATION =================
  // GET /api/admin/partnerships
  // Replace the mock below with actual API call, e.g.:
  //   const token = localStorage.getItem("adminToken");
  //   const res = await fetch(`${API_URL}/api/admin/partnerships`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const data = await res.json();
  //   if (res.ok) setPartners(data);
  // =======================================================
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("adminToken");
        const res = await fetch(`http://localhost:5000/api/admin/partnerships`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.message || "Failed to load partnership requests.");
        }
        setPartners(Array.isArray(data) ? data : []);
      } catch (_err) {
        setError("Failed to load partnership requests.");
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  // Logout
  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  // ---------- Toggle Status ----------
  const handleToggleStatus = (id) => {
    setPartners((prev) =>
      prev.map((p) =>
        p._id === id
          ? { ...p, status: p.status === "active" ? "inactive" : "active" }
          : p
      )
    );

    // ================= BACKEND INTEGRATION =================
    // PATCH /api/admin/partnerships/:id
    // Body: { status: "active" or "inactive" }
    // const token = localStorage.getItem("adminToken");
    // await fetch(`${API_URL}/api/admin/partnerships/${id}`, {
    //   method: "PATCH",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ status: newStatus }),
    // });
    // =======================================================
  };

  // ---------- Search + Filter ----------
  const filtered = useMemo(() => {
    let result = partners;

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.organizationName?.toLowerCase().includes(q) ||
          p.contactPerson?.toLowerCase().includes(q) ||
          p.email?.toLowerCase().includes(q) ||
          p.focusCategories?.some((c) => c.toLowerCase().includes(q))
      );
    }
    return result;
  }, [partners, searchQuery, statusFilter]);

  const activeCount = partners.filter((p) => p.status === "active").length;
  const inactiveCount = partners.length - activeCount;

  // ---------- Render helpers ----------
  const StatCard = ({ label, value, color = "text-amber-600" }) => (
    <div className="glass-card p-3 sm:p-5 border border-slate-300 rounded-2xl">
      <p className="text-[10px] sm:text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-1 sm:mt-2 text-xl sm:text-3xl font-semibold ${color}`}>{value}</p>
    </div>
  );

  const StatusBadge = ({ status }) => {
    const isActive = status === "active";
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold
          ${
            isActive
              ? "bg-emerald-400/15 text-emerald-600 border border-emerald-400/30 shadow-[0_0_8px_rgba(52,211,153,0.25)]"
              : "bg-white/80 text-slate-500 border border-slate-300"
          }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isActive ? "bg-emerald-400" : "bg-white/30"
          }`}
        />
        {isActive ? "Active" : "Inactive"}
      </span>
    );
  };

  return (
    <AdminLayout
        title="Partnership Requests"
        subtitle="Manage incoming partnership & collaboration proposals."
        onLogout={handleLogout}
      >
        {/* -------- Loading -------- */}
        {loading && (
          <div className="glass-card border border-slate-300 rounded-2xl p-16 flex flex-col items-center justify-center gap-4">
            <Loader2 size={36} className="animate-spin text-emerald-600" />
            <p className="text-slate-500 text-sm">Loading partnership requests…</p>
          </div>
        )}

        {/* -------- Error -------- */}
        {!loading && error && (
          <div className="glass-card border border-red-400/30 rounded-2xl p-8 flex flex-col items-center gap-3">
            <AlertCircle size={32} className="text-red-500" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* -------- Content -------- */}
        {!loading && !error && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <StatCard label="Total Requests" value={partners.length} />
              <StatCard label="Active" value={activeCount} color="text-emerald-700" />
              <StatCard label="Inactive" value={inactiveCount} color="text-slate-500" />
            </div>

            {/* Search + Filter bar */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search by organization, contact, emailâ€¦"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white/80 pl-9 pr-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-400/40 transition"
                />
              </div>

              <div className="relative">
                <Filter
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none rounded-xl border border-slate-300 bg-white/80 pl-8 pr-8 py-2 text-sm text-slate-800 focus:outline-none focus:border-emerald-400/40 transition cursor-pointer"
                >
                  <option value="all" className="bg-white">All</option>
                  <option value="active" className="bg-white">Active</option>
                  <option value="inactive" className="bg-white">Inactive</option>
                </select>
              </div>
            </div>

            {/* Cards */}
            {filtered.length > 0 ? (
              <div className="space-y-3 sm:space-y-4 max-h-[55vh] sm:max-h-[650px] overflow-y-auto scrollbar-thin pr-1">
                {filtered.map((partner) => (
                  <div
                    key={partner._id}
                    className={`glass-card border rounded-2xl p-5 space-y-3 transition ${
                      partner.status === "active"
                        ? "border-emerald-400/30"
                        : "border-slate-300 opacity-70"
                    }`}
                  >
                    {/* Header row */}
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold text-slate-800">
                          {partner.organizationName}
                        </h3>
                        <p className="text-xs text-slate-500">
                          Contact: {partner.contactPerson} &middot;{" "}
                          {partner.email} &middot; {partner.phone}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <StatusBadge status={partner.status} />
                        <button
                          onClick={() => handleToggleStatus(partner._id)}
                          title={
                            partner.status === "active"
                              ? "Set Inactive"
                              : "Set Active"
                          }
                          className="p-2 rounded-lg hover:bg-white/90 transition text-slate-500 hover:text-slate-800"
                        >
                          {partner.status === "active" ? (
                            <ToggleRight size={22} className="text-emerald-600" />
                          ) : (
                            <ToggleLeft size={22} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Categories */}
                    {partner.focusCategories?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {partner.focusCategories.map((cat, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-emerald-500/10 border border-emerald-400/20 px-3 py-0.5 text-xs text-emerald-700"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-sm text-slate-600">
                      {partner.description && (
                        <p className="sm:col-span-2 lg:col-span-3 text-slate-500 text-xs leading-relaxed">
                          {partner.description}
                        </p>
                      )}
                      <div>
                        <span className="text-slate-400 text-xs">Duration:</span>{" "}
                        {partner.duration || "—"}
                      </div>
                      <div>
                        <span className="text-slate-400 text-xs">Expected Scale:</span>{" "}
                        {partner.expectedScale || "—"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* No data */
              <div className="glass-card border border-slate-300 rounded-2xl py-16 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-white/80 border border-slate-300 flex items-center justify-center">
                  <Inbox size={28} className="text-slate-400" />
                </div>
                <p className="text-slate-500 text-sm">
                  No partnership requests found.
                </p>
              </div>
            )}
          </>
        )}
      </AdminLayout>
  );
};

export default AdminPartnerships;




