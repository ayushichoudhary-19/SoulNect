"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { IconArrowLeft, IconFilter, IconCalendarStats } from "../components/icons/TablerIcons"
import MeditationHistory from "../components/Meditation/MeditationHistory"
import MeditationCalendar from "../components/Meditation/MeditationCalendar"

const MeditationHistoryPage = () => {
  const [view, setView] = useState("list")
  const [filters, setFilters] = useState({
    theme: "",
    duration: "",
    mood: "",
  })
  const [showFilters, setShowFilters] = useState(false)
  const navigate = useNavigate()

  const themes = ["All", "Rain", "Ocean", "Air", "Winter", "Campfire", "Space", "Summer", "Water"]
  const durations = ["All", "3 min", "5 min", "10 min", "15 min", "20 min"]
  const moods = ["All", "Calm", "Focused", "Relaxed", "Energized", "Balanced"]

  const handleFilterChange = (type, value) => {
    setFilters({
      ...filters,
      [type]: value === "All" ? "" : value,
    })
  }

  const clearFilters = () => {
    setFilters({
      theme: "",
      duration: "",
      mood: "",
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <button
          onClick={() => navigate("/meditation")}
          className="flex items-center text-purple-600 hover:text-purple-800 transition-colors mb-4"
        >
          <IconArrowLeft size={20} className="mr-1" />
          <span>Back to Meditation</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Meditation History</h1>
        <p className="text-gray-600">Track your meditation journey and progress over time</p>
      </motion.div>

      <div className="bg-white rounded-2xl shadow-sm p-6 border border-purple-100 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 rounded-lg flex items-center ${
                view === "list" ? "bg-purple-100 text-purple-700 font-medium" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <IconCalendarStats size={20} className="mr-2" />
              List View
            </button>
            <button
              onClick={() => setView("calendar")}
              className={`px-4 py-2 rounded-lg flex items-center ${
                view === "calendar" ? "bg-purple-100 text-purple-700 font-medium" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <IconCalendarStats size={20} className="mr-2" />
              Calendar View
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center text-gray-700 transition-colors"
          >
            <IconFilter size={20} className="mr-2" />
            Filter
            {(filters.theme || filters.duration || filters.mood) && (
              <span className="ml-2 bg-purple-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                {Object.values(filters).filter(Boolean).length}
              </span>
            )}
          </motion.button>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 p-4 rounded-lg mb-6"
          >
            <div className="flex flex-wrap gap-6">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                <select
                  value={filters.theme || "All"}
                  onChange={(e) => handleFilterChange("theme", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                >
                  {themes.map((theme) => (
                    <option key={theme} value={theme}>
                      {theme}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <select
                  value={filters.duration || "All"}
                  onChange={(e) => handleFilterChange("duration", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                >
                  {durations.map((duration) => (
                    <option key={duration} value={duration}>
                      {duration}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mood After</label>
                <select
                  value={filters.mood || "All"}
                  onChange={(e) => handleFilterChange("mood", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                >
                  {moods.map((mood) => (
                    <option key={mood} value={mood}>
                      {mood}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button onClick={clearFilters} className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}

        {view === "list" ? <MeditationHistory filters={filters} /> : <MeditationCalendar filters={filters} />}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mt-8"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/meditation/start")}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:bg-purple-700 transition-colors"
        >
          Start New Meditation
        </motion.button>
      </motion.div>
    </div>
  )
}

export default MeditationHistoryPage
