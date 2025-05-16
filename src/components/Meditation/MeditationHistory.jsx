"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { IconMoodSmile } from "../icons/TablerIcons";

const MeditationHistory = ({ limit, filters = {} }) => {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchSessions = async () => {
      if (!userId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/meditation/logs/${userId}`)
        let filteredSessions = response.data

        if (filters.theme) {
          filteredSessions = filteredSessions.filter(
            (session) => session.theme.toLowerCase() === filters.theme.toLowerCase(),
          )
        }

        if (filters.duration) {
          const duration = Number.parseInt(filters.duration)
          filteredSessions = filteredSessions.filter((session) => session.duration === duration)
        }

        if (filters.mood) {
          filteredSessions = filteredSessions.filter(
            (session) => session.mood && session.mood.toLowerCase() === filters.mood.toLowerCase(),
          )
        }

        // Apply limit if provided
        if (limit) {
          filteredSessions = filteredSessions.slice(0, limit)
        }

        setSessions(filteredSessions)
      } catch (error) {
        console.error("Error fetching meditation sessions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [userId, limit, filters.theme, filters.duration, filters.mood])

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-100 h-20 rounded-lg"></div>
        ))}
      </div>
    )
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No meditation sessions found</p>
        {Object.values(filters).some(Boolean) && (
          <p className="text-sm text-gray-400 mt-2">Try adjusting your filters</p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {sessions.map((session, index) => (
          <motion.div
            key={session._id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-4 text-white"
                  style={{ backgroundColor: getThemeColor(session.theme) }}
                >
                  {getThemeEmoji(session.theme)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 capitalize">{session.theme}</h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(session.timestamp)} at {formatTime(session.timestamp)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-medium text-gray-700">
                  {session.duration < 1 
                    ? `${Math.round(session.duration * 60)} sec` 
                    : `${session.duration} min`}
                </span>
                {session.mood && (
                  <div className="flex items-center text-sm text-gray-500 mt-1 justify-end">
                    <IconMoodSmile size={16} className="mr-1" />
                    {session.mood}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Helper functions for theme colors and emojis
const getThemeColor = (theme) => {
  if (!theme) return "#8B5CF6" // Default purple

  const themeColors = {
    rain: "#6B7280",
    ocean: "#3B82F6",
    air: "#8B5CF6",
    winter: "#D1D5DB",
    campfire: "#F59E0B",
    space: "#1E293B",
    summer: "#F97316",
    water: "#0EA5E9",
  }

  return themeColors[theme.toLowerCase()] || "#8B5CF6"
}

const getThemeEmoji = (theme) => {
  if (!theme) return "🧘"

  const themeEmojis = {
    rain: "🌧️",
    ocean: "🌊",
    air: "🍃",
    winter: "❄️",
    campfire: "🔥",
    space: "🧿",
    summer: "☀️",
    water: "💧",
  }

  return themeEmojis[theme.toLowerCase()] || "🧘"
}

export default MeditationHistory
