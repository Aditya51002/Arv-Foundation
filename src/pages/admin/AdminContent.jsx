import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Edit3, 
  Save, 
  X, 
  Search, 
  Loader2, 
  AlertCircle, 
  Type, 
  FileText, 
  RotateCcw,
  CheckCircle,
  Filter,
  Book
} from "lucide-react";
import AdminLayout from "../../components/AdminLayout.jsx";
import { fetchAllContent, updateContent, batchUpdateContent, resetContentToDefaults, getContentStats } from "../../utils/contentApi.js";
import { 
  getContentPages, 
  getContentSections, 
  getContentFields, 
  getContentLabel 
} from "../../data/contentSlots.js";

const AdminContent = ({ onLogout }) => {
  // State management
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPage, setSelectedPage] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [stats, setStats] = useState({ total: 0, filled: 0, empty: 0, percentage: 0 });
  const [toast, setToast] = useState(null);
  
  // Form refs
  const textareaRef = useRef(null);
  const inputRef = useRef(null);

  // Load content data
  const loadContent = async () => {
    try {
      setLoading(true);
      const [contentData, statsData] = await Promise.all([
        fetchAllContent(),
        getContentStats()
      ]);
      setContent(contentData);
      setStats(statsData);
    } catch (error) {
      console.error("Failed to load content:", error);
      showToast("Failed to load content data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (editModal && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`;
    }
  }, [editModal?.value]);

  // Focus input when modal opens
  useEffect(() => {
    if (editModal) {
      const focusTarget = editModal.type === 'text' ? inputRef.current : textareaRef.current;
      if (focusTarget) {
        setTimeout(() => focusTarget.focus(), 100);
      }
    }
  }, [editModal]);

  // Toast notification
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle content editing
  const handleEdit = (contentKey) => {
    const contentItem = content[contentKey];
    const label = getContentLabel(contentKey);
    
    setEditModal({
      key: contentKey,
      value: contentItem?.value || "",
      type: contentItem?.type || "text",
      label: label,
      originalValue: contentItem?.value || ""
    });
  };

  const handleSave = async () => {
    if (!editModal) return;

    // Check if content actually changed
    if (editModal.value === editModal.originalValue) {
      setEditModal(null);
      return;
    }

    setSaving(true);
    try {
      await updateContent(editModal.key, editModal.value, editModal.type);
      await loadContent(); // Refresh the data
      setEditModal(null);
      showToast("Content updated successfully!");
    } catch (error) {
      console.error("Failed to save content:", error);
      showToast("Failed to save content", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async (page = null) => {
    const confirmMessage = page 
      ? `Are you sure you want to reset all ${page} content to defaults?`
      : "Are you sure you want to reset ALL content to defaults?";
    
    if (!confirm(confirmMessage)) return;

    setSaving(true);
    try {
      await resetContentToDefaults(page);
      await loadContent();
      showToast(page ? `${page} content reset successfully!` : "All content reset successfully!");
    } catch (error) {
      console.error("Failed to reset content:", error);
      showToast("Failed to reset content", "error");
    } finally {
      setSaving(false);
    }
  };

  // Filter content based on search and page/section selection
  const filteredContent = Object.entries(content).filter(([key, item]) => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const label = getContentLabel(key).toLowerCase();
      const value = item?.value?.toLowerCase() || "";
      if (!label.includes(searchLower) && !value.includes(searchLower)) {
        return false;
      }
    }

    // Page filter
    if (selectedPage && !key.startsWith(`${selectedPage}:`)) {
      return false;
    }

    // Section filter
    if (selectedSection && !key.includes(`:${selectedSection}:`)) {
      return false;
    }

    return true;
  });

  const pages = getContentPages();

  return (
    <AdminLayout
      title="Content Management"
      subtitle="Edit all website content from one place"
      onLogout={onLogout}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="glass-card p-3 sm:p-4 border border-white/10 rounded-2xl">
          <p className="text-[10px] sm:text-xs uppercase tracking-wide text-white/60">Total Content</p>
          <p className="mt-1 text-xl sm:text-2xl font-semibold text-amber-200">{stats.total}</p>
        </div>
        <div className="glass-card p-3 sm:p-4 border border-white/10 rounded-2xl">
          <p className="text-[10px] sm:text-xs uppercase tracking-wide text-white/60">Filled</p>
          <p className="mt-1 text-xl sm:text-2xl font-semibold text-emerald-200">{stats.filled}</p>
        </div>
        <div className="glass-card p-3 sm:p-4 border border-white/10 rounded-2xl">
          <p className="text-[10px] sm:text-xs uppercase tracking-wide text-white/60">Empty</p>
          <p className="mt-1 text-xl sm:text-2xl font-semibold text-red-200">{stats.empty}</p>
        </div>
        <div className="glass-card p-3 sm:p-4 border border-white/10 rounded-2xl">
          <p className="text-[10px] sm:text-xs uppercase tracking-wide text-white/60">Complete</p>
          <p className="mt-1 text-xl sm:text-2xl font-semibold text-white/90">{stats.percentage}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:items-center sm:gap-3 mb-4 sm:mb-6">
        <div className="relative flex-1 min-w-0 sm:max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-4 py-2.5 sm:py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400/40 transition"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <select 
            value={selectedPage} 
            onChange={(e) => { setSelectedPage(e.target.value); setSelectedSection(""); }}
            className="flex-1 sm:flex-none rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-2 text-sm text-white focus:outline-none focus:border-emerald-400/40 transition appearance-none"
          >
            <option value="">All Pages</option>
            {pages.map(page => (
              <option key={page.value} value={page.value}>{page.label}</option>
            ))}
          </select>

          {selectedPage && (
            <select 
              value={selectedSection} 
              onChange={(e) => setSelectedSection(e.target.value)}
              className="flex-1 sm:flex-none rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-2 text-sm text-white focus:outline-none focus:border-emerald-400/40 transition appearance-none"
            >
              <option value="">All Sections</option>
              {getContentSections(selectedPage).map(section => (
                <option key={section.value} value={section.value}>{section.label}</option>
              ))}
            </select>
          )}

          <button
            onClick={() => handleReset(selectedPage || null)}
            disabled={saving}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl border border-red-400/30 bg-red-500/10 text-red-200 hover:bg-red-500/20 transition disabled:opacity-50"
          >
            <RotateCcw size={14} />
            Reset {selectedPage ? selectedPage : "All"}
          </button>
        </div>
      </div>

      {/* Content List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-amber-400" size={32} />
        </div>
      ) : (
        <div className="glass-card border border-white/10 rounded-2xl overflow-hidden">
          <div className="max-h-[60vh] sm:max-h-[600px] overflow-y-auto scrollbar-thin">
            {filteredContent.length > 0 ? (
              <div className="divide-y divide-white/5">
                {filteredContent.map(([key, item]) => {
                  const label = getContentLabel(key);
                  const hasContent = item?.value && item.value.trim();
                  const typeIcon = item?.type === 'text' ? Type : 
                                  item?.type === 'textarea' ? FileText : Book;
                  const TypeIcon = typeIcon;

                  return (
                    <div key={key} className="p-4 hover:bg-white/[0.02] transition">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <TypeIcon size={14} className="text-white/40 shrink-0" />
                            <h3 className="text-sm font-semibold text-white/90 truncate">
                              {label}
                            </h3>
                            {hasContent ? (
                              <CheckCircle size={12} className="text-emerald-400 shrink-0" />
                            ) : (
                              <AlertCircle size={12} className="text-red-400 shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-white/50 mb-2">{key}</p>
                          <div className="text-sm text-white/70 line-clamp-2">
                            {hasContent ? item.value : "No content set"}
                          </div>
                        </div>
                        <button
                          onClick={() => handleEdit(key)}
                          className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl border border-emerald-400/30 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20 transition"
                        >
                          <Edit3 size={12} />
                          Edit
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-16 flex flex-col items-center gap-3">
                <AlertCircle size={32} className="text-white/30" />
                <p className="text-white/50 text-sm">No content found matching your filters</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editModal && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="glass-card w-full sm:max-w-2xl max-h-[85vh] overflow-y-auto p-5 sm:p-6 rounded-t-3xl sm:rounded-3xl border border-white/10"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-xl text-white mb-1">Edit Content</h3>
                  <p className="text-sm text-white/60">{editModal.label}</p>
                </div>
                <button
                  onClick={() => setEditModal(null)}
                  className="p-1 rounded-lg hover:bg-white/10 transition text-white/60"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {editModal.type === 'text' ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={editModal.value}
                    onChange={(e) => setEditModal(prev => ({ ...prev, value: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400/40 transition"
                    placeholder="Enter content..."
                  />
                ) : (
                  <textarea
                    ref={textareaRef}
                    value={editModal.value}
                    onChange={(e) => setEditModal(prev => ({ ...prev, value: e.target.value }))}
                    rows={6}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400/40 transition resize-none"
                    placeholder="Enter content..."
                    style={{ height: 'auto', minHeight: '120px' }}
                  />
                )}

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setEditModal(null)}
                    disabled={saving}
                    className="px-6 py-2 text-sm font-semibold rounded-xl border border-white/15 bg-white/10 text-white/80 hover:bg-white/15 transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-6 py-2 text-sm font-semibold rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition disabled:opacity-50"
                  >
                    {saving ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Save size={14} />
                    )}
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className={`fixed bottom-6 right-6 z-50 glass-card border rounded-xl px-5 py-3 text-sm font-medium shadow-lg ${
              toast.type === 'error' 
                ? 'border-red-400/30 text-red-200' 
                : 'border-emerald-400/30 text-emerald-200'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default AdminContent;