import React from 'react';

const MoodLog = () => {
  return (
    <>
    <div className="ml-10 mr-0 w-full max-w-7xl my-12" id="mood-log">
      <h1 className="text-4xl text-center sm:text-5xl xl:text-6xl xl:text-7xl 2xl:text-8xl">
      How do you <span className='text-vibrant-yellow'>feel </span>today?
      </h1>
      <ul className="md:flex md:flex-column sm:flex-row w-1000 ">
        <li>
          <div className="bg-vibrant-yellow ml-30 mr-5 rounded-md transition-opacity duration-1000 ease">
            <p id="result"></p>
            <p id="countdown"></p>
          </div>
          <img
            src="assets/images/Mood-Tracker-img.jpg"
            className="w-65 p-8 pt-0 pb-5 pl-5"
            alt="Mood Tracker"
          />
        </li>
        <li className="pt-0">
          <button id="happy" className="pl-0 pr-100 h-auto w-100 bg-white shadow-md border-none rounded-md m-1% 10% 1% 2% w-70vh h-15vh flex flex-row">
            <span className="text-left p-2 pt-1 pl-5">
              <img
                src="assets/images/moodEmojis/happy.png"
                className="w-50 z-1"
                alt="Happy Emoji"
              />
            </span>
            <span className="p-8 pl-50 pr-1 text-xl">Happy</span>
          </button>
          <button id="sad" className="p-0 bg-white shadow-md border-none rounded-md m-1% 10% 1% 2% w-70vh h-15vh flex flex-row">
            <span className="text-left p-2 pt-1 pl-5">
              <img
                src="assets/images/moodEmojis/sad.png"
                className="w-50 z-1"
                alt="Sad Emoji"
              />
            </span>
            <span className="p-8 pl-50 pr-1 text-xl">Sad</span>
          </button>
          <button id="excited" className="p-0 bg-white shadow-md border-none rounded-md m-1% 10% 1% 2% w-70vh h-15vh flex flex-row">
            <span className="text-left p-2 pt-1 pl-5">
              <img
                src="assets/images/moodEmojis/excited.png"
                className="w-50 z-1"
                alt="Excited Emoji"
              />
            </span>
            <span className="p-8 pl-50 pr-1 text-xl">Excited</span>
          </button>
          <button id="angry" className="p-0 bg-white shadow-md border-none rounded-md m-1% 10% 1% 2% w-70vh h-15vh flex flex-row">
            <span className="text-left p-2 pt-1 pl-5">
              <img
                src="assets/images/moodEmojis/angry.png"
                className="w-50 z-1"
                alt="Angry Emoji"
              />
            </span>
            <span className="p-8 pl-50 pr-1 text-xl">Angry</span>
          </button>
          <button id="stressed" className="p-0 bg-white shadow-md border-none rounded-md m-1% 10% 1% 2% w-70vh h-15vh flex flex-row">
            <span className="text-left p-2 pt-1 pl-5">
              <img
                src="assets/images/moodEmojis/stressed.png"
                className="w-50 z-1"
                alt="Stressed Emoji"
              />
            </span>
            <span className="p-8 pl-50 pr-1 text-xl">Stressed</span>
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