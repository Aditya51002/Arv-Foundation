import { motion } from "framer-motion";
import { MapPin, Clock, Megaphone } from "lucide-react";
import { getDrives } from "../utils/driveStorage.js";

const OngoingDrives = () => {
  const drives = getDrives();
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
        className="glass-card p-5 rounded-2xl border border-white/10 hover:border-amber-300/50 transition-colors"
      >
        {drive.image && (
          <div className="w-full h-32 overflow-hidden rounded-lg mb-4">
            <img
              src={drive.image}
              alt={drive.category}
              className="w-full h-full object-cover"
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
        <p className="text-sm text-white/75 leading-relaxed mb-3">{drive.description}</p>
        <div className="flex flex-col gap-1 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <MapPin size={12} className="text-emerald-300 flex-shrink-0" />
            <span>{drive.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={12} className="text-emerald-300 flex-shrink-0" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="section-shell py-12 relative z-20" aria-label="Ongoing Drives">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8 text-center">On Going Drive</h2>

        {ongoingDrives.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6">Present Drives</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingDrives.map((drive) => (
                <DriveCard key={drive.id} drive={drive} isOngoing={true} />
              ))}
            </div>
          </div>
        )}

        {pastDrives.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-6">Past Drives</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastDrives.map((drive) => (
                <DriveCard key={drive.id} drive={drive} isOngoing={false} />
              ))}
            </div>
          </div>
        )}

        {ongoingDrives.length === 0 && pastDrives.length === 0 && (
          <p className="text-center text-white/60">No drives available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default OngoingDrives;