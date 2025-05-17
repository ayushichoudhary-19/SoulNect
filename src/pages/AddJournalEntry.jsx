"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom"
import JournalForm from "../components/Journal/JournalForm"
import PreviousEntries from "../components/Journal/PreviousEntries"
import JournalStreak from "../components/Journal/JournalSreak"
import JournalEntryMessage from "../components/Journal/JournalEntryMessage"
import { IconArrowLeft } from "../components/icons/TablerIcons";

function AddJournalEntry() {
  const [newEntry, setNewEntry] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const editId = searchParams.get('editId');
  const isEditMode = !!editId;

  const handleEntryAdded = (entry) => {
    setNewEntry(entry.journalEntry);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-full mx-auto px-4 sm:px-6 py-6"
    >
      {isEditMode ? (
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
            <span>Go back</span>
          </button>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-3"
          >
            <JournalEntryMessage />
          </motion.div>
         <JournalStreak/>
        </>
      )}

      <div className={`flex flex-col lg:flex-row gap-6 mx-auto ${isEditMode ? 'justify-center' : ''}`}>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`w-full ${isEditMode ? 'lg:w-3/5 mx-auto' : 'lg:w-3/5'}`}
        >
          <JournalForm editId={editId} onEntryAdded={handleEntryAdded} />
        </motion.div>

        {!isEditMode && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full lg:w-2/5 border border-purple-100 rounded-xl shadow-sm p-4"
          >
            <PreviousEntries limit={6} newEntry={newEntry} />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default AddJournalEntry