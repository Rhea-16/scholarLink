import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, ChevronRight, Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header({ 
  scrollToAbout, 
  scrollToTopScholarships, 
  scrollToHowItWorks 
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleHomepageNavigation = (section) => {
    // Check if we're already on homepage
    if (window.location.pathname === "/") {
      // On homepage, scroll to section
      if (section === "about" && scrollToAbout) {
        scrollToAbout();
      } else if (section === "top-scholarships" && scrollToTopScholarships) {
        scrollToTopScholarships();
      } else if (section === "how-it-works" && scrollToHowItWorks) {
        scrollToHowItWorks();
      }
    } else {
      // On other pages, navigate to homepage with hash
      navigate(`/#${section}`);
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { 
      label: "About", 
      onClick: () => handleHomepageNavigation("about") 
    },
    { 
      to: "/scholarships", 
      label: "All Scholarships" 
    },
    { 
      label: "Top Scholarships", 
      onClick: () => handleHomepageNavigation("top-scholarships") 
    },
    { 
      label: "How it works", 
      onClick: () => handleHomepageNavigation("how-it-works") 
    },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg shadow-blue-500/5"
    >
      <div className="px-6 lg:px-12">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
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
              <p className="font-inter text-xs text-gray-600">Scholarship Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.to ? (
                  <Link
                    to={item.to}
                    className="font-inter font-medium text-base text-gray-700 hover:text-[#0A2463] transition-colors duration-300 relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="font-inter font-medium text-base text-gray-700 hover:text-[#0A2463] transition-colors duration-300 relative group bg-transparent border-none cursor-pointer"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] group-hover:w-full transition-all duration-300"></span>
                  </button>
                )}
              </motion.div>
            ))}

            {/* Login Button */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/login"
                className="font-inter font-medium text-base text-gray-900 hover:text-[#0A2463] transition-colors duration-300 flex items-center gap-1 group"
              >
                <span>Login</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Sign Up Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/signup"
                className="group relative overflow-hidden bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] text-white font-inter font-medium text-base px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2"
              >
                <span className="relative z-10">Sign Up</span>
                <Sparkles className="w-4 h-4 group-hover:rotate-180 transition-all duration-300" />
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-gray-200"
          >
            <div className="py-6 space-y-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.to ? (
                    <Link
                      to={item.to}
                      onClick={() => setIsMenuOpen(false)}
                      className="block font-inter font-medium text-lg text-gray-700 hover:text-[#0A2463] py-2 transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className="w-full text-left font-inter font-medium text-lg text-gray-700 hover:text-[#0A2463] py-2 transition-colors duration-300 bg-transparent border-none"
                    >
                      {item.label}
                    </button>
                  )}
                </motion.div>
              ))}

              <div className="pt-6 space-y-4 border-t border-gray-200">
                {/* Mobile Login Button */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="font-inter font-medium text-lg text-gray-900 hover:text-[#0A2463] py-3 transition-colors duration-300 flex items-center justify-between group"
                  >
                    <span>Login</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                {/* Mobile Sign Up Button */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: (navItems.length + 1) * 0.1 }}
                >
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] text-white font-inter font-medium text-lg px-6 py-3.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-center group flex items-center justify-center gap-2"
                  >
                    <span>Sign Up</span>
                    <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-all duration-300" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}