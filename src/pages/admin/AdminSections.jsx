import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout.jsx";
import {
  fetchSections,
  toggleSection,
  moveSection
} from "../../utils/sectionApi.js";

const AdminSections = ({ onLogout }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load sections from backend
  const loadSections = async () => {
    try {
      const data = await fetchSections();
      setSections(data);
    } catch (error) {
      console.error("Failed to load sections:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSections();
  }, []);

  // Toggle active/hidden
  const handleToggle = async (id) => {
    try {
      await toggleSection(id);
      loadSections(); // refresh list
    } catch (error) {
      console.error(error.message);
    }
  };

  // Move up/down
  const handleMove = async (id, direction) => {
    try {
      await moveSection(id, direction);
      loadSections(); // refresh list
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="section-shell pb-12">
      <AdminLayout
        title="Page Sections"
        subtitle="Control visibility and order of homepage sections."
        onLogout={onLogout}
      >
        <div className="glass-card border border-white/10 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 divide-y divide-white/10">

            {loading && (
              <div className="p-6 text-sm text-white/60">
                Loading sections...
              </div>
            )}

            {!loading && sections.length === 0 && (
              <div className="p-6 text-sm text-white/60">
                No sections found.
              </div>
            )}

            {sections.map((section) => (
              <div
                key={section._id}
                className="p-4 flex flex-wrap items-center justify-between gap-4"
              >
                <div>
                  <p className="text-sm font-semibold">{section.title}</p>
                  <p className="text-xs text-white/60">
                    Status:{" "}
                    {section.status === "active" ? "Active" : "Hidden"}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">

                  {/* Toggle Button */}
                  <button
                    type="button"
                    onClick={() => handleToggle(section._id)}
                    className="rounded-full border border-emerald-300/40 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200 hover:bg-emerald-400/20 transition"
                  >
                    {section.status === "active" ? "Hide" : "Activate"}
                  </button>

                  {/* Move Up */}
                  <button
                    type="button"
                    onClick={() => handleMove(section._id, "up")}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition"
                  >
                    Up
                  </button>

                  {/* Move Down */}
                  <button
                    type="button"
                    onClick={() => handleMove(section._id, "down")}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition"
                  >
                    Down
                  </button>

                </div>
              </div>
            ))}

          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminSections;
