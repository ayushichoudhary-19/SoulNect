import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className='sticky top-0 z-50'>
      <nav className='bg-white px-4 lg:px-6 py-2.5'>
        <div className='flex flex-wrap justify-between items-center w-full lg:px-10 md:px-10'>

          <Link to="/" className="flex items-center">
            <img
              src="../../assets/images/SoulNect-Logo.png"
              className="mr-3 h-12"
              alt="Logo"
            />
          </Link>

        {/* Hambuger Icon */}
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
        
        {/* Mobile Menu */}
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
                >
                  Resources
                </NavLink>
              </li>
              <li className='flex items-center'>
                <NavLink
                  className={() =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-soft-pink lg:p-0`
                  }
                >
                  Community
                </NavLink>
              </li>
              <li className='flex items-center'>
                <button to="/login" className='bg-soft-pink rounded text-black hover:bg-soft-orange duration-500 px-4 lg:px-5 py-2 lg:py-2 focus:outline-none'>
                  Login
                </button>
              </li>
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
            >
              Home
            </NavLink>

            <NavLink
              className={() =>
                `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-soft-pink lg:p-0`
              }
              to="moodlog"
            >
              Mood Log
            </NavLink>

            <NavLink
              className={() =>
                `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-soft-pink lg:p-0`
              }
              to="myjournal"
            >
              My Journal
            </NavLink>

            <NavLink
              className={() =>
                `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-soft-pink lg:p-0`
              }
              to="meditation"
            >
              Meditation
            </NavLink>

            <NavLink
              className={() =>
                `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-soft-pink lg:p-0`
              }
            >
              Resources
            </NavLink>

            <NavLink
              className={() =>
                `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-soft-pink lg:p-0`
              }
            >
              Community
            </NavLink>

            <button to="/login" className='bg-soft-pink rounded text-black hover:bg-soft-orange duration-500 px-4 lg:px-5 py-2 lg:py-2 focus:outline-none'>
              Login
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
