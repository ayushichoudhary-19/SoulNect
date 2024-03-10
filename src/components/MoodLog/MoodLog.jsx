import React,{useState} from 'react';

const MoodLog = () => {
  
  const [selectedMood, setSelectedMood] = useState(null);

  const handleClick = (event) => {
    const id = event.target.id;
    setSelectedMood(id); 
    alert(id);
  }

  
  return (
    <>
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
            <button 
              id="happy"
              onClick={handleClick}
              className="m-3 bg-white shadow-md hover:shadow-blue-200 hover:-translate-y-2 transition duration-300 ease-in-out border-none rounded-md flex items-center p-2">
              <img
                src="assets/images/moodEmojis/happy.png"
                className="w-1/5 z-1"
                alt="Happy Emoji"
              />
              <span className="p-2 text-xl">Happy</span>
            </button>
            <button 
            id="sad"
            onClick={handleClick}
            className="m-3 p-2 bg-white shadow-md hover:shadow-pink-200 hover:-translate-y-2 transition duration-300 ease-in-out  border-none rounded-md flex items-center">
              <img
                src="assets/images/moodEmojis/sad.png"
                className="w-1/5 z-1"
                alt="Sad Emoji"
              />
              <span className="p-2 text-xl">Sad</span>
            </button>
            <button 
            id="excited"
            onClick={handleClick}
            className="m-3 p-2 bg-white shadow-md hover:shadow-yellow-200 hover:-translate-y-2 transition duration-300 ease-in-out  border-none rounded-md flex items-center">
              <img
                src="assets/images/moodEmojis/excited.png"
                className="w-1/5 z-1"
                alt="Excited Emoji"
              />
              <span className="p-2 text-xl">Excited</span>
            </button>
            <button 
            id='angry'
            onClick={handleClick}
            className="m-3 p-2 bg-white shadow-md hover:shadow-green-300 hover:-translate-y-2 transition duration-300 ease-in-out  border-none rounded-md flex items-center">
              <img
                src="assets/images/moodEmojis/angry.png"
                className="w-1/5 z-1"
                alt="Angry Emoji"
              />
              <span className="p-2 text-xl">Angry</span>
            </button>
            <button 
            id='stressed'
            onClick={handleClick}
            className="m-3 p-2 bg-white shadow-md hover:shadow-purple-300 hover:-translate-y-2 transition duration-300 ease-in-out  border-none rounded-md flex items-center">
              <img
                src="assets/images/moodEmojis/stressed.png"
                className="w-1/5 z-1"
                alt="Stressed Emoji"
              />
              <span className="p-2 text-xl">Stressed</span>
            </button>
          </li>
        </ul>
      </div>
      <div id="mood-dashboard-link">
        Click here to check your Track your mood
        <button id="mood-dashboard-button">
          <a href="moodDashboard.html">
            <span id="mood-dashboard-word">MOOD DASHBOARD</span>
          </a>
        </button>
      </div>
    </>
  );
};

export default MoodLog;