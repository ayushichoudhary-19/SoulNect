import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../store/userContext';

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [showForm, setShowForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        login(data.userId);
        navigate('/');
        window.location.reload(); 
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred');
      console.error(err);
    }
  };
  

  const toggleForm = () => {
    setShowForm(!showForm);
    setError('');
  };

  return (
    <div className="h-[80vh] items-center sm:flex block justify-center px-5 lg:px-0">
      <div className="max-w-screen-lg h-[80%] bg-white border block shadow sm:rounded-lg md:flex justify-center flex-1">
        <div className="sm:flex-1 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('assets/images/SoulNect-Logo.png')`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl boldfont-extra text-soft-orange mt-20">
                {showForm ? "Sign In" : "Sign Up"}
              </h1>
              <p className="text-[12px] text-gray-500">
                {showForm ? "Sign in to your account" : "Create a new account"}
              </p>
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-8">
                {!showForm && (
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border border-gray-300 p-2 rounded"
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border border-gray-300 p-2 rounded"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border border-gray-300 p-2 rounded"
                />
                {error && <p className="text-red-500">{error}</p>}
                <button
                  type="submit"
                  className="bg-soft-orange text-black w-full py-4 rounded-lg hover:bg-soft-pink transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  Sign {showForm ? "in" : "up"}
                </button>
              </form>
              <button
                className="mt-4 text-blue-500"
                onClick={toggleForm}
              >
                {showForm ? "Create an account" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;