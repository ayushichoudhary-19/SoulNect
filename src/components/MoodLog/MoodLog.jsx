"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import MoodLogStreak from "./MoodLogStreak";
import MoodDashboard from "../MoodDashboard/moodDashboard";
import { useUser } from "../../store/userContext";
import { motion } from "framer-motion";
import { IconFlame, IconMoodHappy } from "../icons/TablerIcons";
import MoodLimitModal from "./MoodLimitModal";

const moodImages = {
  "very happy":
    "https://cdn.shopify.com/s/files/1/1061/1924/files/Smiling_Emoji_with_Smiling_Eyes.png?9898922749706957214",
  happy:
    "https://emojiisland.com/cdn/shop/products/Smiling_Face_Emoji_with_Blushed_Cheeks_large.png?v=1571606036",
  neutral:
    "https://cdn.shopify.com/s/files/1/1061/1924/files/Neutral_Face_Emoji.png?9898922749706957214",
  sad: "https://cdn.shopify.com/s/files/1/1061/1924/files/Sad_Face_Emoji.png?9898922749706957214",
  "very sad":
    "https://cdn.shopify.com/s/files/1/1061/1924/files/Crying_Face_Emoji.png?9898922749706957214",
};

const MoodLog = () => {
  const { user } = useUser()
  const userId = user?.userId
  const [selectedMood, setSelectedMood] = useState(null)
  const [streakData, setStreakData] = useState([])
  const [loading, setLoading] = useState(true)
  const [moodLogs, setMoodLogs] = useState([])
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchMoodData();
    } else {
      setLoading(false);
    }
  }, [userId])

  const fetchMoodData = async () => {
    try {
      setLoading(true);
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/moodlog/${userId}?timezone=${timezone}`);
      const logs = response.data;
      setMoodLogs(logs);
  
      try {
        const sortedLogs = [...logs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        if (sortedLogs[0]?.mood) {
          setSelectedMood(sortedLogs[0].mood);
        } else {
          setSelectedMood(null);
        }
      } catch (err) {
        console.warn("Error parsing latest mood:", err);
        setSelectedMood(null);
      }
  
      const streakResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/moodlog/streak/${userId}?timezone=${timezone}`);
      setStreakData(streakResponse.data);
    } catch (error) {
      setSelectedMood(null);
    } finally {
      setLoading(false);
    }
  };
  

  const handleClick = async (mood) => {
    if (!userId) {
      toast.error("Please log in to select a mood.", { position: "top-right" });
      return;
    }

    setSelectedMood(mood);
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/moodlog`, {
        userId,
        mood,
      });
  
      const moodLog = response.data;
  
      if (moodLog) {
        toast.success(`Mood "${mood}" saved successfully!`, { position: "top-right" });
      
        setMoodLogs(prev => [moodLog, ...prev]);
        setSelectedMood(mood);
      
        setTimeout(fetchMoodData, 300);
      }    
    } catch (err) {
      if (err?.response?.data?.message?.includes("limit")) {
        setLimitReached(true);
      } else {
        toast.error("Something went wrong. Please try again.", { position: "top-right" });
      }      
      setTimeout(fetchMoodData, 200);
    }
  };
  

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-gray-200 rounded w-3/4 max-w-md"></div>
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-purple-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <span className="mr-2 text-purple-500">
                <IconFlame />
              </span>
              Your Weekly Streak
            </h2>
          </div>

          <MoodLogStreak />

          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-2">
              {streakData.length > 0
                ? `You've logged your mood ${streakData.length} day${
                    streakData.length !== 1 ? "s" : ""
                  } in a row!`
                : "Start your mood tracking journey today!"}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-purple-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <span className="mr-2 text-purple-500">
                <IconMoodHappy />
              </span>
              Recent Mood
            </h2>
          </div>

          {selectedMood ? (
            <div className="flex flex-col items-center justify-center">
              <img src={moodImages[selectedMood]} alt={selectedMood} className="w-24 h-24 mb-4" />
              <p className="text-lg font-medium text-gray-800 capitalize">{selectedMood}</p>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">No mood logged today</p>
            </div>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm p-6 border border-purple-100"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">How are you feeling right now?</h2>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {Object.entries(moodImages).map(([mood, image]) => (
            <motion.button
              key={mood}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(mood)}
              className={`flex flex-col items-center p-4 rounded-xl transition-all ${
                selectedMood === mood
                  ? "bg-purple-100 border-2 border-purple-300"
                  : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <img src={image} alt={mood} className="w-12 h-12 mb-2" />
              <span className="text-sm font-medium capitalize">{mood}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-16"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Mood Insights</h2>
        </div>
        <MoodDashboard />
      </motion.div>
      <MoodLimitModal open={limitReached} onClose={() => setLimitReached(false)} />
    </div>
  );
};

export default MoodLog;
