import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import MoodLogStreak from "./MoodLogStreak";
import MoodDashboard from "../MoodDashboard/moodDashboard";
import { useUser } from "../../store/userContext";

const moodImages = {
  "very happy":
    "https://cdn.shopify.com/s/files/1/1061/1924/files/Smiling_Emoji_with_Smiling_Eyes.png?9898922749706957214",
  happy:
    "https://emojiisland.com/cdn/shop/products/Smiling_Face_Emoji_with_Blushed_Cheeks_large.png?v=1571606036",
  neutral:
    "https://cdn.shopify.com/s/files/1/1061/1924/files/Neutral_Face_Emoji.png?9898922749706957214",
  sad: "https://cdn.shopify.com/s/files/1/1061/1924/files/Sad_Face_Emoji.png?9898922749706957214",
  "very sad":
    "https://cdn.shopify.com/s/files/1/1061/1924/files/Crying_Face_Emoji.png?9898922749706957214",
};

const MoodLog = () => {
  const { user } = useUser();
  const userId = user?.userId;
  const [selectedMood, setSelectedMood] = useState(null);
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [streakData, setStreakData] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchLastMood();
      fetchStreakData(userId);
    }
  }, [userId]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (lastSavedTime) {
        const now = Date.now();
        const diffInHours = (now - lastSavedTime) / (1000 * 60 * 60);
        if (diffInHours < 8) {
          const timeLeftInSeconds = Math.floor(
            8 * 60 * 60 - (now - lastSavedTime) / 1000
          );
          const hours = Math.floor(timeLeftInSeconds / 3600)
            .toString()
            .padStart(2, "0");
          const minutes = Math.floor((timeLeftInSeconds % 3600) / 60)
            .toString()
            .padStart(2, "0");
          const seconds = (timeLeftInSeconds % 60).toString().padStart(2, "0");
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
      console.error("No user ID found");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/moodlog/latest/${userId}`
      );
      const latestLog = response.data;
      console.log("Fetched mood log:", latestLog);

      if (latestLog) {
        setSelectedMood(latestLog.mood);
        setLastSavedTime(new Date(latestLog.createdAt).getTime());
      } else {
        setSelectedMood(null);
        setLastSavedTime(null);
      }
    } catch (error) {
      console.error("Error fetching mood logs", error);
      setSelectedMood(null);
      setLastSavedTime(null);
    }
  };

  const fetchStreakData = async (userId) => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/moodlog/streak/${userId}?timezone=${timezone}`
      );
      console.log("Fetched streak data:", response.data);
      setStreakData(response.data);
    } catch (error) {
      console.error("Error fetching streak data:", error);
    }
  };

  const handleClick = async (mood) => {
    if (!userId) {
      toast.error("Please log in to select a mood.", {
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
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/moodlog`, {
          userId,
          mood,
        });
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
        setTimeout(() => {
          window.location.reload();
        }, 1100);
        fetchLastMood();
        fetchStreakData(userId);
      } catch (error) {
        console.error("Error saving mood:", error);
        toast.error("Failed to save mood. Please refresh and try again.", {
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
      toast.error("You can only change your mood once every 8 hours.", {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
    {/* Section 1: Streak and Mood Status */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl p-6 flex flex-col justify-center items-center gap-6">
        <MoodLogStreak streakData={streakData} />
        <button
          onClick={() => setPopupOpen(true)}
          className="bg-white w-fit text-gray-800 font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center space-x-2"
        >
          <span>View Mood Dashboard</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
  
      <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center gap-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {selectedMood ? selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1) : "No mood logged"}
          </h2>
          <p className="text-gray-500 mt-1">{selectedMood ? "Current Mood" : ""}</p>
        </div>
  
        {timeLeft && (
          <div className="text-center">
            <p className="text-4xl font-bold text-vibrant-purple">{timeLeft}</p>
            <p className="text-sm text-gray-500">Until next mood entry</p>
          </div>
        )}
      </div>
    </div>
  
    {/* Section 2: Mood Image + Select Mood */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7">
        <img
          src="assets/images/Mood-Tracker-img.jpg"
          className="w-full h-full object-cover rounded-2xl"
          alt="Mood Tracker"
        />
      </div>
  
      <div className="lg:col-span-5 space-y-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Select Your Mood</h3>
        {["very happy", "happy", "neutral", "sad", "very sad"].map((mood) => (
          <button
            key={mood}
            onClick={() => handleClick(mood)}
            className={`w-full p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 ease-in-out ${getMoodColor(
              mood
            )} flex items-center space-x-4 group`}
          >
            <div className="w-12 h-12 flex-shrink-0 group-hover:scale-110 transition duration-300">
              <img
                src={moodImages[mood]}
                className="w-full h-full object-contain"
                alt={mood}
              />
            </div>
            <span className="text-lg font-medium text-gray-700 capitalize">{mood}</span>
          </button>
        ))}
      </div>
    </div>
  
    <ToastContainer />
  
    {/* Dashboard Modal */}
    {popupOpen && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[85vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Mood Dashboard</h3>
            <button
              onClick={() => setPopupOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <MoodDashboard />
        </div>
      </div>
    )}
  </div>
  
  );
};

const getMoodColor = (mood) => {
  switch (mood) {
    case "very happy":
      return "hover:bg-soft-green/10 border border-soft-green/20";
    case "happy":
      return "hover:bg-vibrant-yellow/10 border border-vibrant-yellow/20";
    case "neutral":
      return "hover:bg-vibrant-purple/10 border border-vibrant-purple/20";
    case "sad":
      return "hover:bg-vibrant-cyan/10 border border-vibrant-cyan/20";
    case "very sad":
      return "hover:bg-vibrant-peach/10 border border-vibrant-peach/20";
    default:
      return "hover:bg-gray-100 border border-gray-200";
  }
};

export default MoodLog;