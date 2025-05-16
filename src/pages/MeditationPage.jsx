"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import axios from "axios"
import { IconCalendarStats, IconPlayerPlay, IconFlame } from "../components/icons/TablerIcons";
import MeditationStreak from "../components/Meditation/MeditationStreak"
import MeditationHistory from "../components/Meditation/MeditationHistory"

const MeditationPage = () => {
  const [streak, setStreak] = useState({ count: 0, lastDate: null })
  const [recentSessions, setRecentSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false)
        return
      }

      try {
        const [streakResponse, logsResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/meditation/streak/${userId}`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/meditation/logs/${userId}`),
        ])

        setStreak(streakResponse.data)
        setRecentSessions(logsResponse.data.slice(0, 5))
      } catch (error) {
        console.error("Error fetching meditation data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  const formatDuration = (minutes) => {
    if (minutes < 1) {
      const seconds = Math.round(minutes * 60);
      return `${seconds} sec${seconds !== 1 ? "s" : ""}`;
    }
    return `${minutes} min${minutes !== 1 ? "s" : ""}`;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-gray-200 rounded w-3/4 max-w-md"></div>
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Find your peace, one breath at a time</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Take a moment to center yourself and cultivate mindfulness through guided meditation
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Streak Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-purple-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <IconFlame className="mr-2 text-purple-500" size={24} />
              Your Meditation Streak
            </h2>
          </div>

          <MeditationStreak streak={streak} />

          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-2">
              {streak.count > 0
                ? `You've meditated ${streak.count} day${streak.count !== 1 ? "s" : ""} in a row!`
                : "Start your meditation journey today!"}
            </p>
          </div>
        </motion.div>

        {/* Recent Sessions Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-purple-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <IconCalendarStats className="mr-2 text-purple-500" size={24} />
              Recent Sessions
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/meditation/history")}
              className="text-purple-600 text-sm font-medium hover:text-purple-800 transition-colors"
            >
              View Full History
            </motion.button>
          </div>

          {recentSessions.length > 0 ? (
            <div className="space-y-3">
              {recentSessions.map((session, index) => (
                <motion.div
                  key={session._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-purple-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: getThemeColor(session.theme) }}
                    >
                      {getThemeIcon(session.theme)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 capitalize">{session.theme}</p>
                      <p className="text-xs text-gray-500">{formatDate(session.timestamp)}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{formatDuration(session.duration)}</span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              {/* <IconMeditation size={48} className="mx-auto text-purple-300 mb-3" /> */}
              <p className="text-gray-500">No meditation sessions yet</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Start Meditation Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/meditation/start")}
          className="bg-purple-600 text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg hover:bg-purple-700 transition-colors flex items-center mx-auto"
        >
          <IconPlayerPlay size={24} className="mr-2" />
          Start Meditation
        </motion.button>
      </motion.div>

      {/* History Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-16"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Meditation History</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/meditation/history")}
            className="text-purple-600 font-medium hover:text-purple-800 transition-colors flex items-center"
          >
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </div>

        <MeditationHistory limit={10} />
      </motion.div>
    </div>
  )
}

// Helper functions for theme colors and icons
const getThemeColor = (theme) => {
  const themeColors = {
    rain: "#6B7280",
    ocean: "#3B82F6",
    air: "#8B5CF6",
    winter: "#D1D5DB",
    campfire: "#F59E0B",
    space: "#1E293B",
    summer: "#F97316",
    water: "#0EA5E9",
    default: "#8B5CF6",
  }
  return themeColors[theme.toLowerCase()] || themeColors.default
}

const getThemeIcon = (theme) => {
  const iconColor = "text-white"

  switch (theme.toLowerCase()) {
    case "rain":
      return <span className={iconColor}>🌧️</span>
    case "ocean":
      return <span className={iconColor}>🌊</span>
    case "air":
      return <span className={iconColor}>🍃</span>
    case "winter":
      return <span className={iconColor}>❄️</span>
    case "campfire":
      return <span className={iconColor}>🔥</span>
    case "space":
      return <span className={iconColor}>🧿</span>
    case "summer":
      return <span className={iconColor}>☀️</span>
    case "water":
      return <span className={iconColor}>💧</span>
    default:
      return <span className={iconColor}>🧘</span>
  }
}

export default MeditationPage;
