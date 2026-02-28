// components/DashboardHeader.jsx
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { useAuth } from "./../utils/AuthContent.jsx"

export default function DashboardHeader() {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
    const { user, setUser, isLoggedIn, setIsLoggedIn, loadingAuth } = useAuth();

  const navItems = [
    { label: "Overview", to: "/home" },
    { label: "Scholarships", to: "/all-scholarships" },
    { label: "Saved", to: "/saved" },
    { label: "Applied Scholarships", to: "/appliedScholarship" },
  ];

  const firstName = useMemo(() => {
    const name = user?.full_name?.trim();
    if (!name) return "Student";
    return name.split(/\s+/)[0];
  }, [user]);
  const handleLogout = () => {
      navigate("/");
  };


  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg shadow-blue-500/5"
    >
      <div className="px-6 lg:px-12">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo - Left side */}
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A2463] to-[#1E3A8A] flex items-center justify-center shadow-lg shadow-blue-500/20"
            >
              <Award className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h1 className="font-poppins font-semibold text-xl text-gray-900 group-hover:text-[#0A2463] transition-colors duration-300">
                ScholarLink
              </h1>
              <p className="font-inter text-xs text-gray-600">Student Dashboard</p>
            </div>
          </Link>

          {/* Navigation Items - Centered */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2 text-sm">
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.to}
                  className="font-inter font-medium text-base text-gray-700 hover:text-[#0A2463] transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right side - Actions */}
          <div className="flex items-center gap-6">
            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A2463] to-[#1E3A8A] flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="hidden lg:block text-left">
                  {/* Prevent crash on refresh */}
                  <div className="font-inter font-semibold text-sm text-gray-900">
                    {loadingAuth ? "Loading..." : firstName}
                  </div>
                  <div className="font-inter text-xs text-gray-600">Student</div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 max-w-5xl bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="font-inter font-semibold text-sm text-gray-900">{user.full_name}</div>
                      <div className="font-inter text-xs text-gray-600">{user.email}</div>
                    </div>
                    
                    <div className="py-2">
                      <Link
                        to="/dashboard?view=profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      
                      <Link
                        to="/dashboard?view=settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Hidden on desktop */}
        <div className="lg:hidden py-4 border-t border-gray-200">
          <div className="flex items-center justify-between overflow-x-auto scrollbar-hide">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="px-3 py-2 text-sm font-inter font-medium text-gray-700 hover:text-[#0A2463] whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.header>
  );
}

// AnimatePresence wrapper
function AnimatePresence({ children }) {
  return children;
}

