import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PreviousEntries() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [userId] = useState(localStorage.getItem('userId'));

  const backendURL = 'http://localhost:3000';
  
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/journal/${userId}`);
        setEntries(response.data);
      } catch (error) {
        console.error('Failed to fetch entries', error);
      }
    };

    fetchEntries();
  }, [userId]);

  const handleCardClick = (entry) => {
    setSelectedEntry(entry);
  };

  const closePopup = () => {
    setSelectedEntry(null);
  };

  // Function to format the date
  const formatDateParts = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(date),
      year: date.getFullYear()
    };
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Previous Entries</h2>
      <div className="space-y-4"> {/* Only one card per row */}
        {entries.map((entry, index) => {
          const { day, month } = formatDateParts(entry.date);
          return (
            <div 
              key={index} 
              className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow flex items-center"
              onClick={() => handleCardClick(entry)}
            >
              <div className="flex-shrink-0 text-center mr-4">
                <div className="text-4xl font-bold">{day}</div>
                <div className="text-sm text-gray-600">{month}</div>
              </div>
              <div className="flex-grow">
                <p className="text-gray-600 truncate">
                  {entry.content.replace(/<[^>]*>?/gm, '').substring(0, 100)}...
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {selectedEntry && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto z-60">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">
          {`${selectedEntry.date}`}
        </h3>
        <button 
          onClick={closePopup}
          className="text-2xl font-bold"
        >
          &times;
        </button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: selectedEntry.content }} />
    </div>
  </div>
)}

    </div>
  );
}

export default PreviousEntries;
