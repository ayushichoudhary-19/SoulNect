"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { IconFlame } from "../icons/TablerIcons"

const JournalStreak = () => {
  const [streak, setStreak] = useState(0)
  const [streakStart, setStreakStart] = useState("")
  const [streakEnd, setStreakEnd] = useState("")
  const [loading, setLoading] = useState(true)
  const [animateStreak, setAnimateStreak] = useState(false)

  const userId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/journal/${userId}`)
        const sortedEntries = response.data.sort((a, b) => new Date(b.date) - new Date(a.date))
        calculateStreak(sortedEntries)
      } catch (error) {
        console.error("Failed to fetch entries", error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchEntries()
    } else {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    if (streak > 0) {
      setAnimateStreak(true)
      const timer = setTimeout(() => setAnimateStreak(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [streak])

  const calculateStreak = (entries) => {
    if (entries.length === 0) {
      setStreak(0)
      setStreakStart("")
      setStreakEnd("")
      return
    }

    let currentStreak = 1
    let previousDate = new Date(entries[0].date)
    let startDate = previousDate

    for (let i = 1; i < entries.length; i++) {
      const entryDate = new Date(entries[i].date)
      const differenceInDays = Math.floor((previousDate - entryDate) / (1000 * 60 * 60 * 24))

      if (differenceInDays === 1) {
        currentStreak += 1
        previousDate = entryDate
        startDate = entryDate
      } else {
        break
      }
    }

    setStreak(currentStreak)
    setStreakStart(formatDate(startDate.toISOString()))
    setStreakEnd(formatDate(previousDate.toISOString()))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-pulse w-32 h-32 bg-gray-200 rounded-full"></div>
      </div>
    )
  }

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
            {streak}
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
        {streak > 0 ? (
          <>
            <span className="font-medium">Day streak</span>
            <br />
            <span className="text-sm">{streakEnd} – {streakStart}</span>
          </>
        ) : (
          "Start your journal streak today!"
        )}
      </p>
    </div>
  )
}

export default JournalStreak
