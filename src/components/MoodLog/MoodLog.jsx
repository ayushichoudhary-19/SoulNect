import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import MoodLogStreak from './MoodLogStreak';
import MoodDashboard from '../MoodDashboard/moodDashboard';
import { useUser } from '../../store/userContext';

const MoodLog = () => {
  const { user, login, logout } = useUser();
  const userId = user?.userId;
  const [selectedMood, setSelectedMood] = useState(null);
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [streakData, setStreakData] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchLastMood();
      fetchStreakData(userId);  // Fetch streak data when the component mounts
    }
  }, [userId]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (lastSavedTime) {
        const now = Date.now();
        const diffInHours = (now - lastSavedTime) / (1000 * 60 * 60);
        if (diffInHours < 8) {
          const timeLeftInSeconds = Math.floor((8 * 60 * 60) - ((now - lastSavedTime) / 1000));
          const hours = Math.floor(timeLeftInSeconds / 3600).toString().padStart(2, '0');
          const minutes = Math.floor((timeLeftInSeconds % 3600) / 60).toString().padStart(2, '0');
          const seconds = (timeLeftInSeconds % 60).toString().padStart(2, '0');
          setTimeLeft(`${hours}:${minutes}:${seconds}`);
        } else {
          setTimeLeft(null);
          setSelectedMood(null);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastSavedTime]);

  const fetchLastMood = async () => {
    if (!userId) {
      console.error('No user ID found');
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/moodlog/latest/${userId}`);
      const latestLog = response.data;
      console.log('Fetched mood log:', latestLog);

      if (latestLog) {
        setSelectedMood(latestLog.mood);
        setLastSavedTime(new Date(latestLog.createdAt).getTime());
      } else {
        setSelectedMood(null);
        setLastSavedTime(null);
      }
    } catch (error) {
      console.error('Error fetching mood logs', error);
      setSelectedMood(null);
      setLastSavedTime(null);
    }
  };

  const fetchStreakData = async (userId) => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/moodlog/streak/${userId}?timezone=${timezone}`);
      console.log('Fetched streak data:', response.data);
      setStreakData(response.data);
    } catch (error) {
      console.error('Error fetching streak data:', error);
    }
  };

  const handleClick = async (event) => {
    const mood = event.target.getAttribute('data-mood');
    if (!userId) {
      toast.error('Please log in to select a mood.', {
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

    const now = Date.now();

    if (!lastSavedTime || (now - lastSavedTime) / (1000 * 60 * 60) >= 8) {
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/moodlog`, { userId, mood });
        setSelectedMood(mood);
        setLastSavedTime(now);
        toast.success(`Mood "${mood}" saved successfully!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        fetchLastMood();
        fetchStreakData(userId);  // Re-fetch streak data after logging a mood
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to save mood. Please try again.', {
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
    } else {
      toast.error('You can only change your mood once every 8 hours.', {
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
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row justify-around w-full items-center my-4 p-4 rounded-lg">
        <div className='flex gap-5 items-center flex-col md:flex-row'>
          <MoodLogStreak streakData={streakData} />
          <button 
            onClick={() => {setPopupOpen(true)}}
            className='bg-vibrant-yellow rounded p-4 hover:opacity-80 transition duration-300'>Mood Dashboard
          </button>
        </div>
        <div className='flex gap-5 shadow-md bg-vibrant-yellow p-4 rounded items-center justify-center'>
          {/* Current Mood */}
          <div className="flex flex-col justify-center items-center">
            <p className="text-2xl font-bold mb-2">
              {selectedMood 
                ? selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1) 
                : "No mood logged yet"}
            </p>
            <p className="text-sm">
              {selectedMood ? "Current Mood" : ""}
            </p>
          </div>
          {timeLeft && (
            <div className="flex flex-col justify-center items-center">
              <p className="text-4xl font-bold">
                {timeLeft}
              </p>
              <p className="text-md">
                Time until next mood entry
              </p>
            </div>
          )}
          {!timeLeft && (
            <div className="flex flex-col justify-center items-center">
              <p className="text-4xl font-bold mb-2">
                00:00:00
              </p>
              <p className="text-lg">
                Time until next mood entry
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-hidden">
        <ul className="sm:grid sm:grid-cols-12 gap-2">
          <li className="col-span-7 flex flex-col align-center">
            <img
              src="assets/images/Mood-Tracker-img.jpg"
              className="pd-4 w-full"
              alt="Mood Tracker"
            />
          </li>
          <li className="pt-0 col-span-5 flex flex-col">
            {['very happy', 'happy', 'neutral', 'sad', 'very sad'].map((mood) => (
              <button 
                key={mood}
                data-mood={mood}
                onClick={handleClick}
                className={`m-3 p-2 bg-white shadow-md hover:shadow-lg hover:border-${getMoodColor(mood)} border-2 border-transparent rounded-md flex items-center transition duration-300 ease-in-out`}
              >
                <span className="p-2 text-xl capitalize">{mood}</span>
              </button>
            ))}
          </li>
        </ul>
      </div>
      <ToastContainer />
      {popupOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto z-60">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                Mood Dashboard
              </h3>
              <button 
                onClick={() => setPopupOpen(false)} 
                className="text-gray-500 hover:text-gray-700">
                Close
              </button>
            </div>
            <MoodDashboard />
          </div>
        </div>
      )}
    </>
  );
};

const getMoodColor = (mood) => {
  switch (mood) {
    case 'very happy':
      return 'text-green-500';
    case 'happy':
      return 'text-yellow-500';
    case 'neutral':
      return 'text-gray-500';
    case 'sad':
      return 'text-blue-500';
    case 'very sad':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export default MoodLog;
