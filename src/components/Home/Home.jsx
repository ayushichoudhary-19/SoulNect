import { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import FeatureShowcase from './FeatureShowcase';
import JourneySection from './JourneySection';
import { motion, AnimatePresence } from 'framer-motion';
import { IconBrandGithub, IconX } from "../icons/TablerIcons";
import { useLocation } from 'react-router-dom';

const featuresData = [
  {
    icon: "assets/images/Home/moodlog.png",
    title: "Mood Log",
    description: "Track your emotional journey with interactive visualizations that provide insights into patterns and triggers.",
  },
  {
    icon: "assets/images/Home/journal.png",
    title: "Journal",
    description: "Express yourself freely in a secure space where your thoughts and reflections are preserved for deeper self-awareness.",
  },
  {
    icon: "assets/images/Home/community.png",
    title: "Community",
    description: "Connect with others on similar journeys, sharing experiences and support in a safe, nurturing environment.",
  },
  {
    icon: "assets/images/Home/meditate.png",
    title: "Meditation",
    description: "Find peace with guided practices that help calm your mind, reduce stress, and promote mindfulness in daily life.",
  },
  {
    icon: "assets/images/Home/resources.png",
    title: "Resources (Coming Soon)",
    description: "Access curated content including videos, articles, and tools designed to support your unique mental health journey.",
  },
];

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showGithubIcon, setShowGithubIcon] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    // Only show GitHub icon if we're on the root path '/'
    setShowGithubIcon(location.pathname === '/');
  }, [location.pathname]);

  return (
    <div className="relative overflow-hidden bg-white">
      <AnimatePresence>
        {showGithubIcon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 right-4 z-50"
          >
            <a 
              href="https://github.com/ayushichoudhary-19" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="View source on GitHub"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-purple-600 text-white p-3 rounded-full shadow-lg"
              >
                <IconBrandGithub size={28} />
              </motion.div>
            </a>
            
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowGithubIcon(false)}
              className="absolute -top-2 -right-2 bg-white text-gray-700 rounded-full p-1 shadow-md border border-gray-200"
              aria-label="Close GitHub icon"
            >
              <IconX size={12} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section */}
      <HeroSection isAuthenticated={isAuthenticated} />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Feature Showcase */}
      <FeatureShowcase features={featuresData} />
      
      {/* Journey Section */}
      <JourneySection isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default Home;