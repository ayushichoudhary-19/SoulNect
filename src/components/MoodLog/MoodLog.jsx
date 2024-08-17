import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MoodLog = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const storedMood = localStorage.getItem('currentMood');
    const storedTime = localStorage.getItem('lastSavedTime');
    if (storedMood) {
      setSelectedMood(storedMood);
      setLastSavedTime(parseInt(storedTime, 10));
    }
  }, []);

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
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastSavedTime]);

  const handleClick = (event) => {
    const mood = event.target.getAttribute('data-mood');
    const now = Date.now();
    
    if (!lastSavedTime || (now - lastSavedTime) / (1000 * 60 * 60) >= 8) {
      setSelectedMood(mood);
      setLastSavedTime(now);
      localStorage.setItem('currentMood', mood);
      localStorage.setItem('lastSavedTime', now.toString());
      alert(`Mood "${mood}" saved successfully!`);
    } else {
      alert('You can only change your mood once every 8 hours.');
    }
  }

  return (
    <>
      <div className="text-center my-4 p-4 bg-gray-100 rounded-lg">
        <p className="text-xl font-bold mb-2">
          {selectedMood 
            ? `Current Mood: ${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)}` 
            : "No mood logged yet"}
        </p>
        {timeLeft && (
          <p className="text-lg">
            Time until next mood entry: <span className="font-mono">{timeLeft}</span>
          </p>
        )}
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
            {['happy', 'sad', 'excited', 'angry', 'stressed'].map((mood) => (
              <button 
                key={mood}
                data-mood={mood}
                onClick={handleClick}
                className={`m-3 p-2 bg-white shadow-md hover:shadow-${getMoodColor(mood)}-200 hover:-translate-y-2 transition duration-300 ease-in-out border-none rounded-md flex items-center`}>
                <img
                  src={`assets/images/moodEmojis/${mood}.png`}
                  className="w-1/5 z-1"
                  alt={`${mood} Emoji`}
                />
                <span className="p-2 text-xl capitalize">{mood}</span>
              </button>
            ))}
          </li>
        </ul>
      </div>
      <div id="mood-dashboard-link">
        Click here to check your Track your mood
        <button id="mood-dashboard-button">
          <Link to="moodDashboard">
            <span id="mood-dashboard-word">MOOD DASHBOARD</span>
          </Link>
        </button>
      </div>
    </>
  );
};

function getMoodColor(mood) {
  const colors = {
    happy: 'blue',
    sad: 'pink',
    excited: 'yellow',
    angry: 'green',
    stressed: 'purple'
  };
  return colors[mood] || 'gray';
}

export default MoodLog;
