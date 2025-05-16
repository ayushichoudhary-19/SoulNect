"use client"

import { motion } from "framer-motion"
import MoodLog from "../components/MoodLog/MoodLog"
import MoodEntryMessage from "../components/MoodLog/MoodEntryMessage"

const MoodLogPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <MoodEntryMessage />
      <MoodLog />
    </motion.div>
  )
}

export { MoodLogPage }
