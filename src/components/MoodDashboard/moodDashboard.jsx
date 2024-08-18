import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";

const backendURL = "http://localhost:3000";

const MoodDashboard = () => {
  const [moodData, setMoodData] = useState([]);
  const [userFound, setUserFound] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchMoodData(userId);
    } else {
      setUserFound(false);
    }
  }, []);

  useEffect(() => {
    if (moodData.length > 0) {
      createChart();
    }
  }, [moodData]);

  const fetchMoodData = async (userId) => {
    try {
      const response = await axios.get(`${backendURL}/api/moodlog/${userId}`);
      setMoodData(response.data);
    } catch (error) {
      console.error("Error fetching mood data:", error);
    }
  };

  const createChart = () => {
    const ctx = chartRef.current.getContext("2d");

    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    const dates = [];
    const moodValues = [];

    moodData.forEach((log) => {
      const date = parseDate(log.createdAt);
      if (date) {
        dates.push(date);
        moodValues.push(getMoodValue(log.mood));
      }
    });

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Mood Over Time",
            data: moodValues.map((value, index) => ({
              x: dates[index],
              y: value,
            })),
            borderColor: "rgb(245,232,96)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
              displayFormats: {
                day: "MMM d",
              },
            },
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            beginAtZero: true,
            max: 5,
            ticks: {
              stepSize: 1,
              callback: function (value) {
                return ["Very Sad", "Sad", "Neutral", "Happy", "Very Happy"][
                  value - 1
                ];
              },
            },
            title: {
              display: true,
              text: "Mood",
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const moodIndex = context.parsed.y - 1;
                return ["Very Sad", "Sad", "Neutral", "Happy", "Very Happy"][
                  moodIndex
                ];
              },
            },
          },
        },
      },
    });

    chartRef.current.chart = chart;
  };

  const getMoodValue = (mood) => {
    const moodValues = {
      "very sad": 1,
      sad: 2,
      neutral: 2,
      happy: 4,
      "very happy": 5,
    };
    return moodValues[mood] || 3;
  };

  const parseDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  return (
    <div className="mood-dashboard">
      {!userFound && <p>No user found. Please <span className="text-blue-500 hover:underline hover:cursor-pointer"
        onClick={() => window.location.href = '/signin'} 
      >login</span> to view this page.</p>}
      {userFound && moodData.length === 0 && <p>No mood data found.</p>}
      {userFound && moodData.length > 0 && (
        <div
          className="chart-container"
          style={{ height: "400px", width: "100%" }}
        >
          <canvas ref={chartRef}></canvas>
        </div>
      )}
    </div>
  );
};

export default MoodDashboard;
