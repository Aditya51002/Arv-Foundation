import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, MapPin, Clock, FileText, Tag, Image as ImageIcon } from "lucide-react";
import { DRIVE_CATEGORIES } from "../utils/driveStorage.js";
import { API_URL } from "../config";

const AddDriveModal = ({ open, onClose, onPublished }) => {
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    category: "",
    location: "",
    description: "",
    dateTime: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [publishing, setPublishing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPublishing(true);

    try {
      // CHANGED: Use adminToken to match Login logic
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${API_URL}/api/drives`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to publish drive");
      }

      setSuccess(true);
      if (onPublished) onPublished(data);

      setTimeout(() => {
        resetForm();
        onClose();
      }, 1500);

    } catch (err) {
      alert(err.message);
    } finally {
      setPublishing(false);
    }
  };

  const resetForm = () => {
    setForm({ category: "", location: "", description: "", dateTime: "", image: null });
    setImagePreview(null);
    setSuccess(false);
    setPublishing(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Blurred backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto glass-card rounded-2xl border border-white/15 p-6 space-y-5 z-10"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-white">Publish New Drive</h2>
              <p className="text-sm text-white/60">
                Fill in the details to announce an ongoing drive on the website.
              </p>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 space-y-3"
              >
                <div className="h-16 w-16 rounded-full bg-emerald-400/20 border border-emerald-400/30 grid place-items-center">
                  <svg className="h-8 w-8 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-emerald-200">Drive Published!</p>
                <p className="text-sm text-white/60">Visitors will now see this announcement.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Drive Type */}
                <div className="space-y-1.5">
                  <label className="text-sm text-white/70 flex items-center gap-2">
                    <Tag size={14} /> Drive Type
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-300/50 transition appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-neutral-900 text-white/50">
                      Select drive type...
                    </option>
                    {DRIVE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-neutral-900 text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-sm text-white/70 flex items-center gap-2">
                    <MapPin size={14} /> Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Civil Lines, Prayagraj"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300/50 transition"
                  />
                </div>

                {/* Date & Time */}
                <div className="space-y-1.5">
                  <label className="text-sm text-white/70 flex items-center gap-2">
                    <Clock size={14} /> Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="dateTime"
                    value={form.dateTime}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-300/50 transition [color-scheme:dark]"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-sm text-white/70 flex items-center gap-2">
                    <FileText size={14} /> Drive Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Describe the drive, its purpose, and how people can participate..."
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300/50 transition resize-none"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-1.5">
                  <label className="text-sm text-white/70 flex items-center gap-2">
                    <ImageIcon size={14} /> Upload Image
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full rounded-lg border border-dashed border-white/20 bg-white/5 p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/10 transition min-h-[100px]"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-40 rounded-lg object-contain"
                      />
                    ) : (
                      <>
                        <Upload size={24} className="text-white/40" />
                        <p className="text-sm text-white/50">Click to upload an image</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Publish Button */}
                <motion.button
                  type="submit"
                  disabled={publishing}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-300 py-2.5 text-sm font-semibold text-black shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {publishing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Publishing...
                    </span>
                  ) : (
                    "Publish Drive"
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddDriveModal;