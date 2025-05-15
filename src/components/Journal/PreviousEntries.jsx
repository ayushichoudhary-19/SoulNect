
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { Tooltip } from 'react-tooltip';

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
    <div className="w-full max-w-lg mx-auto px-2">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Previous Entries</h2>
      
      {entries.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No previous entries found</p>
      ) : (
        <div className="space-y-3">
          {entries.map((entry, index) => {
            const formattedDate = formatDateParts(entry.date);
            return (
              <div 
                key={index} 
                className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex items-center"
                onClick={() => handleCardClick(entry)}
              >
                <div className="flex-shrink-0 text-center mr-3 bg-gray-50 rounded-md p-2 w-14">
                  <div className="text-2xl font-bold text-gray-700">{formattedDate.split(' ')[1]}</div>
                  <div className="text-xs text-gray-500">{formattedDate.split(' ')[2]}</div>
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-600 line-clamp-2 overflow-hidden">
                    {entry.content.replace(/<[^>]*>?/gm, '').substring(0, 100)}...
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

{selectedEntry && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4 overflow-y-auto">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] p-6 relative overflow-hidden border">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-lg font-semibold text-gray-800">
            {formatDateParts(selectedEntry.date)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div
            data-tooltip-id="edit-tooltip"
            data-tooltip-content="Edit"
            onClick={() => {
              closePopup();
              window.location.href = `/myjournal?editId=${selectedEntry._id}`;
            }}
            className="hover:bg-blue-100 p-2 rounded cursor-pointer"
          >
            <IconEdit size={20} />
          </div>
          <div
            data-tooltip-id="delete-tooltip"
            data-tooltip-content="Delete"
            onClick={() => handleDeleteClick(selectedEntry._id)}
            className="hover:bg-red-100 p-2 rounded cursor-pointer"
          >
            <IconTrash size={20} />
          </div>
          <Tooltip id="edit-tooltip" />
          <Tooltip id="delete-tooltip" />
          <button
            onClick={closePopup}
            className="text-gray-600 hover:text-red-500 text-xl font-bold ml-2"
          >
            ×
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-sm sm:prose-base prose-gray overflow-y-auto max-h-[60vh] border-t pt-4 mt-2">
        <div dangerouslySetInnerHTML={{ __html: selectedEntry.content }} />
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default PreviousEntries;
