// ==========================================================
// ADMIN API ENDPOINTS
// GET /api/admin/contributions â€” Fetch all contributions / donations
// ==========================================================

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { logoutAdmin } from "../../utils/adminAuth.js";
import AdminLayout from "../../components/AdminLayout.jsx";
import { API_URL } from "../../config";
import {
  Search,
  Loader2,
  AlertCircle,
  Inbox,
  IndianRupee,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

const AdminContributions = () => {
  const navigate = useNavigate();
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // ================= BACKEND INTEGRATION =================
  // GET /api/admin/contributions
  // Replace the mock below with actual API call, e.g.:
  //   const token = localStorage.getItem("adminToken");
  //   const res = await fetch(`${API_URL}/api/admin/contributions`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const data = await res.json();
  //   if (res.ok) setContributions(data);
  // =======================================================
  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("adminToken");
        const res = await fetch(`http://localhost:5000/api/admin/contributions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.message || "Failed to load contributions.");
        }
        setContributions(Array.isArray(data) ? data : []);
      } catch (_err) {
        setError("Failed to load contributions.");
      } finally {
        setLoading(false);
      }
    };
    fetchContributions();
  }, []);

  // Logout
  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  // ---------- Search ----------
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return contributions;
    const q = searchQuery.toLowerCase();
    return contributions.filter(
      (c) =>
        c.fullName?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.paymentId?.toLowerCase().includes(q) ||
        c.message?.toLowerCase().includes(q)
    );
  }, [contributions, searchQuery]);

  // ---------- Derived stats ----------
  const successCount = contributions.filter((c) => c.status === "success").length;
  const pendingCount = contributions.filter((c) => c.status === "pending").length;
  const failedCount = contributions.filter((c) => c.status === "failed").length;

  // ---------- Helpers ----------
  const StatCard = ({ label, value, color = "text-amber-200" }) => (
    <div className="glass-card p-5 border border-white/10 rounded-2xl">
      <p className="text-xs uppercase tracking-wide text-white/60">{label}</p>
      <p className={`mt-2 text-3xl font-semibold ${color}`}>{value}</p>
    </div>
  );

  const PaymentStatusBadge = ({ status }) => {
    const map = {
      success: {
        icon: <CheckCircle2 size={13} />,
        text: "Success",
        cls: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
      },
      pending: {
        icon: <Clock size={13} />,
        text: "Pending",
        cls: "bg-amber-400/15 text-amber-300 border-amber-400/30",
      },
      failed: {
        icon: <XCircle size={13} />,
        text: "Failed",
        cls: "bg-red-400/15 text-red-300 border-red-400/30",
      },
    };
    const s = map[status] || map.pending;
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${s.cls}`}
      >
        {s.icon} {s.text}
      </span>
    );
  };

  return (
    <AdminLayout
        title="Contributions"
        subtitle="View all donations and contribution submissions."
        onLogout={handleLogout}
      >
        {/* -------- Loading -------- */}
        {loading && (
          <div className="glass-card border border-white/10 rounded-2xl p-16 flex flex-col items-center justify-center gap-4">
            <Loader2 size={36} className="animate-spin text-emerald-300" />
            <p className="text-white/60 text-sm">Loading contributionsâ€¦</p>
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <StatCard label="Total" value={contributions.length} />
              <StatCard label="Success" value={successCount} color="text-emerald-200" />
              <StatCard label="Pending" value={pendingCount} color="text-amber-200" />
              <StatCard label="Failed" value={failedCount} color="text-red-300" />
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
                  placeholder="Search by name, email, payment IDâ€¦"
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
                        <th className="px-4 py-3">Message</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Payment ID</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Status</th>
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
                          <td className="px-4 py-3 text-white/60 max-w-[200px] truncate">
                            {item.message || "â€”"}
                          </td>
                          <td className="px-4 py-3 text-amber-200 font-semibold whitespace-nowrap">
                            {item.amount != null ? (
                              <span className="inline-flex items-center gap-0.5">
                                <IndianRupee size={13} />
                                {Number(item.amount).toLocaleString("en-IN")}
                              </span>
                            ) : (
                              "â€”"
                            )}
                          </td>
                          <td className="px-4 py-3 text-white/50 font-mono text-xs whitespace-nowrap">
                            {item.paymentId || "â€”"}
                          </td>
                          <td className="px-4 py-3 text-white/50 whitespace-nowrap text-xs">
                            {item.date
                              ? new Date(item.date).toLocaleDateString("en-IN", {
                                  dateStyle: "medium",
                                })
                              : "â€”"}
                          </td>
                          <td className="px-4 py-3">
                            <PaymentStatusBadge status={item.status} />
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
                          <PaymentStatusBadge status={item.status} />
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-white/60">
                          <span>Phone: {item.phone}</span>
                          <span className="text-amber-200 font-semibold">
                            {item.amount != null
                              ? `â‚¹${Number(item.amount).toLocaleString("en-IN")}`
                              : "â€”"}
                          </span>
                          <span>
                            ID: {item.paymentId || "â€”"}
                          </span>
                          <span>
                            Date:{" "}
                            {item.date
                              ? new Date(item.date).toLocaleDateString("en-IN", {
                                  dateStyle: "medium",
                                })
                              : "â€”"}
                          </span>
                        </div>
                        {item.message && (
                          <p className="text-xs text-white/50 italic">
                            &ldquo;{item.message}&rdquo;
                          </p>
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
                  No contributions found.
                </p>
              </div>
            )}
          </>
        )}
      </AdminLayout>
  );
};

export default AdminContributions;




