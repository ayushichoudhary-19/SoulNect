import { motion, AnimatePresence } from "framer-motion";

const MoodLimitModal = ({ open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
          style={{
            margin:0,
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl text-center"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-3">{"You've reached your limit"}</h2>
            <p className="text-gray-600 mb-4">
             {" You’ve already logged 5 moods in the past hour. Try stepping away, breathing deeply, or journaling for a moment before checking back in."}
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Got it
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MoodLimitModal;
