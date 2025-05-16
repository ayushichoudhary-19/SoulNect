"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconArrowLeft,
  IconPlayerPlay,
  IconVolume,
  IconClock,
} from "../components/icons/TablerIcons";

const MeditationStartPage = () => {
  const [step, setStep] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [customMinutes, setCustomMinutes] = useState("");
  const [customSeconds, setCustomSeconds] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const navigate = useNavigate();

  const durations = [
    { value: 3, label: "3 min" },
    { value: 5, label: "5 min" },
    { value: 10, label: "10 min" },
    { value: 15, label: "15 min" },
    { value: 20, label: "20 min" },
  ];

  const themes = [
    {
      id: "rain",
      name: "Rain",
      color: "from-gray-400 to-gray-600",
      image: "/assets/images/meditation/rain.png",
      audio: "/assets/audios/rain.mp3",
    },
    {
      id: "ocean",
      name: "Ocean",
      color: "from-blue-400 to-blue-600",
      image: "/assets/images/meditation/ocean.png",
      audio: "/assets/audios/ocean.mp3",
    },
    {
      id: "winter",
      name: "Winter",
      color: "from-indigo-200 to-indigo-400",
      image: "/assets/images/meditation/winter.png",
      audio: "/assets/audios/winter.mp3",
    },
    {
      id: "summer",
      name: "Summer",
      color: "from-orange-300 to-orange-500",
      image: "/assets/images/meditation/summer.png",
      audio: "/assets/audios/summer.mp3",
    },
    {
      id: "air",
      name: "Air",
      color: "from-purple-300 to-purple-500",
      image: "/assets/images/meditation/air.png",
      audio: "/assets/audios/air.mp3",
    },
    {
      id: "campfire",
      name: "Campfire",
      color: "from-amber-400 to-amber-600",
      image: "/assets/images/meditation/campfire.png",
      audio: "/assets/audios/campfire.mp3",
    },
  ];

  const handleDurationSelect = (durationInMinutes) => {
    setSelectedDuration(durationInMinutes)
    setShowCustomInput(false)
    setStep(2)
  }  

  const handleCustomDurationSubmit = (e) => {
    e.preventDefault()
    const totalSeconds = parseInt(customMinutes || "0") * 60 + parseInt(customSeconds || "0")
    if (totalSeconds > 0) {
      setSelectedDuration(totalSeconds / 60)
      setStep(2)
    }
  }  

  const toggleCustomInput = () => {
    setShowCustomInput(!showCustomInput);
    setSelectedDuration(null);
  };

  const handleThemeSelect = (theme) => {
    navigate("/meditation/session", {
      state: { duration: selectedDuration, theme },
    });
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      navigate("/meditation");
    }
  };

  const [playingAudio, setPlayingAudio] = useState(null);

  const handleAudioPreview = (theme) => {
    if (playingAudio) {
      playingAudio.pause();
      playingAudio.currentTime = 0;
      setPlayingAudio(null);
      return;
    }

    const audio = new Audio(theme.audio);
    audio.volume = 0.5;
    audio.loop = true;

    audio
      .play()
      .then(() => {
        setPlayingAudio(audio);
      })
      .catch((e) => {
        console.error("Audio play failed:", e);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          className="flex items-center text-purple-600 hover:text-purple-800 transition-colors mb-8"
        >
          <IconArrowLeft size={20} className="mr-1" />
          <span>{step === 1 ? "Back to Meditation" : "Choose Duration"}</span>
        </motion.button>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-10"
              >
                How long do you want to meditate?
              </motion.h1>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
                {durations.map((duration, index) => (
                  <motion.button
                    key={duration.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDurationSelect(duration.value)}
                    className={`p-6 rounded-2xl text-xl font-medium shadow-md transition-all ${
                      selectedDuration === duration.value * 60 &&
                      !showCustomInput
                        ? "bg-purple-600 text-white"
                        : "bg-white text-gray-700 hover:bg-purple-100"
                    }`}
                  >
                    {duration.label}
                  </motion.button>
                ))}

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleCustomInput}
                  className={`p-6 rounded-2xl text-xl font-medium shadow-md transition-all flex items-center justify-center ${
                    showCustomInput
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 hover:bg-purple-100"
                  }`}
                >
                  <IconClock size={20} className="mr-2" />
                  Custom
                </motion.button>
              </div>

              <AnimatePresence>
                {showCustomInput && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8 flex flex-col items-center"
                    onSubmit={handleCustomDurationSubmit}
                  >
                    <div className="flex items-center gap-2 bg-white rounded-xl shadow-md p-2 w-full max-w-xs">
                      <input
                        type="text"
                        value={customMinutes}
                        onChange={(e) =>
                          /^\d*$/.test(e.target.value) &&
                          setCustomMinutes(e.target.value)
                        }
                        placeholder="Min"
                        className="w-1/2 p-2 outline-none text-xl text-center"
                      />
                      <span className="text-gray-500">:</span>
                      <input
                        type="text"
                        value={customSeconds}
                        onChange={(e) =>
                          /^\d*$/.test(e.target.value) &&
                          setCustomSeconds(e.target.value)
                        }
                        placeholder="Sec"
                        className="w-1/2 p-2 outline-none text-xl text-center"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={
                        (customMinutes === "" && customSeconds === "") ||
                        parseInt(customMinutes || "0") * 60 +
                          parseInt(customSeconds || "0") <=
                          0
                      }
                      className={`mt-4 px-8 py-3 rounded-xl text-white font-medium shadow-md ${
                        (customMinutes === "" && customSeconds === "") ||
                        parseInt(customMinutes || "0") * 60 +
                          parseInt(customSeconds || "0") <=
                          0
                          ? "bg-purple-400 cursor-not-allowed"
                          : "bg-purple-600 hover:bg-purple-700"
                      }`}
                    >
                      Continue
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-10"
              >
                Choose your ambience
              </motion.h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {themes.map((theme, index) => (
                  <motion.div
                    key={theme.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                    onClick={() => handleThemeSelect(theme)}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAudioPreview(theme);
                      }}
                      className="absolute top-3 right-3 z-10 bg-white/30 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm"
                      title="Preview Sound"
                    >
                      <IconVolume size={18} />
                    </button>

                    <div className="aspect-w-4 aspect-h-3 w-full">
                      <img
                        src={
                          theme.image || `/placeholder.svg?height=300&width=400`
                        }
                        alt={theme.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">{theme.name}</h3>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/30 backdrop-blur-sm rounded-full p-4"
                      >
                        <IconPlayerPlay size={32} className="text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MeditationStartPage;
