import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Clock, Megaphone } from "lucide-react";
import { getLatestActiveDrive, isDriveDismissed, dismissDrive } from "../utils/driveStorage.js";

const DriveAnnouncementPopup = () => {
  const [drive, setDrive] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const activeDrive = getLatestActiveDrive();
    if (activeDrive && !isDriveDismissed(activeDrive.id)) {
      setDrive(activeDrive);
      setVisible(true);
      // Prevent background scrolling
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    document.body.style.overflow = "";
    if (drive) dismissDrive(drive.id);
  };

  if (!drive) return null;

  const formattedDate = new Date(drive.dateTime).toLocaleString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          {/* Blurred backdrop */}
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(8px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-0 bg-black/70"
            onClick={handleClose}
          />

          {/* Popup card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-md z-10 overflow-hidden rounded-2xl border border-white/15 shadow-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(20,20,30,0.95) 0%, rgba(15,25,20,0.95) 100%)",
            }}
          >
            {/* Accent bar at top */}
            <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-300" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-white/10 border border-white/10 text-white/60 hover:text-white hover:bg-white/20 transition"
            >
              <X size={16} />
            </button>

            {/* Image */}
            {drive.image && (
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={drive.image}
                  alt={drive.category}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Badge + title */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-amber-400/15 border border-amber-400/20 grid place-items-center">
                    <Megaphone size={16} className="text-amber-300" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                    Ongoing Drive
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white">{drive.category}</h2>
              </div>

              {/* Description */}
              <p className="text-sm text-white/75 leading-relaxed">{drive.description}</p>

              {/* Meta info */}
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-white/60">
                  <MapPin size={14} className="text-emerald-300 flex-shrink-0" />
                  <span>{drive.location}</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Clock size={14} className="text-emerald-300 flex-shrink-0" />
                  <span>{formattedDate}</span>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="w-full mt-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-300 py-2.5 text-sm font-semibold text-black shadow-lg hover:shadow-xl transition"
              >
                Got it, Continue to Website
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default DriveAnnouncementPopup;
