"use client"

import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { IconCheck, IconCalendarStats, IconNotebook, IconHome } from "../components/icons/TablerIcons";

const MeditationCompletedPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { duration, theme, mood } = location.state || { duration: 5, theme: "Ocean", mood: "Calm" }

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE", "#EDE9FE"],
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-800 flex flex-col items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <IconCheck size={40} className="text-green-600" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
        >
          Meditation Complete!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 mb-6"
        >
          {"You've "} completed 
          {" "}
          {duration >= 1 ? duration
          : duration * 60}
          {duration >= 1? "minutes" :
          " seconds"}
          {" "}
           of serenity with {theme}.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-purple-50 rounded-lg p-4 mb-8"
        >
          <p className="text-purple-800 font-medium">{"You're "} feeling: {mood}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/myjournal")}
            className="flex items-center justify-center bg-purple-100 text-purple-700 px-4 py-3 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <IconNotebook size={20} className="mr-2" />
            Reflect in Journal
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/meditation/history")}
            className="flex items-center justify-center bg-purple-100 text-purple-700 px-4 py-3 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <IconCalendarStats size={20} className="mr-2" />
            View History
          </motion.button>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/meditation")}
          className="mt-6 flex items-center justify-center mx-auto text-purple-600 hover:text-purple-800 transition-colors"
        >
          <IconHome size={20} className="mr-1" />
          Back to Meditation Home
        </motion.button>
      </motion.div>
    </div>
  )
}

export default MeditationCompletedPage
