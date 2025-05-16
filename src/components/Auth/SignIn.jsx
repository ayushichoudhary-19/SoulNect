import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../store/userContext';
import { motion, AnimatePresence } from "framer-motion";
import { IconMail, IconLock, IconUser, IconArrowRight } from "../icons/TablerIcons";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [showForm, setShowForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const endpoint = showForm ? `${import.meta.env.VITE_BACKEND_URL}/api/signin` : `${import.meta.env.VITE_BACKEND_URL}/api/signup`;
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('name', name);
        login(data.userId);
        navigate('/');
        window.location.reload(); 
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setError('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5 lg:px-0 py-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl bg-white border shadow-lg sm:rounded-2xl md:flex justify-center overflow-hidden"
      >
        <div className="md:w-1/2 bg-gradient-to-br hidden md:flex items-center justify-center p-8">
          <div className="max-w-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <img 
                src="/assets/images/SoulNect-Logo.png" 
                alt="SoulNect Logo" 
                className="mx-auto max-w-[200px] mb-6"
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {showForm ? "Welcome Back!" : "Join Our Community"}
              </h2>
              <p className="text-gray-600">
                {showForm 
                  ? "Sign in to continue your journey with our community." 
                  : "Create an account to connect with others and share your experiences."}
              </p>
            </motion.div>
          </div>
        </div>
        
        <div className="md:w-1/2 p-8 sm:p-10">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-full max-w-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={showForm ? "signin" : "signup"}
                  initial={{ opacity: 0, x: showForm ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: showForm ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center mb-8"
                >
                  <h1 className="text-2xl font-bold text-gray-800 mb-1">
                    {showForm ? "Sign In" : "Sign Up"}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {showForm ? "Access your account" : "Create a new account"}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <AnimatePresence>
                  {!showForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <IconUser size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-600 ring-0 focus:ring-1 transition-all duration-200"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <IconMail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg  focus:ring-orange-500 focus:border-orange-600 ring-0 focus:ring-1 transition-all duration-200"
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <IconLock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg  focus:ring-orange-500 focus:border-orange-600 ring-0 focus:ring-1 transition-all duration-200"
                  />
                </div>
                
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-orange-500 text-sm py-1"
                  >
                    {error}
                  </motion.div>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-500 text-white w-full py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none mt-2"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <span className="flex items-center">
                      {showForm ? "Sign in" : "Sign up"}
                      <IconArrowRight size={18} className="ml-1" />
                    </span>
                  )}
                </motion.button>
              </form>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-center"
              >
                <button
                  onClick={toggleForm}
                  className="text-white hover:text-orange-600 text-sm transition-colors"
                >
                  {showForm ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
