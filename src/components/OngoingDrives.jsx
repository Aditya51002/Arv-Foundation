import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Megaphone, Loader2 } from "lucide-react";
// Import the new API utility instead of storage
import { getDrives } from "../utils/driveApi.js"; 

const OngoingDrives = () => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        setLoading(true);
        // This now fetches from your /api/drives/public endpoint
        const data = await getDrives();
        setDrives(data);
      } catch (error) {
        console.error("Failed to load drives:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrives();
  }, []);

  // Use MongoDB _id for filtering since that's what the backend sends
  const ongoingDrives = drives.filter(d => d.active);
  const pastDrives = drives.filter(d => !d.active);

  const DriveCard = ({ drive, isOngoing }) => {
    const formattedDate = new Date(drive.dateTime).toLocaleString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-card p-5 rounded-2xl border border-white/10 hover:border-amber-300/50 transition-all group"
      >
        {drive.image && (
          <div className="w-full h-40 overflow-hidden rounded-xl mb-4">
            <img
              src={drive.image}
              alt={drive.category}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="flex items-center gap-2 mb-2">
          <div className="h-6 w-6 rounded-lg bg-amber-400/15 border border-amber-400/20 grid place-items-center">
            <Megaphone size={12} className="text-amber-300" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
            {isOngoing ? "Ongoing Drive" : "Past Drive"}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{drive.category}</h3>
        <p className="text-sm text-white/75 leading-relaxed mb-4 line-clamp-3">
          {drive.description}
        </p>
        
        <div className="space-y-2 pt-3 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <MapPin size={14} className="text-emerald-400 flex-shrink-0" />
            <span className="truncate">{drive.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Clock size={14} className="text-emerald-400 flex-shrink-0" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Loader2 className="animate-spin mx-auto text-amber-400 mb-4" size={32} />
        <p className="text-white/40">Loading drives from database...</p>
      </div>
    );
  }

  return (
    <section className="section-shell py-12 relative z-20" aria-label="Ongoing Drives">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Ongoing Initiatives</h2>
          <div className="h-1 w-20 bg-amber-400 mx-auto rounded-full"></div>
        </div>

        {ongoingDrives.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-6 text-emerald-300">Present Drives</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingDrives.map((drive) => (
                <DriveCard key={drive._id} drive={drive} isOngoing={true} />
              ))}
            </div>
          </div>
        )}

        {pastDrives.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white/60">Past Drives</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80">
              {pastDrives.map((drive) => (
                <DriveCard key={drive._id} drive={drive} isOngoing={false} />
              ))}
            </div>
          </div>
        )}

        {drives.length === 0 && (
          <div className="glass-card p-10 rounded-3xl border border-white/5 text-center">
             <p className="text-white/60 italic">No drives are currently published.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OngoingDrives;