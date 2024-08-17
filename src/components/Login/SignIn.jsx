import React, { useEffect, useState } from "react";
import { signInWithGoogle } from "../../auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(true);
  
  useEffect(() => {
    const uid = JSON.parse(localStorage.getItem('user'));
    if(uid) {
      setShowForm(false);
      console.log(uid);
    }
  }, []);

  const signIn = async () => {
    try {
      const res = await signInWithGoogle();
      localStorage.setItem('user', JSON.stringify(res.user));
      console.log(res.user.uid);
      setShowForm(false);
      window.onload = () => {
        navigate('/');
      };
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
    
  }

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
          {showForm ? (
          <div className="flex flex-col items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl boldfont-extra text-soft-orange mt-20">
                Sign In
              </h1>
              <p className="text-[12px] text-gray-500">
                Sign in to your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <button
                  className="mt-5 bg-soft-orange text-black w-full py-4 rounded-lg hover:bg-soft-pink transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={signIn}
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign in with Google</span>
                </button>
              </div>
            </div>
          </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl boldfont-extra text-soft-orange mt-20">
                  Welcome
                </h1>
                <p className="text-[12px] text-gray-500">
                  You have successfully signed in
                </p>
                <button
                  className="mt-5 bg-soft-orange text-black w-full py-4 rounded-lg hover:bg-soft-pink transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={() => {
                    navigate('/');
                  }
                  }
                >
                Home Page
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
