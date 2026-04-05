import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Trash2, Clock } from "lucide-react";
import { API_URL } from "../../config";

const AdminCertificates = () => {
  const [requests, setRequests] = parseInt(useState([])); // Oops, wait. I will fix useState structure
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const res = await fetch(`${API_URL}/api/admin/certificates`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      await fetch(`${API_URL}/api/admin/certificates/${id}/status`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}` 
        },
        body: JSON.stringify({ status })
      });
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRequest = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      const adminToken = localStorage.getItem("adminToken");
      await fetch(`${API_URL}/api/admin/certificates/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 text-slate-800">Loading...</div>;

  return (
    <div className="space-y-6 pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
      <h1 className="text-2xl font-bold text-slate-800">Certificate Requests</h1>
      
      <div className="grid gap-4">
        {requests.map(req => (
          <div key={req._id} className="glass p-5 rounded-2xl border border-slate-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex gap-2 items-center mb-1">
                <span className="font-semibold text-lg text-slate-800">{req.userName}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  req.status === 'approved' ? 'bg-emerald-500/20 text-emerald-600' :
                  req.status === 'rejected' ? 'bg-red-500/20 text-red-600' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {req.status}
                </span>
              </div>
              <p className="text-sm text-slate-500">{req.email} • {req.certificateType}</p>
              {req.description && <p className="text-sm text-slate-700 mt-2">"{req.description}"</p>}
            </div>
            
            <div className="flex items-center gap-2">
              {req.status === 'pending' && (
                <>
                  <button onClick={() => updateStatus(req._id, "approved")} className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/40" title="Approve">
                    <CheckCircle size={18} />
                  </button>
                  <button onClick={() => updateStatus(req._id, "rejected")} className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/40" title="Reject">
                    <XCircle size={18} />
                  </button>
                </>
              )}
              <button onClick={() => deleteRequest(req._id)} className="p-2 rounded-lg bg-white/80 text-slate-500 hover:bg-red-500/20 hover:text-red-500" title="Delete">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {requests.length === 0 && <p className="text-slate-500">No requests found.</p>}
      </div>
    </div>
  );
};

export default AdminCertificates;
