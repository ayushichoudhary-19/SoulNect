import React, { useEffect, useState } from 'react';
import axios from 'axios';

const backendURL = 'http://localhost:3000';

const MoodLogStreak = () => {
    const [streakData, setStreakData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetchStreakData(userId);
        } else {
            // Set default streak data when userId is not found
            setStreakData(generateDefaultStreakData());
            setLoading(false);
        }
    }, []);

    const fetchStreakData = async (userId) => {
        try {
            setLoading(true);
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const response = await axios.get(`${backendURL}/api/moodlog/streak/${userId}?timezone=${timezone}`);
            console.log('Fetched streak data:', response.data);
            setStreakData(response.data);
        } catch (error) {
            setError(true);
            console.error('Error fetching streak data:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateDefaultStreakData = () => {
        const today = new Date();
        const todayInIST = new Date(today.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        
        const weekDays = [];
        for (let i = 5; i >= -1; i--) {
            const day = new Date(todayInIST);
            day.setDate(todayInIST.getDate() - i);
            const formattedDate = day.toISOString().split('T')[0];
            weekDays.push({ date: formattedDate, count: 0 });
        }
        
        return weekDays;
    };

    const getColor = (count) => {
        if (count === 1) return '#90EE90'; // Light green
        if (count === 2) return '#32CD32'; // Lime green
        if (count >= 3) return '#006400'; // Dark green
        return 'white'; // Default color when no data
    };

    const renderWeek = () => {
        const today = new Date();
        const todayInIST = new Date(today.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        
        const weekDays = [];
        for (let i = 5; i >= -1; i--) {
            const day = new Date(todayInIST);
            day.setDate(todayInIST.getDate() - i);
            const formattedDate = day.toISOString().split('T')[0];
            weekDays.push(formattedDate);
        }
        
        return weekDays.map((date) => {
            const dayData = streakData.find(d => d.date === date);
            const count = dayData ? dayData.count : 0;

            return (
                <div key={date} className="flex flex-col items-center">
                    <div 
                        className="w-8 h-8 rounded-md mb-1 border"
                        style={{ backgroundColor: getColor(count) }}
                    ></div>
                    <span className="text-xs">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                </div>
            );
        });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className='flex items-center justify-center'>
            <div className="flex flex-col justify-center items-center px-7 py-4 rounded-md shadow-lg">
                <div className='flex items-center justify-center gap-2 w-full mb-2'>
                    <h3 className="text-xl font-bold">Weekly Streak</h3>
                    <img src="assets/images/journal/fire.png" alt="fire" className="w-5 h-5" />
                </div>
                <div className="flex justify-between">
                    {renderWeek()}
                </div>
            </div>
        </div>
    );
};

export default MoodLogStreak;
