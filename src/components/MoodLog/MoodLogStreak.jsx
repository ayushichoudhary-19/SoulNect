import { useEffect, useState } from 'react';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';

const MoodLogStreak = () => {
    const [streakData, setStreakData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetchStreakData(userId);
        } else {
            setStreakData(generateDefaultStreakData());
            setLoading(false);
        }
    }, []);

    const fetchStreakData = async (userId) => {
        try {
            setLoading(true);
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/moodlog/streak/${userId}?timezone=${timezone}`);
            console.log('Fetched streak data:', response.data);
            setStreakData(response.data);
        } catch (error) {
            console.error('Error fetching streak data:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateDefaultStreakData = () => {
        const weekDays = [];
        for (let i = 5; i >= -1; i--) {
            const day = new Date();
            day.setDate(day.getDate() - i);
            const formattedDate = day.toISOString().split('T')[0];
            weekDays.push({ date: formattedDate, count: 0 });
        }
        return weekDays;
    };

    const getColor = (count) => {
        if (count === 1) return '#90EE90';
        if (count === 2) return '#32CD32';
        if (count >= 3) return '#006400';
        return 'white';
    };

    const renderWeek = () => {
        const weekDays = [];
        for (let i = 5; i >= -1; i--) {
            const day = new Date();
            day.setDate(day.getDate() - i);
            weekDays.push(day);
        }

        return weekDays.map((day) => {
            const formattedDate = day.toISOString().split('T')[0];
            const dayData = streakData.find(d => d.date === formattedDate);
            const count = dayData ? dayData.count : 0;

            const tooltipText = count > 0
                ? `Logged ${count} time${count > 1 ? 's' : ''} on ${day.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
                : 'No mood logged';

            return (
                <div key={formattedDate} className="flex flex-col items-center">
                    <div
                        className="w-8 h-8 rounded-md mb-1 border cursor-pointer"
                        style={{ backgroundColor: getColor(count) }}
                        data-tooltip-id={`tooltip-${formattedDate}`}
                        data-tooltip-content={tooltipText}
                    />
                    <Tooltip id={`tooltip-${formattedDate}`} />
                    <span className="text-xs">{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                </div>
            );
        });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className='flex items-center justify-center'>
            <div className="flex flex-col justify-center items-center px-7 py-4 rounded-md shadow-sm transition duration-300 ease-in-out">
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
