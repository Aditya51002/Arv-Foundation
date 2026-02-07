import { motion } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

export default function QuickDonate({ open, onClose }) {
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
        className="relative w-full max-w-xl p-6 bg-slate-900/90 backdrop-blur-md rounded-lg shadow-2xl border border-white/10 z-[10000]"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/80">
          <X />
        </button>

        <h3 className="text-2xl font-semibold mb-2">Quick Donate</h3>
        <p className="text-sm text-white/80 mb-4">Choose an amount to donate instantly.</p>

        <div className="flex gap-3 mb-4">
          {[250, 500, 1000].map((amt) => (
            <button
              key={amt}
              onClick={() => {
                alert(`Thank you — you chose ₹${amt}. Implement gateway to complete.`);
                onClose();
              }}
              className="px-4 py-2 rounded-full bg-amber-300 text-black font-semibold"
            >
              ₹{amt}
            </button>
          ))}
        </div>

        <div className="mt-2 text-sm text-white/70">Or enter a custom amount</div>
        <div className="flex gap-2 mt-2">
          <input className="flex-1 rounded-lg bg-white/5 border border-white/10 p-2 text-white" placeholder="Amount (₹)" />
          <button
            onClick={() => {
              alert("Custom donate clicked — implement payment flow.");
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-emerald-300 text-black font-semibold"
          >
            Donate
          </button>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modal, document.body);
}
