"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { IconFlame } from "../icons/TablerIcons"

const MeditationStreak = ({ streak }) => {
  const [animateStreak, setAnimateStreak] = useState(false)

  useEffect(() => {
    // Trigger animation when component mounts
    setAnimateStreak(true)

    // Reset animation after it completes
    const timer = setTimeout(() => {
      setAnimateStreak(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <motion.div
          animate={animateStreak ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-32 h-32 bg-purple-50 rounded-full flex items-center justify-center"
        >
          <motion.div
            animate={animateStreak ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="text-5xl font-bold text-purple-600"
          >
            {streak.count || 0}
          </motion.div>
        </motion.div>

        <motion.div
          animate={animateStreak ? { y: [0, -10, 0], scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute -top-2 -right-2 bg-orange-500 rounded-full p-2"
        >
          <IconFlame size={24} className="text-white" />
        </motion.div>
      </div>

      <p className="text-gray-600 mt-4 text-center">
        {streak.count > 0 ? (
          <>
            <span className="font-medium">Day streak</span>
            <br />
            <span className="text-sm">Last meditation: {formatDate(streak.lastDate)}</span>
          </>
        ) : (
          "Start your streak today!"
        )}
      </p>
    </div>
  )
}

const formatDate = (dateString) => {
  if (!dateString) return "Never"

  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export default MeditationStreak
