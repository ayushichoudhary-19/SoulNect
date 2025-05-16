"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const MeditationCalendar = ({ filters = {} }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchSessions = async () => {
      if (!userId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/meditation/logs/${userId}`)
        let filteredSessions = response.data

        if (filters.theme) {
          filteredSessions = filteredSessions.filter(
            (session) => session.theme.toLowerCase() === filters.theme.toLowerCase()
          )
        }

        if (filters.duration) {
          const duration = Number.parseInt(filters.duration)
          filteredSessions = filteredSessions.filter((session) => session.duration === duration)
        }

        if (filters.mood) {
          filteredSessions = filteredSessions.filter(
            (session) => session.mood && session.mood.toLowerCase() === filters.mood.toLowerCase()
          )
        }

        setSessions(filteredSessions)
      } catch (error) {
        console.error("Error fetching meditation sessions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [userId, filters, currentMonth])

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const days = []

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-16" />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)

      const daySessions = sessions.filter((s) => {
        const sessionDate = new Date(s.timestamp)
        return (
          sessionDate.getFullYear() === year &&
          sessionDate.getMonth() === month &&
          sessionDate.getDate() === day
        )
      })

      days.push(
        <div key={day} className={`h-16 border rounded-md p-2 relative ${daySessions.length > 0 ? "bg-purple-50" : ""}`}>
          <div className="text-xs text-gray-600">{day}</div>
          {daySessions.length > 0 && (
            <div className="absolute bottom-2 left-2 w-2 h-2 bg-purple-500 rounded-full" title={`${daySessions.length} sessions`} />
          )}
        </div>
      )
    }

    return days
  }

  const monthYear = currentMonth.toLocaleString("default", { month: "long", year: "numeric" })

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-purple-600 hover:text-purple-800">&larr;</button>
        <h2 className="text-lg font-medium text-gray-700">{monthYear}</h2>
        <button onClick={nextMonth} className="text-purple-600 hover:text-purple-800">&rarr;</button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-gray-500 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
      )}
    </div>
  )
}

export default MeditationCalendar
