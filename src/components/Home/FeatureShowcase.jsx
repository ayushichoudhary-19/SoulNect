import { useEffect, useRef, useState } from 'react';
import FeatureCard from './FeatureCard';

const FeatureShowcase = ({ features }) => {
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
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-purple-50/30 to-orange-50/30"
    >
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent z-10" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-0 w-96 h-96 rounded-full bg-purple-200/30 mix-blend-multiply blur-3xl" />
        <div className="absolute bottom-40 right-0 w-96 h-96 rounded-full bg-orange-200/30 mix-blend-multiply blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-purple-600 mb-6">
            Nurture Your Journey
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Discover the features designed to support every aspect of your emotional well-being and personal growth
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ease-out transform ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${150 + index * 150}ms`
              }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
};

export default FeatureShowcase;