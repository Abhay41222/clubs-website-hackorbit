import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = "Are you sure?",
  message = "Do you want to proceed?",
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md px-8 py-7 border border-gray-100 flex flex-col items-center text-center relative"
          >
            <button
              className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-gray-600 text-2xl font-bold focus:outline-none"
              onClick={onCancel}
              aria-label="Close"
            >
              x
            </button>
            <h2 className="text-2xl font-bold text-blue-700 mb-2 tracking-tight">{title}</h2>
            <p className="text-gray-600 mb-6 text-base">{message}</p>
            <div className="flex justify-center gap-3 w-full mt-2">
              <button
                className="flex-1 py-2 rounded-xl cursor-pointer bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-2 rounded-xl bg-blue-600 cursor-pointer text-white font-semibold hover:bg-blue-700 shadow-sm transition-all"
                onClick={onConfirm}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;