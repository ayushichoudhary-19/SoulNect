import { useRef, useState } from 'react';

const FeatureCard = ({ icon, title, description, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  let gradientColors = '';
  let shadowColor = '';
  let iconBgColor = '';
  
  switch (title) {
    case 'Mood Log':
      gradientColors = 'from-blue-500/10 to-teal-500/10';
      shadowColor = 'shadow-blue-500/10';
      iconBgColor = 'bg-gradient-to-br from-blue-500 to-teal-500';
      break;
    case 'Journal':
      gradientColors = 'from-teal-500/10 to-emerald-500/10';
      shadowColor = 'shadow-teal-500/10';
      iconBgColor = 'bg-gradient-to-br from-teal-500 to-emerald-500';
      break;
    case 'Community':
      gradientColors = 'from-purple-500/10 to-indigo-500/10';
      shadowColor = 'shadow-purple-500/10';
      iconBgColor = 'bg-gradient-to-br from-purple-500 to-indigo-500';
      break;
    case 'Meditation':
      gradientColors = 'from-orange-500/10 to-amber-500/10';
      shadowColor = 'shadow-orange-500/10';
      iconBgColor = 'bg-gradient-to-br from-orange-500 to-amber-500';
      break;
    default:
      gradientColors = 'from-purple-500/10 to-orange-500/10';
      shadowColor = 'shadow-purple-500/10';
      iconBgColor = 'bg-gradient-to-br from-purple-500 to-orange-500';
  }

  return (
    <div
      ref={cardRef}
      className={`relative rounded-2xl p-6 overflow-hidden transition-all duration-500 
        bg-gradient-to-br ${gradientColors} backdrop-blur-sm 
        shadow-lg ${shadowColor} hover:shadow-xl transform hover:-translate-y-1
        border border-white/10 h-full flex flex-col`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-1000 ease-in-out" 
        style={{ opacity: isHovered ? 1 : 0 }} 
      />
      
      <div className="flex-1 flex flex-col items-center text-center z-10">
        <div className={`w-20 h-20 rounded-full ${iconBgColor} p-1 mb-6 flex items-center justify-center transform transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`}>
          <img
            className="w-12 h-12 object-contain"
            src={icon}
            alt={title}
            loading="lazy"
          />
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3 transition-all duration-300">
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
      
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-white/5 via-white/10 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
    </div>
  );
};

export default FeatureCard;