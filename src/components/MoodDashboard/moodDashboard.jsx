import React, { useEffect, useState, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import Chart from 'chart.js/auto';

// Firebase configuration (ensure this is defined correctly)
import { firebaseConfig } from '../../firebase';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const MoodDashboard = () => {
    const [lineChart, setLineChart] = useState(null);
    const [barChart, setBarChart] = useState(null);

    const lineChartRef = useRef(null);
    const barChartRef = useRef(null);

    useEffect(() => {
        const userUID = sessionStorage.getItem('userUID');
        if (!userUID) return;

        const moodTrackRef = collection(db, "Users", userUID, "moodTrack");

        const dates = [];
        const moodData = {};
        const moodCounts = {};

        const fetchData = async () => {
            const querySnapshot = await getDocs(moodTrackRef);

            querySnapshot.forEach((doc) => {
                dates.push(doc.id);
                const totalDateRecords = querySnapshot.size;

                const moodRecords = doc.data().moodRecords;

                moodRecords.forEach((record) => {
                    const mood = record.mood;
                    if (!moodData[mood]) {
                        moodData[mood] = Array(totalDateRecords).fill(0);
                    }
                    if (!moodCounts[mood]) {
                        moodCounts[mood] = 0;
                    }
                    const index = dates.indexOf(doc.id);
                    moodData[mood][index] += 1;
                    moodCounts[mood] += 1;
                });
            });

            console.log("Dates: ", dates);
            console.log("Mood Data: ", moodData);
            console.log("Mood Counts: ", moodCounts);

            // Create the line chart
            if (lineChart) lineChart.destroy();
            const newLineChart = new Chart(lineChartRef.current, {
                type: "line",
                data: {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Happy',
                            data: moodData['happy'] || [],
                            backgroundColor: 'rgba(75, 192, 192, 0.4)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            fill: true,
                        },
                        {
                            label: 'Excited',
                            data: moodData['excited'] || [],
                            backgroundColor: 'rgba(5, 92, 192, 0.4)',
                            borderColor: 'rgba(5, 92, 192, 1)',
                            borderWidth: 1,
                            fill: true,
                        },
                        {
                            label: 'Sad',
                            data: moodData['sad'] || [],
                            backgroundColor: 'rgba(255, 99, 132, 0.4)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                            fill: true,
                        },
                        {
                            label: 'Angry',
                            data: moodData['angry'] || [],
                            backgroundColor: 'rgba(55, 25, 206, 0.4)',
                            borderColor: 'rgba(55, 25, 206, 1)',
                            borderWidth: 1,
                            fill: true,
                        },
                        {
                            label: 'Stressed',
                            data: moodData['stressed'] || [],
                            backgroundColor: 'rgba(155, 205, 86, 0.4)',
                            borderColor: 'rgba(155, 205, 86, 1)',
                            borderWidth: 1,
                            fill: true,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: "Dates",
                            },
                        },
                        y: {
                            display: true,
                            stacked: false,
                            max: 3,
                            min: 0,
                            stepSize: 1,
                            ticks: {
                                callback: function(value) {
                                    return Number.isInteger(value) ? value : '';
                                }
                            },
                            title: {
                                display: true,
                                text: "Count",
                            },
                        },
                    },
                },
            });
            setLineChart(newLineChart);

            // Create the bar chart
            if (barChart) barChart.destroy();
            const newBarChart = new Chart(barChartRef.current, {
                type: 'bar',
                data: {
                    labels: Object.keys(moodCounts),
                    datasets: [
                        {
                            label: 'Mood Distribution',
                            data: Object.values(moodCounts),
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.4)',
                                'rgba(255, 99, 132, 0.4)',
                                'rgba(54, 162, 235, 0.4)',
                                'rgba(255, 206, 86, 0.4)',
                                'rgba(155, 205, 86, 0.4)',
                            ],
                            borderColor: [
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(155, 205, 86, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: "Moods",
                            },
                        },
                        y: {
                            display: true,
                            stacked: false,
                            min: 0,
                            stepSize: 1,
                            ticks: {
                                callback: function(value) {
                                    return Number.isInteger(value) ? value : '';
                                }
                            },
                            title: {
                                display: true,
                                text: "Count",
                            },
                        },
                    },
                },
            });
            setBarChart(newBarChart);
        };

        fetchData();
    }, [lineChart, barChart]);

    return (
        <div>
            <div className="chart">
                <canvas ref={lineChartRef} id="lineChart" style={{ height: '400px' }}></canvas>
            </div>

            <div className="chart">
                <canvas ref={barChartRef} id="barChart" style={{ height: '400px' }}></canvas>
            </div>
        </div>
    );
};

export default MoodDashboard;
