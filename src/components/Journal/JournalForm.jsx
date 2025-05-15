
import { useState, useEffect } from 'react';
import TinyMCEEditor from './TinyMceEditor';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function JournalForm() {
    const [journalEntry, setJournalEntry] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currDate, setCurrDate] = useState(new Date());
    const userId = localStorage.getItem('userId');
    
    const location = useLocation();
    const entryContentFromState = location.state?.entryContent || "";
    const queryParams = new URLSearchParams(location.search);
    const editId = queryParams.get('editId');
    const navigate = useNavigate();



    // Function to format date
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    // Function to get today's date key
    const getTodayKey = () => {
        return formatDate(new Date());
    };

    useEffect(() => {
        if (editId) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/journal/entry/${editId}`)
                .then(res => {
                    setJournalEntry(res.data.content);
                    setIsEditing(true);
                })
                .catch(() => {
                    toast.error('Failed to load entry');
                });
            return;
        }
    
        if (entryContentFromState) {
            setJournalEntry(entryContentFromState);
            setIsEditing(true);
            return;
        }
    
        const fetchEntry = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/journal/${userId}/${getTodayKey()}`);
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
    }, [currDate, userId, entryContentFromState, editId]);
    

    const handleSave = async () => {
        if (!userId || journalEntry.trim() === "") {
          toast.error('Please log in and write something first!');
          return;
        }
      
        try {
          if (editId) {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/journal/${editId}`, { content: journalEntry });
            toast.success('Entry updated!');
          } else {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/journal`, {
              userId,
              date: new Date().toISOString(),
              content: journalEntry,
            });
            toast.success('New entry added!');
          }
      
          setTimeout(() => {
            navigate("/myjournal");
          }, 1000);
        } catch (error) {
          toast.error('Error saving entry.');
        }
      };
      

    const handleEdit = () => {
        setIsEditing(true);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Display current date */}
            <div className="flex justify-between items-center mb-4 mt-4 md:mt-6">
                <p className="text-sm md:text-md text-gray-400 font-medium">{formatDate(currDate)}</p>
            </div>

            <div className="rounded-md overflow-hidden shadow-sm border border-gray-100">
                <TinyMCEEditor
                    value={journalEntry}
                    onEditorChange={(content) => setJournalEntry(content)}
                    disabled={!isEditing}
                />
            </div>

            <div className="mt-4 flex justify-end">
                {isEditing ? (
                    <button
                        onClick={handleSave}
                        className="bg-green-50 text-green-700 font-medium rounded-md px-4 py-2 w-full sm:w-auto sm:min-w-[120px] hover:bg-green-100 transition-colors"
                    >
                        Save Entry
                    </button>
                ) : (
                    <button
                        onClick={handleEdit}
                        className="bg-blue-500 text-white font-medium rounded-md px-4 py-2 w-full sm:w-auto sm:min-w-[120px] hover:bg-blue-600 transition-colors"
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
