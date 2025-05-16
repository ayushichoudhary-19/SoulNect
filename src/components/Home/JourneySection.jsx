import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconArrowRight } from "../icons/TablerIcons";

const JourneySection = ({ isAuthenticated }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const journeySteps = [
    {
      title: "Connect",
      description: "Begin by connecting with yourself and understanding your emotional landscape.",
      icon: "🧠",
    },
    {
      title: "Express",
      description: "Express your thoughts and feelings through journaling and mood tracking.",
      icon: "✏️",
    },
    {
      title: "Reflect",
      description: "Reflect on patterns and insights from your emotional journey.",
      icon: "🔍",
    },
    {
      title: "Grow",
      description: "Grow through mindfulness practices and community support.",
      icon: "🌱",
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-orange-50/30 to-purple-50/30"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-0 w-96 h-96 rounded-full bg-orange-200/30 mix-blend-multiply blur-3xl" />
        <div className="absolute bottom-40 left-0 w-96 h-96 rounded-full bg-purple-200/30 mix-blend-multiply blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text mb-2">
            Your Path to Well-Being
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-4">
            Embark on a transformative journey that nurtures your mind, body, and soul
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-purple-400 transform -translate-y-1/2 hidden md:block" />
      
          <div className="grid md:grid-cols-4 gap-8">
            {journeySteps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-1000 ease-out transform ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ 
                  transitionDelay: `${200 + index * 150}ms`
                }}
              >
                <div className="bg-white rounded-xl p-6 shadow-xl border border-gray-100 flex flex-col items-center text-center relative z-10 h-full">
                  <div className="absolute -top-6 w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center text-white text-xl shadow-lg">
                    {step.icon}
                  </div>
                  
                  <h3 className="mt-6 text-xl font-bold text-gray-800 mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`flex justify-center mt-16 transition-all duration-1000 ease-out transform ${
          isVisible
            ? 'translate-y-0 opacity-100 delay-1000'
            : 'translate-y-10 opacity-0'
        }`}>
          <NavLink 
            className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-full 
              bg-purple-600 text-white text-lg font-medium
              shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-purple-500/30
              transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
            to={isAuthenticated ? "/moodlog" : "/signin"}
          >
            <span className="relative z-10">
              {isAuthenticated ? "Continue Your Journey" : "Begin Your Journey"}
            </span>
            <IconArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;