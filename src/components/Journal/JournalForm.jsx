"use client";

import { useState, useEffect } from "react";
import TinyMCEEditor from "./TinyMceEditor";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

function JournalForm({ onEntryAdded }) {
  const [journalEntry, setJournalEntry] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currDate, setCurrDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  const location = useLocation();
  const entryContentFromState = location.state?.entryContent || "";
  const queryParams = new URLSearchParams(location.search);
  const editId = queryParams.get("editId");
  const navigate = useNavigate();

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    setLoading(true);

    if (editId) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/journal/entry/${editId}`)
        .then((res) => {
          setJournalEntry(res.data.content);
          setIsEditing(true);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to load entry");
          setLoading(false);
        });
      return;
    }

    if (entryContentFromState) {
      setJournalEntry(entryContentFromState);
      setIsEditing(true);
      setLoading(false);
      return;
    }

    setIsEditing(true);
    setLoading(false);

    const interval = setInterval(() => {
      const newDate = new Date();
      if (newDate.getDate() !== currDate.getDate()) {
        setCurrDate(newDate);
        setJournalEntry("");
        setIsEditing(true);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [currDate, userId, entryContentFromState, editId]);

  const handleSave = async () => {
    if (!userId || journalEntry.trim() === "") {
      toast.error("Please log in and write something first!");
      return;
    }

    try {
      let newEntryData;

      if (editId) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/journal/${editId}`,
          { content: journalEntry }
        );
        toast.success("Entry updated!");
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/journal`,
          {
            userId,
            date: new Date().toISOString(),
            content: journalEntry,
          }
        );

        newEntryData = response.data;

        confetti({});
        toast.success("New entry added!");

        setJournalEntry("");
        
        // Call the prop function to update parent component
        if (onEntryAdded && typeof onEntryAdded === "function") {
          onEntryAdded(newEntryData);
        }
        
        // Still dispatch event for backward compatibility
        const entryAddedEvent = new CustomEvent("journalEntryAdded", {
          detail: { entry: newEntryData },
        });
        window.dispatchEvent(entryAddedEvent);
      }

      setTimeout(() => {
        navigate("/myjournal");
      }, 1000);
    } catch (error) {
      toast.error("Error saving entry.");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto animate-pulse">
        <div className="h-6 bg-gray-200 w-48 mb-4 rounded"></div>
        <div className="h-64 bg-gray-200 rounded-md mb-4"></div>
        <div className="h-10 bg-gray-200 w-32 ml-auto rounded"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="flex justify-between items-center mb-4 mt-4 md:mt-6">
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-md text-gray-400 font-medium"
        >
          {formatDate(currDate)}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
      >
        <TinyMCEEditor
          value={journalEntry}
          onEditorChange={(content) => setJournalEntry(content)}
          disabled={!isEditing}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mt-4 flex justify-end"
      >
        {isEditing ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            className="bg-purple-600 text-white font-medium rounded-lg px-6 py-2.5 w-full sm:w-auto sm:min-w-[120px] hover:bg-purple-700 transition-colors duration-300 shadow-sm"
          >
            Save Entry
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleEdit}
            className="bg-purple-500 text-white font-medium rounded-lg px-6 py-2.5 w-full sm:w-auto sm:min-w-[120px] hover:bg-purple-700 transition-colors duration-300 shadow-sm"
          >
            Edit Entry
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}

export default JournalForm;