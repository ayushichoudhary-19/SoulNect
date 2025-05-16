import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "default" // default, danger, warning
}) {
  if (!isOpen) return null;
  
  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          button: "bg-red-500 hover:bg-red-600 text-white",
          icon: "text-red-500"
        };
      case "warning":
        return {
          button: "bg-amber-500 hover:bg-amber-600 text-white",
          icon: "text-amber-500"
        };
      default:
        return {
          button: "bg-purple-500 hover:bg-purple-600 text-white",
          icon: "text-purple-500"
        };
    }
  };
  
  const typeStyles = getTypeStyles();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          
          <div className="flex justify-end gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              {cancelText}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-4 py-2 rounded-lg ${typeStyles.button} transition-colors`}
            >
              {confirmText}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}