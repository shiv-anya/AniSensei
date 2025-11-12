"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface ToastProps {
  type: "success" | "error" | "warning";
  message: string;
  onClose: () => void;
}

const bgColors = {
  success: "bg-green-400",
  error: "bg-red-400",
  warning: "bg-yellow-400",
};

export default function Toast({ type, message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl shadow-lg text-white flex items-center justify-between w-[90%] sm:w-auto ${bgColors[type]}`}
      >
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 opacity-0 hover:opacity-100 transition-opacity"
        >
          <FaTimes size={18} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
