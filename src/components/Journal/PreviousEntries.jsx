"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { IconTrash, IconEdit, IconArrowRight } from "../icons/TablerIcons";
import { Tooltip } from "react-tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { IconBook } from "../icons/TablerIcons";
import { useNavigate } from "react-router-dom";

function PreviousEntries({ fullWidth = false, limit, newEntry }) {
  const [entries, setEntries] = useState([])
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [userId] = useState(localStorage.getItem("userId"))
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchEntries = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/journal/${userId}`);
      setEntries(response.data);
    } catch (error) {
      console.error("Failed to fetch entries", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEntries();
  }, [userId]);

  // Update entries when a new entry is added via props
  useEffect(() => {
    if (newEntry && newEntry._id) {
      // Check if the entry already exists to avoid duplicates
      const entryExists = entries.some(entry => entry._id === newEntry._id);
      
      if (!entryExists) {
        setEntries(prevEntries => [newEntry, ...prevEntries]);
      }
    }
  }, [newEntry]);

  // Keep the event listener for backward compatibility
  useEffect(() => {
    const handleNewEntry = (event) => {
      if (event.detail && event.detail.entry) {
        const newEntryData = event.detail.entry;
        // Check if the entry already exists to avoid duplicates
        setEntries(prevEntries => {
          const entryExists = prevEntries.some(entry => entry._id === newEntryData._id);
          if (!entryExists) {
            return [newEntryData, ...prevEntries];
          }
          return prevEntries;
        });
      }
    };

    window.addEventListener('journalEntryAdded', handleNewEntry);
    
    return () => {
      window.removeEventListener('journalEntryAdded', handleNewEntry);
    };
  }, []); // Remove the entries dependency

  const handleCardClick = (entry) => {
    setSelectedEntry(entry);
  };

  const closePopup = () => {
    setSelectedEntry(null);
  };

  const formatDateParts = (dateString) => {
    if (!dateString) {
      return "Unknown date";
    }
    
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      
      const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
      return new Intl.DateTimeFormat("en-GB", options).format(date);
    } catch (error) {
      return "Date error";
    }
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/journal/${id}`);
      setEntries(entries.filter((entry) => entry._id !== id));
      
      if (selectedEntry && selectedEntry._id === id) {
        setSelectedEntry(null);
      }
    } catch (error) {
      console.error("Failed to delete entry", error);
    }
  };

  const displayedEntries = limit ? entries.slice(0, limit) : entries;

  if (loading) {
    return (
      <div className={`w-full ${!fullWidth ? 'max-w-lg' : ''} mx-auto px-2`}>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Previous Entries</h2>
        <div className="space-y-3 animate-pulse">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white p-3 rounded-lg h-16"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${!fullWidth ? 'max-w-lg' : ''} mx-auto px-2`}>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <IconBook className="mr-2 text-purple-500" size={24} />
          Your Journal Entries
        </h2>
        {!fullWidth && (
          <motion.button
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/journal-entries')}
            className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center"
          >
            View All
            <IconArrowRight size={16} className="ml-1" />
          </motion.button>
        )}
      </div>

      {entries.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-center py-8"
        >
          No previous entries found
        </motion.p>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="space-y-3 mt-3">
          {displayedEntries.map((entry, index) => {
            if (!entry || !entry.date) {
              return null;
            }
            
            const formattedDate = formatDateParts(entry.date);
            const dateParts = formattedDate.split(" ");
            
            return (
              <motion.div
                key={entry._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex items-center border border-gray-100"
                onClick={() => handleCardClick(entry)}
              >
                <div className="flex-shrink-0 text-center mr-3 bg-purple-50 rounded-md p-2 w-14">
                  <div className="text-2xl font-bold text-purple-600">{dateParts.length > 1 ? dateParts[1] : ""}</div>
                  <div className="text-xs text-purple-600">{dateParts.length > 2 ? dateParts[2] : ""}</div>
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-600 line-clamp-2 overflow-hidden">
                    {entry.content ? entry.content.replace(/<[^>]*>?/gm, "").substring(0, 100) + "..." : "No content"}
                  </p>
                </div>
              </motion.div>
            );
          })}
          
          {!fullWidth && entries.length > (limit || 5) && (
            <motion.div 
              whileHover={{ y: -2 }}
              className="text-center mt-4"
            >
              <button 
                onClick={() => navigate('/journal-entries')}
                className="text-purple-600 hover:text-purple-800 text-sm font-medium"
              >
                View all {entries.length} entries
              </button>
            </motion.div>
          )}
        </motion.div>
      )}

      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] p-6 relative overflow-hidden border"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {selectedEntry.date ? formatDateParts(selectedEntry.date) : "Unknown date"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    data-tooltip-id="edit-tooltip"
                    data-tooltip-content="Edit"
                    onClick={() => {
                      closePopup();
                      navigate(`/myjournal?editId=${selectedEntry._id}`);
                    }}
                    className="hover:bg-purple-50 p-2 rounded cursor-pointer transition-colors"
                  >
                    <IconEdit size={20} className="text-gray-700" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    data-tooltip-id="delete-tooltip"
                    data-tooltip-content="Delete"
                    onClick={() => handleDeleteClick(selectedEntry._id)}
                    className="hover:bg-red-100 p-2 rounded cursor-pointer transition-colors"
                  >
                    <IconTrash size={20} className="text-red-600" />
                  </motion.div>
                  <Tooltip id="edit-tooltip" />
                  <Tooltip id="delete-tooltip" />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closePopup}
                    className="text-gray-600 hover:text-gray-800 text-xl font-bold ml-2 transition-colors"
                  >
                    ×
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-sm sm:prose-base prose-gray overflow-y-auto max-h-[60vh] border-t pt-4 mt-2">
                <div dangerouslySetInnerHTML={{ __html: selectedEntry.content }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PreviousEntries;