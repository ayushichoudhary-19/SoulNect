import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../store/userContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const location = useLocation();
  const navRef = useRef(null);

  const handleSignOut = () => {
    logout();
    toast.success('Logged out successfully!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: () => window.location.reload()
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeMobileMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    closeMobileMenu();
  }, [location]);

  return (
    <header className='sticky top-0 z-50'>
      <nav className='bg-white px-4 lg:px-6 py-2.5'>
        <div className='flex flex-wrap justify-between items-center w-full lg:px-10 md:px-10'>
          <Link to="/" className="flex items-center">
            <img 
              src="assets/images/SoulNect-Logo.png"
              className="mr-3 h-12"
              alt="Logo"
            />
          </Link>

          {/* Hamburger Icon */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-black focus:outline-none"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        
          {/* Desktop Menu */}
          <div
            className={`hidden lg:flex justify-between items-center w-full lg:w-auto lg:order-1 ${
              mobileMenuOpen ? 'flex' : 'hidden'
            }`}
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li className='flex items-center'>
                <NavLink
                  className={() =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-soft-pink lg:p-0`
                  }
                  to='/'
                >
                  Home
                </NavLink>
              </li>
              <li className='flex items-center'>
                <NavLink
                  className={() =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-soft-pink lg:p-0`
                  }
                  to="moodlog"
                >
                  Mood Log
                </NavLink>
              </li>
              <li className='flex items-center'>
                <NavLink
                  className={() =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-soft-pink lg:p-0`
                  }
                  to="myjournal"
                >
                  My Journal
                </NavLink>
              </li>
              <li className='flex items-center'>
                <NavLink
                  className={() =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-soft-pink lg:p-0`
                  }
                  to="meditation"
                >
                  Meditation
                </NavLink>
              </li>
              <li className='flex items-center'>
                <NavLink
                  className={() =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-soft-pink lg:p-0`
                  }
                  to={`/resources`}
                >
                  Resources
                </NavLink>
              </li>
              <li className='flex items-center'>
                <NavLink
                  className={() =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-soft-pink lg:p-0`
                  }
                  to={`/community`}
                >
                  Community
                </NavLink>
              </li>
              {user ? (
                <li className='flex items-center'>
                  <button 
                    onClick={handleSignOut}
                    className='bg-soft-pink rounded text-black hover:bg-soft-orange duration-500 px-4 lg:px-5 py-2 lg:py-2 focus:outline-none'
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li className='flex items-center'>
                  <Link
                    to="signin"
                    className='bg-soft-pink rounded text-black hover:bg-soft-orange duration-500 px-4 lg:px-5 py-2 lg:py-2 focus:outline-none'
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-3 space-y-1">
          <NavLink
            className={() =>
              `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-soft-pink lg:p-0`
            }
            to='/'
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>

            <NavLink
              className={() =>
                `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-soft-pink lg:p-0`
              }
              to="moodlog"
              onClick={closeMobileMenu}
            >
              Mood Log
            </NavLink>

            <NavLink
              className={() =>
                `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-soft-pink lg:p-0`
              }
              to="myjournal"
              onClick={closeMobileMenu}
            >
              My Journal
            </NavLink>

            <NavLink
              className={() =>
                `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-soft-pink lg:p-0`
              }
              to="meditation"
              onClick={closeMobileMenu}
            >
              Meditation
            </NavLink>

            <NavLink
              className={() =>
                `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-soft-pink lg:p-0`
              }
              onClick={closeMobileMenu}
            >
              Resources
            </NavLink>

            <NavLink
              className={() =>
                `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-soft-pink lg:p-0`
              }
              onClick={closeMobileMenu}
            >
              Community
            </NavLink>
            {user ? (
            <button
              onClick={() => {
                handleSignOut();
                closeMobileMenu();
              }}
              className='bg-soft-pink rounded text-black hover:bg-soft-orange duration-500 px-4 lg:px-5 py-2 lg:py-2 focus:outline-none'
            >
              Logout
            </button>
          ) : (
            <Link
              to="signin"
              onClick={closeMobileMenu}
              className='bg-soft-pink rounded text-black hover:bg-soft-orange duration-500 px-4 lg:px-5 py-2 lg:py-2 focus:outline-none'
            >
              Login
            </Link>
          )}
        </div>
      )}
      </nav>
      <ToastContainer />
    </header>
  );
}

export default Navbar;