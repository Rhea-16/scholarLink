// components/Header.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, ChevronLeft, Sparkles } from "lucide-react";

export default function Header({ backRedirect = "/" }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-4 px-6 lg:px-8 border-b border-gray-200 bg-white/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50"
    >
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <Link to="backRedirect" className="flex items-center gap-3 group">
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

        {/* Back to Home Button */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to={backRedirect}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-[#0A2463] text-[#0A2463] font-inter font-medium hover:bg-[#0A2463] hover:text-white transition-all duration-300"
          >
            <motion.div
              animate={{ x: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.div>
            <span>Back to Home</span>
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="ml-1"
            >
              <Sparkles className="w-3 h-3" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
}