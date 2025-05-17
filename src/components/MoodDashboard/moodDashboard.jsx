import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { format, parseISO } from "date-fns";

const MoodDashboard = () => {
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userFound, setUserFound] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchMoodData(userId);
    } else {
      setUserFound(false);
    }
  }, []);

  const fetchMoodData = async (userId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/moodlog/${userId}`
      );

      const formatted = response.data.map((log) => ({
        date: parseISO(log.createdAt),
        mood: getMoodValue(log.mood),
      }));

      setMoodData(formatted);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getMoodValue = (mood) => {
    const moodValues = {
      "very sad": 1,
      sad: 2,
      neutral: 3,
      happy: 4,
      "very happy": 5,
    };
    return moodValues[mood] || 3;
  };

  const getMoodLabel = (value) => {
    const labels = ["Very Sad", "Sad", "Neutral", "Happy", "Very Happy"];
    return labels[value - 1] || "Unknown";
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const moodValue = payload[0].value;
      return (
        <div className="bg-white border px-3 py-2 rounded shadow text-sm">
          <p><strong>{format(new Date(label), "MMM d, yyyy")}</strong></p>
          <p>Mood: {getMoodLabel(moodValue)}</p>
        </div>
      );
    }
    return null;
  };

  if (!userFound) {
    return (
      <p>
        No user found. Please{" "}
        <span
          className="text-purple-500 hover:underline cursor-pointer"
          onClick={() => (window.location.href = "/signin")}
        >
          login
        </span>{" "}
        to view this page.
      </p>
    );
  }

  if (loading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  if (moodData.length === 0) {
    return <p>No mood data found.</p>;
  }

  return (
    <div className="mood-dashboard w-full h-[400px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={moodData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(str) => format(new Date(str), "MMM d")}
            domain={["auto", "auto"]}
          />
          <YAxis
            domain={[1, 5]}
            tickFormatter={(value) => getMoodLabel(value)}
            ticks={[1, 2, 3, 4, 5]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#f5e860"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodDashboard;
