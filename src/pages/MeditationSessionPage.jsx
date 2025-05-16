"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { IconPlayerPause, IconPlayerPlay, IconX, IconVolume, IconVolumeOff } from "../components/icons/TablerIcons";
const MeditationSessionPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { duration, theme } = location.state || { duration: 5, theme: { id: "ocean", name: "Ocean" } }
  const [completedLogId, setCompletedLogId] = useState(null)
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  const [isActive, setIsActive] = useState(true)
  const [breathPhase, setBreathPhase] = useState("in")
  const [prompt, setPrompt] = useState("")
  const [showPrompt, setShowPrompt] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [selectedMood, setSelectedMood] = useState(null)

  const audioRef = useRef(null)
  const intervalRef = useRef(null)
  const breathIntervalRef = useRef(null)
  const promptTimeoutRef = useRef(null)

  const userId = localStorage.getItem("userId")

  const prompts = [
    "Close your eyes",
    "Let your thoughts drift away",
    "Feel the breath",
    "Relax your shoulders",
    "Notice the sensations in your body",
    "Be present in this moment",
    "Let go of any tension",
    "Find stillness within",
  ]

  useEffect(() => {
    if (theme && theme.audio) {
      audioRef.current = new Audio(theme.audio)
      audioRef.current.loop = true
      audioRef.current.volume = 0.5

      if (!isMuted) {
        audioRef.current.play().catch((e) => console.error("Audio play failed:", e))
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [theme])

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((e) => console.error("Audio play failed:", e))
      }
    }
  }, [isMuted])

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0 && !isCompleted) {
      handleComplete()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, timeLeft])

  useEffect(() => {
    if (isActive) {
      const breathCycle = () => {
        setBreathPhase("in")
        setTimeout(() => {
          setBreathPhase("hold")
          setTimeout(() => {
            setBreathPhase("out")
          }, 4000)
        }, 4000)
      }

      breathIntervalRef.current = setInterval(breathCycle, 14000) 
      breathCycle()
    }

    return () => {
      if (breathIntervalRef.current) {
        clearInterval(breathIntervalRef.current)
      }
    }
  }, [isActive])

  useEffect(() => {
    if (isActive) {
      const showRandomPrompt = () => {
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]
        setPrompt(randomPrompt)
        setShowPrompt(true)

        promptTimeoutRef.current = setTimeout(() => {
          setShowPrompt(false)
        }, 5000)
      }

      const promptInterval = setInterval(showRandomPrompt, 30000)
      showRandomPrompt()

      return () => {
        clearInterval(promptInterval)
        if (promptTimeoutRef.current) {
          clearTimeout(promptTimeoutRef.current)
        }
      }
    }
  }, [isActive])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const togglePlayPause = () => {
    const newActiveState = !isActive
    setIsActive(newActiveState)
  
    if (!newActiveState) {
      // ⏸ Pause all
      if (audioRef.current) audioRef.current.pause()
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (breathIntervalRef.current) clearInterval(breathIntervalRef.current)
      if (promptTimeoutRef.current) clearTimeout(promptTimeoutRef.current)
    } else {
      // ▶️ Resume all
      if (audioRef.current) {
        audioRef.current.play().catch((e) => console.error("Audio play failed:", e))
      }
  
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
  
      const breathCycle = () => {
        setBreathPhase("in")
        setTimeout(() => {
          setBreathPhase("hold")
          setTimeout(() => {
            setBreathPhase("out")
          }, 4000)
        }, 4000)
      }
  
      breathIntervalRef.current = setInterval(breathCycle, 14000)
      breathCycle()
    }
  }
  

  const toggleMute = () => {
    if (!isActive) return;
    setIsMuted(!isMuted);
  }

  const handleExit = () => {
    if (window.confirm("Are you sure you want to end your meditation session?")) {
      navigate("/meditation")
    }
  }

  const handleComplete = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (breathIntervalRef.current) clearInterval(breathIntervalRef.current)
    if (promptTimeoutRef.current) clearTimeout(promptTimeoutRef.current)

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    setIsCompleted(true)

    if (userId) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/meditation/log`, {
          userId,
          duration,
          theme: theme.id,
          timestamp: new Date().toISOString(),
        })
        .then((res) => {
          setCompletedLogId(res.data._id)
        })
        .catch((error) => {
          console.error("Error logging meditation:", error)
        })
    }
}

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)

    if (userId && completedLogId) {
      axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/meditation/log/mood`, {
        logId: completedLogId,
        mood,
      })
      .catch((error) => {
        console.error("Error logging mood:", error)
      })
    }

    setTimeout(() => {
      navigate("/meditation/completed", {
        state: {
          duration,
          theme: theme.name,
          mood,
        },
      })
    }, 1000)
  }

  const getBreathAnimation = () => {
    switch (breathPhase) {
      case "in":
        return { scale: 1.5, opacity: 1, transition: { duration: 4, ease: "easeInOut" } }
      case "hold":
        return { scale: 1.5, opacity: 1, transition: { duration: 4, ease: "easeInOut" } }
      case "out":
        return { scale: 1, opacity: 0.8, transition: { duration: 6, ease: "easeInOut" } }
      default:
        return { scale: 1, opacity: 0.8 }
    }
  }

  const getBreathText = () => {
    switch (breathPhase) {
      case "in":
        return "Breathe in"
      case "hold":
        return "Hold"
      case "out":
        return "Breathe out"
      default:
        return "Breathe"
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${theme?.image || "/placeholder.svg?height=1080&width=1920"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 text-white text-center">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key="meditation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              {/* Controls */}
              <div className="fixed top-4 right-4 z-[100] flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMute}
                  disabled={!isActive}
                  className={`bg-white/20 backdrop-blur-sm p-3 rounded-full ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isMuted ? (
                    <IconVolumeOff size={24} className="text-white" />
                  ) : (
                    <IconVolume size={24} className="text-white" />
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleExit}
                  className="bg-white/20 backdrop-blur-sm p-3 rounded-full"
                >
                  <IconX size={24} className="text-white" />
                </motion.button>
              </div>

              {/* Prompt */}
              <div className="h-16 mb-6 flex items-center justify-center">
  <AnimatePresence>
    {showPrompt && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="text-2xl md:text-3xl font-light text-center"
      >
        {prompt}
      </motion.div>
    )}
  </AnimatePresence>
</div>


              {/* Breathing Circle */}
              <div className="relative flex flex-col items-center justify-center mb-8 mt-4 md:mt-10">
  <motion.div
    animate={getBreathAnimation()}
    className="w-40 h-40 md:w-64 md:h-64 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
  >
    <div className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-white/30 backdrop-blur-md"></div>
  </motion.div>
  <div className="absolute text-xl md:text-2xl font-light">{getBreathText()}</div>
</div>


              <div className="text-6xl md:text-7xl font-light mb-12">{formatTime(timeLeft)}</div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlayPause}
                className="bg-white/20 backdrop-blur-sm p-4 rounded-full"
              >
                {isActive ? (
                  <IconPlayerPause size={32} className="text-white" />
                ) : (
                  <IconPlayerPlay size={32} className="text-white" />
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="completed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Meditation Complete
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl mb-12"
              >
                How do you feel now?
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-2xl mx-auto"
              >
                {["Calm", "Focused", "Relaxed", "Energized", "Balanced"].map((mood, index) => (
                  <motion.button
                    key={mood}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMoodSelect(mood)}
                    className={`p-4 rounded-xl text-center transition-all ${
                      selectedMood === mood
                        ? "bg-white text-purple-600 font-medium"
                        : "bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    }`}
                  >
                    {mood}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MeditationSessionPage
