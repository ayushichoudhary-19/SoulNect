import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useUser } from '../../store/userContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const location = useLocation();
  const navRef = useRef(null);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    toast.success('Logged out successfully!', {
      autoClose: 1000,
      theme: 'light',
    });
    navigate('/');
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeMobileMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    closeMobileMenu();
  }, [location]);

  const navLinks = [
    { to: '/home', label: 'Home' },
    { to: '/moodlog', label: 'Mood Log' },
    { to: '/myjournal', label: 'My Journal' },
    { to: '/community', label: 'Community' },
    { to: '/meditation', label: 'Meditation' },
    { to: '/resources', label: 'Resources' },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-md backdrop-blur bg-white/90">
      <nav className="px-2 py-3 max-w-7xl mx-auto" ref={navRef}>
        <div className="flex flex-wrap justify-between items-center w-full">
          <Link to="/" className="flex items-center">
            <img src="/assets/images/SoulNect-Logo.png" alt="Logo" className="h-12" />
          </Link>

          {/* Hamburger */}
          <div className="lg:hidden">
            <button onClick={toggleMobileMenu} className="text-black focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex flex-row items-center justify-center space-x-8 font-medium">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `py-2 px-1 duration-200 ${
                      isActive ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded duration-200"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/signin"
                  className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded duration-100"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>

        {/* Mobile Nav */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? 'max-h-[1000px] mt-4' : 'max-h-0'
          }`}
        >
          <ul className="space-y-2 px-4 pb-4 text-sm font-medium">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block py-2 ${
                      isActive ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              {user ? (
                <button
                  onClick={() => {
                    handleSignOut();
                    closeMobileMenu();
                  }}
                  className="bg-orange-500 w-full text-white hover:bg-soft-orange px-4 py-2 rounded duration-300"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/signin"
                  onClick={closeMobileMenu}
                  className="block bg-orange-500 text-white hover:bg-soft-orange px-4 py-2 rounded duration-300"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
