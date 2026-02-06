import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function QuickVolunteer({ open, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!open) return null;

  const modal = (
    <div className="fixed inset-0 z-[9999] grid place-items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[9999]"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        className="relative w-full max-w-lg p-6 bg-slate-900/90 backdrop-blur-md rounded-lg shadow-2xl border border-white/10 z-[10000]"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/80">
          <X />
        </button>

        <h3 className="text-2xl font-semibold mb-2">Volunteer</h3>
        <p className="text-sm text-white/80 mb-4">Tell us how you'd like to help — we'll follow up.</p>

        <div className="grid gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg bg-white/5 border border-white/10 p-2 text-white"
            placeholder="Your name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg bg-white/5 border border-white/10 p-2 text-white"
            placeholder="Email"
          />
          <textarea className="rounded-lg bg-white/5 border border-white/10 p-2 text-white" placeholder="How you can help (optional)" />

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-lg border border-white/10">Cancel</button>
            <button
              onClick={() => {
                console.log({ name, email });
                alert("Thanks — we'll be in touch (this is a demo flow).");
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-amber-300 text-black font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modal, document.body);
}
