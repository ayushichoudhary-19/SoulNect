import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PreviousEntries() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [userId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/journal/${userId}`);
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

  const isToday = (dateString) => {
    const now = new Date();
    const today = now.toLocaleDateString();
    const entryDate = new Date(dateString).toLocaleDateString();
    return entryDate === today;
  };

  // Function to format the date
  const formatDateParts = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };

  // const handleEditClick = () => {
  //   // Handle the edit logic here
  //   console.log('Edit button clicked');
  //   // Redirect to the editing page or open the edit form
  // };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/journal/${id}`);
      setEntries(entries.filter(entry => entry._id !== id));
      if (selectedEntry && selectedEntry._id === id) {
        setSelectedEntry(null);
      }
    } catch (error) {
      console.error('Failed to delete entry', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Previous Entries</h2>
      <div className="space-y-4"> {/* Only one card per row */}
        {entries.map((entry, index) => {
          const formattedDate = formatDateParts(entry.date);
          return (
            <div 
              key={index} 
              className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow flex items-center"
              onClick={() => handleCardClick(entry)}
            >
              <div className="flex-shrink-0 text-center mr-4">
                <div className="text-4xl font-bold">{formattedDate.split(' ')[1]}</div>
                <div className="text-sm text-gray-600">{formattedDate.split(' ')[2]}</div>
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
          <div className="bg-[#F9F8F0] border border-gray-300 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto z-60 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="text-lg font-bold">{formatDateParts(selectedEntry.date).split(', ')[0]}</div>
                <div className="text-base text-gray-700 ml-2">{formatDateParts(selectedEntry.date).split(', ')[1]}</div>
              </div>
              <button 
                onClick={closePopup}
                className="text-2xl font-bold text-gray-800 hover:text-red-600"
              >
                &times;
              </button>
            </div>
            <div className="prose prose-gray max-w-none">
              <div dangerouslySetInnerHTML={{ __html: selectedEntry.content }} />
            </div>
            {/* {isToday(selectedEntry.date) && (
              <button 
                onClick={handleEditClick} 
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
            )} */}
            <button 
              onClick={() => handleDeleteClick(selectedEntry._id)} 
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PreviousEntries;
