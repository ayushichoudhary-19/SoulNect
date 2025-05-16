import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconArrowRight } from '../icons/TablerIcons';

const HeroSection = ({ isAuthenticated }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const parallaxOffset = Math.min(scrollY * 0.3, 100);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-purple-600/10 to-orange-500/30 z-0"
        style={{
          transform: `translateY(${parallaxOffset * 0.5}px)`
        }}
      />
      
      <div 
        className="absolute top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-3xl z-0"
        style={{
          transform: `translate(-50%, -50%) translateY(${parallaxOffset * 0.3}px)`
        }}
      />
      
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/2 translate-y-1/2 rounded-full bg-orange-500/20 blur-3xl z-0"
        style={{
          transform: `translate(50%, 50%) translateY(${-parallaxOffset * 0.3}px)`
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col items-center justify-center min-h-screen z-10">
        <div 
          className={`transform transition-all duration-1000 ease-out ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0'
          }`}
        >
          <img 
            className="w-72 md:w-96 mb-8 md:mb-12" 
            src="assets/images/SoulNect-Logo.png" 
            alt="SoulNect Logo"
            loading="lazy"
          />
        </div>
        
        <h1 
          className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center bg-clip-text 
            
          
            
            
            mb-6 transition-all duration-1000 ease-out ${
            isVisible 
              ? 'translate-y-0 opacity-100 delay-300' 
              : 'translate-y-10 opacity-0'
          }`}
        >
          Connect with Your Soul
        </h1>
        
        <p 
          className={`text-lg md:text-xl text-center max-w-3xl text-gray-500 mb-10 leading-relaxed transition-all duration-1000 ease-out ${
            isVisible 
              ? 'translate-y-0 opacity-100 delay-500' 
              : 'translate-y-10 opacity-0'
          }`}
        >
          A sanctuary for your emotional well-being, where soul meets connection in a journey of 
          self-discovery, mindfulness, and growth.
        </p>
        
        <NavLink 
          className={`group relative flex items-center justify-center gap-2 px-8 py-4 rounded-full 
             bg-purple-600  text-white text-lg font-medium
            shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-orange-500/30
            transition-all duration-300 overflow-hidden transform hover:-translate-y-1
            ${isVisible ? 'opacity-100 delay-700' : 'opacity-0'}`}
          to={isAuthenticated ? "/moodlog" : "/signin"}
        >
          <span className="relative z-10">
            {isAuthenticated ? "Continue Your Journey" : "Begin Your Journey"}
          </span>
          <IconArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </NavLink>
      </div>
    </section>
  );
};

export default HeroSection;