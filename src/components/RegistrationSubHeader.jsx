import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const MinimalUrgentCTA = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('ctaMinimalDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="sticky top-[4.5rem] z-40"
    >
      <div 
        // className="bg-gradient-to-r from-red-700 to-red-600 border-b border-red-650/3"
        className = "bg-[#0A2463]"
        style={{
          backgroundSize: '200% 100%',
          animation: 'shimmer 4s ease-in-out infinite',
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-2.5">
            <p className="text-white font-poppins text-sm font-medium">
              ⚠️ Complete your registration to unlock full access
            </p>
            
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/registration')}
                className="px-4 py-1.5 bg-white text-[#0A2463] rounded-full 
                         font-poppins font-semibold text-xs hover:bg-gray-50 
                         transition-colors"
              >
                Complete Now
              </motion.button>
              
              <button
                onClick={handleDismiss}
                className="text-white/60 hover:text-white text-xs"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main export with both versions
export {MinimalUrgentCTA };