import React, { useState, useEffect } from "react";
import TinyMCEEditor from "./TinyMceEditor";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function JournalForm() {
    
    const [journalEntry, setJournalEntry] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currDate, setCurrDate] = useState(new Date());
    const [userId, setUserId] = useState(localStorage.getItem('userId'));

    const backendURL = 'http://localhost:3000';

    // Function to format date
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    // Function to get today's date key
    const getTodayKey = () => {
        return formatDate(new Date());
    };

    useEffect(() => {
        const fetchEntry = async () => {
            try {
                const response = await axios.get(`${backendURL}/api/journal/${userId}/${getTodayKey()}`);
                setJournalEntry(response.data.content || "");
                setIsEditing(false);
            } catch (error) {
                setJournalEntry("");
                setIsEditing(true);
            }
        };

        fetchEntry();

        const interval = setInterval(() => {
            const newDate = new Date();
            if (newDate.getDate() !== currDate.getDate()) {
                setCurrDate(newDate);
                setJournalEntry("");
                setIsEditing(true);
            }
        }, 60000);

        return () => clearInterval(interval);
    }, [currDate, userId]);

    const handleSave = async () => {
        if (!userId) {
            toast.error('Please log in to save your journal entry.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (journalEntry.trim() !== "") {
            try {
                await axios.post(`${backendURL}/api/journal`, {
                    userId,
                    date: getTodayKey(),
                    content: journalEntry,
                    timezoneOffset: new Date().getTimezoneOffset(),
                });
                setIsEditing(false);
                toast.success('Journal entry saved successfully!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
    
                // Refresh the window after a short delay to show the toast notification
                setTimeout(() => {
                    window.location.reload();
                }, 2100); // 2100 ms to ensure the toast displays before refreshing
    
            } catch (error) {
                toast.error('Failed to save entry. Please try again.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    };
    

    const handleEdit = () => {
        setIsEditing(true);
    };

    return (
        <div className="max-w-full max-w-7xl">
            {/* Display current date */}
            <div className="grid grid-cols-2 mt-10 mb-5">
                <p className="text-md text-gray-400">{formatDate(currDate)}</p>
            </div>
            
            <TinyMCEEditor 
                value={journalEntry}
                onEditorChange={(content) => setJournalEntry(content)}
                disabled={!isEditing}
            />

            <div className="mt-5 text-right">
                {isEditing ? (
                    <button 
                        onClick={handleSave}
                        className="bg-[#E7F5E9] text-black rounded-md p-2 w-1/4 hover:opacity-80"
                    >
                        Save Entry
                    </button>
                ) : (
                    <button 
                        onClick={handleEdit}
                        className="bg-blue-500 text-white rounded-md p-2 w-1/4 hover:opacity-80"
                    >
                        Edit Entry
                    </button>
                )}
            </div>

            {/* ToastContainer for displaying notifications */}
            <ToastContainer />
        </div>
    );
}

export default JournalForm;