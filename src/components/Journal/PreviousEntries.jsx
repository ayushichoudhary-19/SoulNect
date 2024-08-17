import React, { useState, useEffect } from 'react';

function PreviousEntries() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    // Load all entries from local storage
    const loadEntries = () => {
      const allEntries = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        // Remove the filter checking for '/' in the key
        allEntries.push({
          date: key,
          content: localStorage.getItem(key)
        });
      }
      // Sort entries by date, most recent first
      allEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEntries(allEntries);
    };

    loadEntries();
  }, []);

  const handleCardClick = (entry) => {
    setSelectedEntry(entry);
  };

  const closePopup = () => {
    setSelectedEntry(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Previous Entries</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map((entry, index) => (
          <div 
            key={index} 
            className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleCardClick(entry)}
          >
            <h3 className="font-semibold">{entry.date}</h3>
            <p className="text-gray-600 truncate">{entry.content.replace(/<[^>]*>?/gm, '').substring(0, 100)}...</p>
          </div>
        ))}
      </div>

      {selectedEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{selectedEntry.date}</h3>
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
