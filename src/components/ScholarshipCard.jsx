import { useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";
import { useAuth } from "./../utils/AuthContent.jsx"
import { 
  Bookmark,
  Calendar,
  DollarSign,
  Building,
  Tag,
  Award,
  Clock,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Users,
  MapPin,
  BookOpen,
  Heart,
  AlertCircle,
  LogIn
} from 'lucide-react';

// Login Modal Component
const LoginModal = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-50 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="font-inika text-xl font-bold text-gray-900 mb-2">
              Login Required
            </h3>
            <p className="font-poppins text-gray-600">
              You need to login to save scholarships
            </p>
          </div>
          
          <div className="space-y-4">
            {/* <button
              onClick={onLogin}
              className="w-full py-3 bg-[#0A2463] text-white font-poppins font-semibold rounded-lg hover:bg-[#1E3A8A] transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Login to Continue
            </button> */}

            <Link to="/login">
              <button
                className="w-full py-3 bg-[#0A2463] text-white font-poppins font-semibold rounded-lg hover:bg-[#1E3A8A] transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                Login to Continue
              </button>
            </Link>
            
            <button
              onClick={onClose}
              className="w-full py-3 border border-gray-300 text-gray-700 font-poppins font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main Scholarship Card Component
const ScholarshipCard = ({ 
  scholarship,
  onSave,
  onLogin,
  className = ''
}) => {
  const isSaved =  scholarship?.is_saved;
  console.log(isSaved)
  const [isHovered, setIsHovered] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [popAnimation, setPopAnimation] = useState(false);
  
  const { isAuthenticated } = useAuth();
  // Handle empty state
  if (!scholarship) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100/50 shadow-sm p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
          <Award className="w-8 h-8 text-blue-300" />
        </div>
        <h3 className="font-poppins font-semibold text-gray-900 mb-2">
          Scholarship Not Found
        </h3>
        <p className="font-poppins text-sm text-gray-600">
          This scholarship is no longer available
        </p>
      </div>
    );
  }

  const {
    scholarship_id,
    scholarship_name,
    benefit_amount,
    application_end_date,
    provider_name,
    provider_type,
    eligibility = []
  } = scholarship;

  // Format amount with ₹ symbol
  const formattedAmount = benefit_amount
    ? `₹${parseInt(benefit_amount).toLocaleString()}`
    : "—";

  // Format deadline
  const formatDeadline = (dateString) => {
    if (!dateString) return "No deadline";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleSaveClick = async () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8000/${
          isSaved ? "saved" : "saved"
        }/${scholarship_id}`,
        {
          method: isSaved ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);

      // Update UI state ONLY after successful API call
      if (onSave) {
        onSave(scholarship_id, !isSaved);
      }

    } catch (error) {
      console.error("Error saving scholarship:", error);
    }
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`relative bg-white rounded-2xl border border-gray-200
            shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1shadow-sm  
            hover:bg-white h-[320px] flex flex-col ${className}`}
      >

        {/* Glassmorphism overlay on hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none" />
        )}

        {/* Card Content - Fixed height with flex column */}
        <div className="p-5 flex flex-col h-full">
          {/* Header Row - Provider Type (Left) and Save Button (Right) */}
          <div className="flex items-start justify-between mb-2 flex-shrink-0">
            {/* Provider Type - Top Left */}
            <span className="font-inika text-sm font-medium text-[#0A2463] bg-[#0A2463]/5 px-3 py-1 rounded-full tracking-wide capitalize">
              {provider_type}
            </span>

            {/* Save Button - Top Right */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSaveClick}
              animate={popAnimation ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.3 }}
              className="shrink-0 p-2 rounded-full bg-white
                         shadow-md border border-gray-200
                         hover:bg-blue-50 transition"
            >
              {isSaved ? (
                <Bookmark className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
              ) : (
                <Bookmark className="w-5 h-5 text-gray-600 hover:text-[#0A2463]" />
              )}
            </motion.button>
          </div>

          {/* Scholarship Name - Fixed height with line clamp */}
          <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-3 
                       line-clamp-2 leading-tight tracking-tight h-[56px] flex-shrink-0">
            {scholarship_name}
          </h3>
          
          {/* Tags and Provider Info - Flex grow to take available space */}
          <div className="space-y-4 mb-4 flex-grow overflow-hidden">
            {/* Tags - Scrollable if needed */}
            <div className="flex flex-wrap gap-2 max-h-[80px] overflow-y-auto custom-scrollbar">
              {eligibility.map((elig, idx) => (
                <div key={idx} className="flex gap-2 flex-wrap">
                  
                  {elig.category && elig.category !== "any" && (
                    <span className="px-3 py-1 bg-blue-50 text-[#0A2463] font-poppins text-xs rounded-full border border-blue-100 whitespace-nowrap">
                      {elig.category.toUpperCase()}
                    </span>
                  )}
                  
                  {elig.gender && elig.gender !== "any" && (
                    <span className="px-3 py-1 bg-pink-50 text-pink-700 font-poppins text-xs rounded-full border border-pink-100 uppercase whitespace-nowrap">
                      {elig.gender}
                    </span>
                  )}

                  {elig.family_income_max && (
                    <span className="px-3 py-1 bg-green-50 text-green-700 font-poppins text-xs rounded-full border border-green-100 whitespace-nowrap">
                      Upto ₹{elig.family_income_max}
                    </span>
                  )}

                  {elig.course_stream && elig.course_stream !== "any" && (
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 font-poppins text-xs rounded-full border border-purple-100 whitespace-nowrap">
                      {elig.course_stream}
                    </span>
                  )}

                </div>
              ))}
            </div>
            
            {/* Provider Info */}
            <div className="flex items-center gap-2 ">
              <Building className="-translate-y-[2 cm]  w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="-translate-y-[2 cm] font-inika text-medium text-gray-700 tracking-wide truncate">
                {provider_name}
              </span>
            </div>
          </div>
          
          {/* Footer with Deadline and Apply Button - Fixed at bottom */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="font-poppins text-sm text-gray-700 tracking-wide truncate">
                {formatDeadline(application_end_date)}
              </span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-[#0A2463] text-white font-poppins font-semibold 
                       text-sm rounded-lg hover:bg-[#1E3A8A] transition-colors 
                       flex items-center gap-2 shadow-md hover:shadow-lg flex-shrink-0"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => {
          setShowLoginModal(false);
          if (onLogin) onLogin();
        }}
      />

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #0A2463;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #1E3A8A;
        }
      `}</style>
    </>
  );
};

// Scholarship Grid Component
const ScholarshipGrid = ({ 
  scholarships = [],
  onSaveScholarship,
  onLogin,
  loading = false
}) => {
// const handleSave = (scholarship_id, savedState) => {
//   console.log(
//     `Scholarship ${scholarship_id} ${savedState ? 'saved' : 'unsaved'}`
//   );
const handleSave = (scholarship_id, newState) => {
  const updatedScholarships = scholarships.map((sch) =>
    sch.scholarship_id === scholarship_id
      ? { ...sch, is_saved: newState }
      : sch
  );

  if (onSaveScholarship) {
    onSaveScholarship(updatedScholarships);
  }
};

  // Loading skeletons
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white/50 rounded-xl border border-gray-200 p-5 animate-pulse">
            <div className="flex justify-between mb-4">
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              <div className="h-7 bg-gray-300 rounded w-24"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
            <div className="space-y-4 mb-4">
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-300 rounded-lg w-28"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!scholarships || scholarships.length === 0) {
    return (
      <div className="text-center py-12">
        <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="font-inika text-xl font-bold text-gray-900 mb-2">
          No Scholarships Found
        </h3>
        <p className="font-poppins text-gray-600">
          Try adjusting your search criteria or filters
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence>
        {scholarships.map((scholarship) => (
          <ScholarshipCard
            key={scholarship.scholarship_id}
            scholarship={scholarship}
            onSave={handleSave}
            onLogin={onLogin}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

// Global styles component
const GlobalStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Inika:wght@400;700&family=Poppins:wght@300;400;500;600;700;800&display=swap');
    .font-inika { font-family: 'Inika', serif; letter-spacing: 0.025em; }
    .font-poppins { font-family: 'Poppins', sans-serif; }
    
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `}</style>
);

export { ScholarshipCard, ScholarshipGrid, GlobalStyles };
export default ScholarshipCard;