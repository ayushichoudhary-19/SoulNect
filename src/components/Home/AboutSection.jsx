import { useEffect, useRef, useState } from 'react';

const AboutSection = () => {
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

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-100/40 mix-blend-multiply blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-100/40 mix-blend-multiply blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ease-out transform ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <h1 className="text-4xl md:text-4xl font-bold bg-clip-text mb-6">
              What is SoulNect?
            </h1>
            
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p className="mb-4">
                SoulNect is a blend of <span className="text-orange-500 font-bold">soul</span> and <span className="text-purple-600 font-bold">connect</span>, 
                representing the idea of connecting with oneself and others on a deeper level for emotional well-being.
              </p>
              
              <p className="mb-4">
                It is a soulful mental health platform that embraces the power of connection for holistic well-being. 
                We focus on fostering a deep connection with yourself, others, and the world to nurture your soul and 
                promote emotional resilience.
              </p>
              
              <p>
                Through our integrated features and resources, we aim to guide you on a transformative journey of 
                self-discovery, self-care, and meaningful connections.
              </p>
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 ease-out transform ${
            isVisible ? 'translate-x-0 opacity-100 delay-300' : 'translate-x-10 opacity-0'
          }`}>
            <div className="relative w-full h-0 pb-[100%] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-orange-500/90 rounded-2xl">
                <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center mix-blend-overlay opacity-80" />
              </div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Mission</h3>
                <p className="text-white/90 mb-6">
                  To create a safe space where individuals can nurture their mental well-being through 
                  self-reflection, community support, and mindfulness practices.
                </p>
                <div className="w-12 h-1 bg-white rounded-full opacity-50" />
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-orange-300 shadow-xl" />
            <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-purple-300 shadow-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;