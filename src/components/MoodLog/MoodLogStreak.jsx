"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const MoodLogStreak = () => {
  const [streakData, setStreakData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchStreakData(userId);
    } else {
      setStreakData(generateDefaultStreakData());
      setLoading(false);
    }
  }, []);

  const fetchStreakData = async (userId) => {
    try {
      setLoading(true);
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/moodlog/streak/${userId}?timezone=${timezone}`
      );
      setStreakData(response.data);
    } catch (error) {
      toast.error("Failed to fetch streak data");
    } finally {
      setLoading(false);
    }
  };

  const generateDefaultStreakData = () => {
    const weekDays = [];
    for (let i = 5; i >= -1; i--) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      const formattedDate = day.toISOString().split("T")[0];
      weekDays.push({ date: formattedDate, count: 0 });
    }
    return weekDays;
  };

  const getColor = (count) => {
    if (count === 1) return "#90EE90";
    if (count === 2) return "#32CD32";
    if (count >= 3) return "#006400";
    return "white";
  };

  const renderWeek = () => {
    const weekDays = [];
    for (let i = 5; i >= -1; i--) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      weekDays.push(day);
    }

    return weekDays.map((day, index) => {
      const formattedDate = day.toISOString().split("T")[0];
      const dayData = streakData.find((d) => d.date === formattedDate);
      const count = dayData ? dayData.count : 0;

      const tooltipText =
        count > 0
          ? `Logged ${count} time${
              count > 1 ? "s" : ""
            } on ${day.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}`
          : "No mood logged";

      return (
        <motion.div
          key={formattedDate}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 rounded-md mb-1 border cursor-pointer shadow-sm transition-all duration-200"
            style={{ backgroundColor: getColor(count) }}
            data-tooltip-id={`tooltip-${formattedDate}`}
            data-tooltip-content={tooltipText}
          />
          <Tooltip id={`tooltip-${formattedDate}`} />
          <span className="text-xs font-medium text-gray-600">
            {day.toLocaleDateString("en-US", { weekday: "short" })}
          </span>
        </motion.div>
      );
    });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-pulse flex flex-col items-center">
          <div className="flex gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-8 h-8 bg-gray-200 rounded-md"></div>
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col justify-center items-center px-0 md:px-7 py-4 transition duration-300 ease-in-out bg-white"
      >
        <div className="flex justify-between gap-1 md:gap-3">
          {renderWeek()}
        </div>
      </motion.div>
    </div>
  );
};

export default MoodLogStreak;
