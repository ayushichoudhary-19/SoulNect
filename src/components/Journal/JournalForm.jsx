import React, { useState, useEffect } from "react";
import TinyMCEEditor from "./TinyMceEditor";

function JournalForm() {
    const [journalEntry, setJournalEntry] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currDate, setCurrDate] = useState(new Date());

    // Function to format date
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' });
    };

    // Function to get today's date key
    const getTodayKey = () => {
        return formatDate(new Date());
    };

    useEffect(() => {
        // Check for existing entry when component mounts
        const savedEntry = localStorage.getItem(getTodayKey());
        if (savedEntry) {
            setJournalEntry(savedEntry);
            setIsEditing(false);
        } else {
            setJournalEntry("");
            setIsEditing(true);
        }

        // Set up interval to check for date change
        const interval = setInterval(() => {
            const newDate = new Date();
            if (newDate.getDate() !== currDate.getDate()) {
                setCurrDate(newDate);
                setJournalEntry("");
                setIsEditing(true);
            }
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [currDate]);

    const handleSave = () => {
        if (journalEntry.trim() !== "") {
            localStorage.setItem(getTodayKey(), journalEntry);
            setIsEditing(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    return (
        <div className="mx-10 max-w-full max-w-7xl my-12 ">
            <h1 className="text-4xl text-center sm:text-5xl xl:text-6xl xl:text-7xl 2xl:text-8xl">
                Write a <span className='text-vibrant-green'>Journal</span>
            </h1>

            {/* Display current date */}
            <div className="grid grid-cols-2 mt-10 mb-5">
                <p className="text-sm text-gray-400">{formatDate(currDate)}</p>
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
                        className="bg-vibrant-green text-white rounded-md p-2 w-1/4 hover:opacity-80"
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
        </div>
    );
}

export default JournalForm;