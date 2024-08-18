import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import MoodLogStreak from './MoodLogStreak';
import MoodDashboard from '../MoodDashboard/MoodDashboard';
import { useUser } from '../../store/userContext';

const backendURL = 'http://localhost:3000';

const MoodLog = () => {
  const { user, login, logout } = useUser();
  const userId = user?.userId;
  const [selectedMood, setSelectedMood] = useState(null);
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchLastMood();
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
      const response = await axios.get(`${backendURL}/api/moodlog/latest/${userId}`);
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
        await axios.post(`${backendURL}/api/moodlog`, { userId, mood });
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
          <MoodLogStreak userId={userId} />
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
                onClick={() => {setPopupOpen(false)}}
                className="text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <MoodDashboard />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function getMoodColor(mood) {
  const colors = {
    'very happy': 'yellow-400',
    happy: 'orange-400',
    neutral: 'gray-400',
    sad: 'blue-400',
    'very sad': 'blue-800',
  };
  return colors[mood] || 'gray';
}

export default MoodLog;
