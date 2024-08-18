import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Streak = () => {
  const [entries, setEntries] = useState([]);
  const [streak, setStreak] = useState(0);
  const [streakStart, setStreakStart] = useState('');
  const [streakEnd, setStreakEnd] = useState('');

  const userId = localStorage.getItem('userId');
  const backendURL = 'http://localhost:3000';

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/journal/${userId}`);
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
    <div className='flex items-center justify-center '>
      <div className="flex flex-col items-center justify-center w-[300px] px-7 py-4 rounded-full shadow-lg bg-white">
        <h2 className="text-md text-gray-400">Current Streak</h2>
        <div className='flex items-center justify-center gap-2 w-full'>
          <p className="text-lg font-bold">{streak} day{streak > 1 ? 's' : ''}</p>
          <img src="assets/images/journal/fire.png" alt="fire" className="w-5 h-5" />
        </div>
        {streak > 0 && (
          <p className="text-sm text-gray-600 mt-2">
            {streakEnd} - {streakStart}
          </p>
        )}
      </div>
    </div>
  );
};

export default Streak;
