import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { IconChevronLeft, IconChevronRight } from "../icons/TablerIcons";
import toast from "react-hot-toast";
import { avatarMap } from "../../utils/avatarMap";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentAvatar, setCurrentAvatar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState(null);

  const avatarKeys = Object.keys(avatarMap);
  const avatarUrls = Object.values(avatarMap);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      navigate("/signin");
    } else {
      setUserId(storedUserId);
    }
  }, [navigate]);

  const handlePrevious = () => {
    setCurrentAvatar((prev) => (prev === 0 ? avatarUrls.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentAvatar((prev) => (prev === avatarUrls.length - 1 ? 0 : prev + 1));
  };

  const handleSelectAvatar = async () => {
    if (!userId) return;

    setIsSubmitting(true);
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/avatar`, {
        userId,
        avatar: avatarKeys[currentAvatar],
      });
      toast.success("Avatar set successfully");
      navigate("/home");
    } catch (error) {
      toast.error("Failed to set avatar");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-800  flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Choose Your Avatar
        </h1>
        <p className="text-purple-100">
          Select an avatar that represents you in the community
        </p>
      </motion.div>

      <div className="flex items-center justify-center w-full max-w-md">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevious}
          className="bg-white/20 p-3 rounded-full text-white mr-6"
        >
          <IconChevronLeft size={24} />
        </motion.button>

        <div className="relative">
          <motion.div
            className="w-40 h-40 md:w-48 md:h-48 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            key={currentAvatar}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentAvatar}
                src={avatarUrls[currentAvatar]}
                alt="Avatar"
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className="bg-white/20 p-3 rounded-full text-white ml-6"
        >
          <IconChevronRight size={24} />
        </motion.button>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSelectAvatar}
        disabled={isSubmitting}
        className="mt-12 bg-white text-purple-700 px-8 py-3 rounded-xl font-medium shadow-lg hover:bg-purple-50 transition-colors flex items-center"
      >
        {isSubmitting ? (
          <svg
            className="animate-spin h-5 w-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          "This is Perfect for Me!"
        )}
      </motion.button>
    </div>
  );
};

export default Onboarding;
