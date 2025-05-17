import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = () => {
      const userId = localStorage.getItem('userId');
      const publicRoutes = ['/', '/signin'];

      if (!userId && !publicRoutes.includes(location.pathname)) {
        navigate('/', { replace: true });
      }
      setTimeout(() => {
        setLoading(false);
      }, 800);
    };
    
    checkAuth();
  }, [navigate, location.pathname]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 mb-4 relative">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-white border-t-purple-600 border-b-purple-600"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <motion.h2 
              className="text-xl font-medium text-gray-800 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Please wait
            </motion.h2>
            <motion.p 
              className="text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Verifying your session...
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  return children;
};

export default AuthGuard;
