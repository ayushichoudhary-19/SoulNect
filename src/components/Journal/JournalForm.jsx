import React, { useState } from "react";
import TinyMCEEditor from "./TinyMceEditor";

function JournalForm() {
    const currDate = new Date();
    const [journalEntry, setJournalEntry] = useState("");

    // Function to format date
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="mx-10 max-w-full max-w-7xl my-12 ">
            <h1 className="text-4xl text-center sm:text-5xl xl:text-6xl xl:text-7xl 2xl:text-8xl">
                Write a <span className='text-vibrant-green'>Journal</span>
            </h1>

            {/* Display current date */}
            <div className="grid grid-cols-2 mt-10 mb-5">
            <p className="text-sm text-gray-400">{formatDate(currDate)}</p>
            <div className="text-right">
                <button className="bg-vibrant-green text-white rounded-md p-2 w-1/2 hover:opacity-80">Previous Entries</button>
            </div>
            </div>
            <TinyMCEEditor />
        </div>
    );
}

export default JournalForm;
