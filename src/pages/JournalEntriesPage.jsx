"use client"

import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import PreviousEntries from "../components/Journal/PreviousEntries"
import { IconArrowLeft } from "../components/icons/TablerIcons";

function JournalEntriesPage() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto md:px-0 sm:px-6 py-6"
    >
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <button
          onClick={() => navigate('/myjournal')}
          className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
        >
          <IconArrowLeft size={20} className="mr-1" />
          <span>Back to Journal</span>
        </button>
      </motion.div>

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">All Journal Entries</h1>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
          <PreviousEntries fullWidth={true} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default JournalEntriesPage