
import { useState, useEffect } from 'react';
import axios from 'axios';

const Streak = () => {
  const [entries, setEntries] = useState([]);
  const [streak, setStreak] = useState(0);
  const [streakStart, setStreakStart] = useState('');
  const [streakEnd, setStreakEnd] = useState('');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/journal/${userId}`);
        const sortedEntries = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setEntries(sortedEntries);
        calculateStreak(sortedEntries);
      } catch (error) {
        console.error('Failed to fetch entries', error);
      }
    };

    fetchEntries();
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
    }).format(date);
  };

  const calculateStreak = (entries) => {
    if (entries.length === 0) {
      setStreak(0);
      setStreakStart('');
      setStreakEnd('');
      return;
    }

    let currentStreak = 1;
    let previousDate = new Date(entries[0].date);
    let startDate = previousDate;

    for (let i = 1; i < entries.length; i++) {
      const entryDate = new Date(entries[i].date);
      const differenceInDays = Math.floor((previousDate - entryDate) / (1000 * 60 * 60 * 24));

      if (differenceInDays === 1) {
        currentStreak += 1;
        previousDate = entryDate;
        if (currentStreak === 1) {
          startDate = entryDate; // Update streak start date
        }
      } else if (differenceInDays > 1) {
        break; // Streak is broken
      }
    }

    setStreak(currentStreak);
    setStreakStart(formatDate(startDate.toISOString().split('T')[0]));
    setStreakEnd(formatDate(previousDate.toISOString().split('T')[0]));
  };

  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex flex-col items-center justify-center w-auto sm:w-64 px-5 py-3 rounded-full shadow-md bg-white transition-all hover:shadow-lg">
        <h2 className="text-xs sm:text-sm text-gray-400 font-medium">Current Streak</h2>
        <div className="flex items-center justify-center gap-2">
          <p className="text-base sm:text-lg font-bold text-gray-800">{streak} day{streak !== 1 ? 's' : ''}</p>
          <img src="assets/images/journal/fire.png" alt="fire" className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        {streak > 0 && (
          <p className="text-xs text-gray-500 mt-1">
            {streakEnd} - {streakStart}
          </p>
        )}
      </div>
    </div>
  );
};

export default Streak;
