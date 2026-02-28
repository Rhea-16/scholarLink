import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import DashboardHeader from '../../components/DashboardHeader';
import Footer from '../../components/Footer';
import { getToken, logout } from "../../utils/auth";
import Loading  from '../../components/loading.jsx';
import { MinimalUrgentCTA } from "../../components/RegistrationSubHeader.jsx";
import ScholarshipCard from "../../components/ScholarshipCard"
import { 
  Home, 
  FileText, 
  Target, 
  FolderOpen, 
  Settings, 
  Bell, 
  User, 
  Calendar, 
  TrendingUp,
  Clock,
  Award,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Sparkles,
  BarChart3,
  Upload,
  Shield,
  Zap,
  Eye,
  Download,
  Edit,
  CreditCard,
  FileCheck,
  Camera,
  DollarSign,
  Search,
  Filter,
  Building,
  Check,
  Circle,
  X,
  Menu,
  LogOut,
  ChevronDown,
  Award as AwardIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../utils/AuthContent.jsx"

<DashboardHeader/>

function EligibilityCounter({ data, expanded, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A2463] to-[#1E3A8A] flex items-center justify-center shadow-md"
          >
            <Target className="w-6 h-6 text-white" />
          </motion.div>
          
          <div>
            <div className="flex items-baseline gap-2">
              <motion.div
                key={data.total}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="font-poppins font-bold text-3xl text-[#0A2463]"
              >
                {data.total}
              </motion.div>
              <span className="font-inter text-lg text-gray-700">Scholarships</span>
            </div>
            <p className="font-inter text-sm text-gray-600 mt-1">
              Matched to your eligibility & financial profile
            </p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggle}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {expanded ? 'Show Less' : 'View Breakdown'}
          <ChevronRight className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </motion.button>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {data.categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-inter font-medium text-sm text-gray-900">
                      {category.name}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                      {category.match}%
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-poppins font-bold text-2xl text-[#0A2463]">
                      {category.count}
                    </span>
                    <span className="text-sm text-gray-500">scholarships</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(category.count / data.total) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-[#0A2463] to-blue-500 h-1.5 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-sm text-gray-900">
                      High Priority Matches
                    </h4>
                    <p className="text-sm text-gray-600">
                      Immediate deadlines & perfect eligibility fit
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors">
                  View {data.highMatch} Matches
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Interactive Roadmap Component (as provided)
function InteractiveRoadmap({ steps, completedSteps, onStepClick }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-poppins font-semibold text-lg text-gray-900">
            Your Scholarship Journey
          </h3>
          <p className="font-inter text-sm text-gray-600 mt-1">
            Track your progress and discover what's next
          </p>
        </div>
        <span className="text-sm font-medium text-[#0A2463]">
          {completedSteps.length} of {steps.length} completed
        </span>
      </div>
      
      <div className="relative mb-8">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200"></div>
        
        <div 
          className="absolute top-5 left-0 h-0.5 bg-[#0A2463] transition-all duration-1000"
          style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
        ></div>
        
        <div className="flex justify-between relative z-10">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = step.status === 'current';
            const isClickable = isCompleted || isCurrent;
            
            return (
              <motion.button
                key={step.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => isClickable && onStepClick?.(step)}
                className={`flex flex-col items-center cursor-${isClickable ? 'pointer' : 'default'}`}
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-green-100 text-green-600 shadow-sm' 
                      : isCurrent
                      ? 'bg-[#0A2463] text-white shadow-md'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={isCurrent ? { rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {step.icon}
                    </motion.div>
                  )}
                </motion.div>
                
                <div className="text-center max-w-[100px]">
                  <div className={`text-xs font-medium ${
                    isCurrent ? 'text-[#0A2463]' : 'text-gray-900'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{step.date}</div>
                </div>
                
                {isCurrent && (
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute top-12 w-2 h-2 bg-[#0A2463] rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
      
      {steps.find(s => s.status === 'current') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-inter font-semibold text-sm text-gray-900 mb-1">
                Current Step: Match Found
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                We found -- scholarships matching your profile!
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white text-blue-700 text-xs font-medium rounded-full border border-blue-300">
                  12 High Matches
                </span>
                <span className="px-3 py-1 bg-white text-green-700 text-xs font-medium rounded-full border border-green-300">
                  95% Avg. Match
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Overview View Component
function OverviewView({ priorityMatches, roadmapSteps, liveStatus, stats, eligibilityData, expandedEligibility, setExpandedEligibility, completedSteps, onStepClick }) {
  return (
    <>
      <EligibilityCounter 
        data={eligibilityData}
        expanded={expandedEligibility}
        onToggle={() => setExpandedEligibility(!expandedEligibility)}
      />

      {/* Limelight Feature */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-poppins font-semibold text-lg text-[#0A2463] mb-2">
                Matches Based on Your Eligibility & Financial Profile
              </h2>
              <p className="font-inter text-sm text-gray-600">
                Top scholarships matching your academic background and financial condition
              </p>
            </div>
            <Link
              to="/all-matches"
              className="flex items-center text-[#0A2463] font-inter font-medium text-sm hover:underline"
            >
              View all matches
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {priorityMatches.map((scholarship, index) => (
              <motion.div
                key={scholarship.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      {scholarship.matchPercentage}% Match
                    </span>
                    <span className="text-lg font-poppins font-bold text-[#0A2463]">
                      ₹{scholarship.amount.toLocaleString()}
                    </span>
                  </div>
                  
                  <h3 className="font-poppins font-semibold text-base text-gray-900 mb-3 line-clamp-2">
                    {scholarship.title}
                  </h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex flex-wrap gap-2">
                      {scholarship.eligibilityTags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{scholarship.provider}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        scholarship.financialCondition === 'Open to All' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {scholarship.financialCondition}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                      Deadline: {scholarship.deadline}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-[#0A2463] text-white text-sm font-medium rounded-lg hover:bg-[#1E3A8A] transition-colors"
                    >
                      Apply Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="font-inter text-sm text-gray-600">Eligible Now</span>
            <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              {stats.eligible.icon}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-poppins font-bold text-2xl text-gray-900">
              {stats.eligible.count}
            </span>
            <span className="text-sm text-green-600 font-medium">+{stats.eligible.new} new</span>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="font-inter text-sm text-gray-600">In Progress</span>
            <span className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
              {stats.inProgress.icon}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-poppins font-bold text-2xl text-gray-900">
              {stats.inProgress.count}
            </span>
            <span className="text-sm text-yellow-600 font-medium">{stats.inProgress.text}</span>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="font-inter text-sm text-gray-600">Submitted</span>
            <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              {stats.submitted.icon}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-poppins font-bold text-2xl text-gray-900">
              {stats.submitted.count}
            </span>
            <span className="text-sm text-blue-600 font-medium">{stats.submitted.successRate} success</span>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="font-inter text-sm text-gray-600">Awarded</span>
            <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              {stats.awarded.icon}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-poppins font-bold text-2xl text-gray-900">
              {stats.awarded.amount}
            </span>
            <span className="text-sm text-purple-600 font-medium">Next: {stats.awarded.nextPayout}</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Journey */}
        <InteractiveRoadmap 
          steps={roadmapSteps}
          completedSteps={completedSteps}
          onStepClick={onStepClick}
        />
        
        {/* Right Column - Live Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-poppins font-semibold text-lg text-gray-900">
                Live Application Status
              </h3>
              <p className="font-inter text-sm text-gray-600 mt-1">
                Real-time updates on your scholarship applications
              </p>
            </div>
            <Link
              to="/dashboard?view=applications"
              className="text-[#0A2463] font-inter font-medium text-sm hover:underline"
            >
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            {liveStatus.map((status, index) => (
              <motion.div
                key={status.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-inter font-medium text-gray-900">
                    {status.scholarship}
                  </h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${status.statusColor}`}>
                    {status.status}
                  </span>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{status.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${status.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`h-1.5 rounded-full ${status.statusColor}`}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{status.lastUpdated}</span>
                  <span className="text-[#0A2463] font-medium">{status.nextAction}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Scholarships View Component
function ScholarshipsView({ priorityMatches, eligibilityData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMatches, setFilteredMatches] = useState(priorityMatches);

return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-poppins font-semibold text-xl text-gray-900">
              All Scholarships
            </h2>
            <p className="font-inter text-sm text-gray-600 mt-1">
              Browse through {eligibilityData.total} scholarships matching your profile
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search scholarships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2463] focus:border-transparent w-full md:w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((scholarship, index) => (
            <motion.div
              key={scholarship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    scholarship.matchPercentage >= 90 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {scholarship.matchPercentage}% Match
                  </span>
                  <span className="text-lg font-poppins font-bold text-[#0A2463]">
                    ₹{scholarship.amount.toLocaleString()}
                  </span>
                </div>
                
                <h3 className="font-poppins font-semibold text-base text-gray-900 mb-3">
                  {scholarship.title}
                </h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building className="w-4 h-4" />
                    {scholarship.provider}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {scholarship.eligibilityTags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Deadline: {scholarship.deadline}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      scholarship.category === 'Government' 
                        ? 'bg-blue-100 text-blue-800'
                        : scholarship.category === 'Merit-Based'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {scholarship.category}
                    </span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <button className="w-full px-4 py-2 bg-[#0A2463] text-white text-sm font-medium rounded-lg hover:bg-[#1E3A8A] transition-colors">
                    View Details & Apply
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredMatches.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2">
              No scholarships found
            </h3>
            <p className="font-inter text-sm text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// // Documents View Component
// function DocumentsView() {
//   const documents = [
//     {
//       id: 1,
//       name: "Academic Transcript",
//       type: "PDF",
//       size: "2.4 MB",
//       status: "Verified",
//       uploadedDate: "Oct 15, 2024",
//       icon: <FileText className="w-5 h-5" />
//     },
//     {
//       id: 2,
//       name: "Income Certificate",
//       type: "PDF",
//       size: "1.8 MB",
//       status: "Verified",
//       uploadedDate: "Oct 15, 2024",
//       icon: <FileText className="w-5 h-5" />
//     },
//     {
//       id: 3,
//       name: "Aadhaar Card",
//       type: "PDF",
//       size: "3.2 MB",
//       status: "Pending Review",
//       uploadedDate: "Oct 20, 2024",
//       icon: <FileText className="w-5 h-5" />
//     },
//     {
//       id: 4,
//       name: "Student ID Card",
//       type: "Image",
//       size: "4.1 MB",
//       status: "Re-upload Required",
//       uploadedDate: "Oct 18, 2024",
//       icon: <Camera className="w-5 h-5" />
//     },
//     {
//       id: 5,
//       name: "Recommendation Letter",
//       type: "PDF",
//       size: "2.1 MB",
//       status: "Not Uploaded",
//       uploadedDate: "",
//       icon: <FileText className="w-5 h-5" />
//     }
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Verified': return 'bg-green-100 text-green-800';
//       case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
//       case 'Re-upload Required': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl border border-gray-200 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h2 className="font-poppins font-semibold text-xl text-gray-900">
//               My Documents
//             </h2>
//             <p className="font-inter text-sm text-gray-600 mt-1">
//               Upload and manage your scholarship application documents
//             </p>
//           </div>
          
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="flex items-center gap-2 px-4 py-2 bg-[#0A2463] text-white text-sm font-medium rounded-lg hover:bg-[#1E3A8A] transition-colors"
//           >
//             <Upload className="w-4 h-4" />
//             Upload New Document
//           </motion.button>
//         </div>

//         <div className="space-y-4">
//           {documents.map((doc, index) => (
//             <motion.div
//               key={doc.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
//                   <div className="text-blue-600">
//                     {doc.icon}
//                   </div>
//                 </div>
                
//                 <div>
//                   <h4 className="font-inter font-medium text-gray-900">
//                     {doc.name}
//                   </h4>
//                   <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
//                     <span>{doc.type}</span>
//                     <span>•</span>
//                     <span>{doc.size}</span>
//                     <span>•</span>
//                     <span>{doc.uploadedDate || 'Not uploaded'}</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-4">
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
//                   {doc.status}
//                 </span>
                
//                 <div className="flex items-center gap-2">
//                   {doc.status === 'Verified' && (
//                     <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
//                       <Download className="w-4 h-4" />
//                     </button>
//                   )}
//                   <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
//                     <Edit className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
        
//         <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//           <div className="flex items-center gap-3">
//             <Shield className="w-5 h-5 text-blue-600" />
//             <div>
//               <h4 className="font-inter font-medium text-gray-900 mb-1">
//                 Document Security
//               </h4>
//               <p className="text-sm text-gray-600">
//                 Your documents are securely encrypted and will only be shared with scholarship providers upon your application.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// Applications View Component
// function ApplicationsView() {
//   const applications = [
//     {
//       id: 1,
//       scholarship: "National Scholarship Portal 2024",
//       amount: "₹25,000",
//       status: "Under Review",
//       submittedDate: "Oct 15, 2024",
//       decisionDate: "Nov 30, 2024",
//       documents: 3,
//       statusColor: "bg-blue-100 text-blue-800",
//       progress: 65
//     },
//     {
//       id: 2,
//       scholarship: "STEM Excellence Scholarship",
//       amount: "₹50,000",
//       status: "Document Review",
//       submittedDate: "Oct 18, 2024",
//       decisionDate: "Dec 15, 2024",
//       documents: 4,
//       statusColor: "bg-yellow-100 text-yellow-800",
//       progress: 40
//     },
//     {
//       id: 3,
//       scholarship: "Women in Tech Grant",
//       amount: "₹40,000",
//       status: "Eligibility Verified",
//       submittedDate: "Oct 20, 2024",
//       decisionDate: "Jan 10, 2025",
//       documents: 5,
//       statusColor: "bg-green-100 text-green-800",
//       progress: 80
//     },
//     {
//       id: 4,
//       scholarship: "First Generation Learner Grant",
//       amount: "₹30,000",
//       status: "Submitted",
//       submittedDate: "Oct 22, 2024",
//       decisionDate: "Feb 15, 2025",
//       documents: 3,
//       statusColor: "bg-purple-100 text-purple-800",
//       progress: 20
//     }
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl border border-gray-200 p-6">
//         <div className="mb-6">
//           <h2 className="font-poppins font-semibold text-xl text-gray-900">
//             My Applications
//           </h2>
//           <p className="font-inter text-sm text-gray-600 mt-1">
//             Track all your scholarship applications in one place
//           </p>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-200">
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Scholarship</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Submitted</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Decision Date</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Progress</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {applications.map((app, index) => (
//                 <motion.tr
//                   key={app.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
//                 >
//                   <td className="py-4 px-4">
//                     <div className="font-inter font-medium text-gray-900">
//                       {app.scholarship}
//                     </div>
//                     <div className="text-sm text-gray-600 mt-1">
//                       {app.documents} documents uploaded
//                     </div>
//                   </td>
//                   <td className="py-4 px-4">
//                     <div className="font-inter font-semibold text-gray-900">
//                       {app.amount}
//                     </div>
//                   </td>
//                   <td className="py-4 px-4">
//                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.statusColor}`}>
//                       {app.status}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4 text-sm text-gray-600">
//                     {app.submittedDate}
//                   </td>
//                   <td className="py-4 px-4 text-sm text-gray-600">
//                     {app.decisionDate}
//                   </td>
//                   <td className="py-4 px-4">
//                     <div className="w-32">
//                       <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
//                         <span>{app.progress}%</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-1.5">
//                         <div 
//                           className="h-1.5 rounded-full bg-[#0A2463]"
//                           style={{ width: `${app.progress}%` }}
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-4 px-4">
//                     <div className="flex items-center gap-2">
//                       <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
//                         <Eye className="w-4 h-4" />
//                       </button>
//                       {app.status === 'Submitted' && (
//                         <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
//                           <Edit className="w-4 h-4" />
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
        
//         <div className="mt-6 flex items-center justify-between">
//           <div className="text-sm text-gray-600">
//             Showing {applications.length} applications
//           </div>
//           <div className="flex items-center gap-2">
//             <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
//               Previous
//             </button>
//             <button className="px-4 py-2 bg-[#0A2463] text-white text-sm font-medium rounded-lg hover:bg-[#1E3A8A]">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Dashboard() {
  const [activeView, setActiveView] = useState('overview');
  const [expandedEligibility, setExpandedEligibility] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(['1', '2']);
  const [isLocked, setIsLocked] = useState(true); // Locked state
  const navigate = useNavigate();
  const token = getToken();

  const {user, setUser} = useAuth();   
  const [loading, setLoading] = useState(true); 

   // Enhanced eligibility data
   const eligibilityData = {
     total: "--",
     highMatch: 12,
     categories: [
       { name: "Merit-Based", count: 0, match: 95 },
       { name: "Need-Based", count: 0, match: 88 },
       { name: "Government", count: 0, match: 92 },
       { name: "Corporate", count: 0, match: 85 }
     ]
   };
 
     useEffect(() => {
     if (!token) {
       navigate("/login");
       return;
     }
     
     async function fetchUser() {
     try {
       const token = getToken();
       console.log("Token: ",token)
       if(!token){
         navigate("/login");
         return;
       }
       const res = await fetch("http://localhost:8000/users/me", {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
 
       if (!res.ok) throw new Error("Unauthorized");
       const data = await res.json();
       setUser(data);
 
     }catch (err) {
       console.error(err);
       logout();
       navigate("/login");
     }finally {
       setLoading(false);
     }
   }
     fetchUser();
     if(user){
       console.log("USER OBJECT:", user);
       console.log("USER KEYS:", Object.keys(user));
     }
   }, [token, navigate]);
 
   // High-match priority scholarships
   const priorityMatches = [
     {
       id: 1,
       title: "National Scholarship Portal 2024",
       amount: 25000,
       deadline: "2024-12-15",
       provider: "Government of India",
       matchPercentage: 95,
       category: "Government",
       eligibilityTags: ["Minimum 85% marks", "Income < ₹8L", "Engineering/CS"],
       financialCondition: "Economically Weaker Section",
       isPriority: true
     },
     {
       id: 2,
       title: "STEM Excellence Scholarship",
       amount: 50000,
       deadline: "2024-11-30",
       provider: "Ministry of Education",
       matchPercentage: 92,
       category: "Merit-Based",
       eligibilityTags: ["90% marks", "Research project", "STEM discipline"],
       financialCondition: "Open to All",
       isPriority: true
     },
     {
       id: 3,
       title: "First Generation Learner Grant",
       amount: 40000,
       deadline: "2025-01-20",
       provider: "Social Justice Department",
       matchPercentage: 88,
       category: "Need-Based",
       eligibilityTags: ["First-gen learner", "Rural background", "Income < ₹5L"],
       financialCondition: "Below Poverty Line",
       isPriority: true
     }
   ];
 
   // Enhanced Roadmap Steps
   const roadmapSteps = [
     { 
       id: '1', 
       title: "Profile Complete", 
       status: "completed", 
       date: "Oct 15",
       icon: <User className="w-5 h-5" />,
       description: "Your profile is 100% complete"
     },
     { 
       id: '2', 
       title: "Document Upload", 
       status: "completed", 
       date: "Oct 20",
       icon: <Upload className="w-5 h-5" />,
       description: "3/5 documents verified"
     },
     { 
       id: '3', 
       title: "Match Found", 
       status: "current", 
       date: "Today",
       icon: <Target className="w-5 h-5" />,
       description: "47 scholarships found"
     },
     { 
       id: '4', 
       title: "Applied", 
       status: "pending", 
       date: "Next Step",
       icon: <FileText className="w-5 h-5" />,
       description: "Ready to apply"
     },
     { 
       id: '5', 
       title: "Under Review", 
       status: "pending", 
       date: "Future",
       icon: <Eye className="w-5 h-5" />,
       description: "Track applications"
     },
   ];
 
   // Live Status
   const liveStatus = [
     {
       id: 1,
       scholarship: "STEM Diploma Grant",
       status: "Under Review",
       statusColor: "bg-blue-900",
       lastUpdated: "2 hours ago",
       nextAction: "Awaiting decision",
       progress: 65
     },
     {
       id: 2,
       scholarship: "Future Leaders Award",
       status: "Document Review",
       statusColor: "bg-yellow-500",
       lastUpdated: "1 day ago",
       nextAction: "Upload LOR by Nov 10",
       progress: 40
     },
     {
       id: 3,
       scholarship: "Women in Tech Grant",
       status: "Eligibility Verified",
       statusColor: "bg-green-600",
       lastUpdated: "3 days ago",
       nextAction: "Apply by Dec 10",
       progress: 80
     }
   ];
 
   // Dashboard stats
   const dashboardStats = {
     eligible: { count: 12, new: 2, icon: <CheckCircle className="w-4 h-4" /> },
     inProgress: { count: 3, text: "Due soon", icon: <Clock className="w-4 h-4" /> },
     submitted: { count: 5, successRate: "80%", icon: <FileCheck className="w-4 h-4" /> },
     awarded: { amount: " ₹2,500", nextPayout: "Nov 15", icon: <DollarSign className="w-4 h-4" /> }
   };
 
   const handleStepClick = (step) => {
     if (step.id === '3') {
       setExpandedEligibility(true);
     }
   };

    const handleSaveScholarship = (id, savedState) => {
    // Update scholarship saved state
    setScholarships(prev => prev.map(scholarship =>
      scholarship.id === id 
        ? { ...scholarship, isSaved: savedState }
        : scholarship
    ))};
 
   const renderActiveView = () => {
     switch (activeView) {
       case 'scholarships':
         return <ScholarshipsView priorityMatches={priorityMatches} eligibilityData={eligibilityData} />;
      //  case 'saved':
      //    return <DocumentsView />;
      //  case 'applications':
      //    return <ApplicationsView />;
       default:
         return <OverviewView 
           priorityMatches={priorityMatches}
           roadmapSteps={roadmapSteps}
           liveStatus={liveStatus}
           stats={dashboardStats}
           eligibilityData={eligibilityData}
           expandedEligibility={expandedEligibility}
           setExpandedEligibility={setExpandedEligibility}
           completedSteps={completedSteps}
           onStepClick={handleStepClick}
         />;
     }
   };

  if(loading){
    return <Loading />
  }
  
    return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <DashboardHeader />
        <MinimalUrgentCTA />
      <main className="pt-7 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 pt-10">
          {/* Welcome Section with precise spacing */}
          <div className="mb-12 pt-6"> {/* Increased vertical space */}
            <h1 className="font-poppins font-semibold text-2xl text-gray-900 mb-2">
              Hey, {user.full_name.trim().split(" ")[0]}!
            </h1>
            <p className="font-inter text-sm text-gray-600">
              Here's a summary of your scholarship journey so far.
            </p>
          </div>

          {/* Locked State - Enhanced with grayscale aesthetic */}
          {isLocked && (
            <div className="relative">
              {/* Lock Icon - Positioned as divider between header and content */}
              <div className="absolute left-1/2 -top-6 transform -translate-x-1/2 z-30">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="relative"
                >
                  {/* Subtle grayscale outer glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full blur-md opacity-50" />
                  
                  {/* Icon container with grayscale appearance */}
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-b from-white to-gray-100 border-2 border-white shadow-lg flex items-center justify-center">
                    <svg 
                      className="w-7 h-7 text-gray-700" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2.5" 
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  
                  {/* Grayscale divider line */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-gray-300 to-transparent" />
                </motion.div>
              </div>

              {/* Content wrapper with grayscale blur boundary */}
              <div className="relative mt-10"> {/* Space for the lock icon */}
                
                {/* Semi-transparent grayscale overlay */}
                <div 
                  className="absolute inset-0 z-10 rounded-xl"
                  style={{
                    backgroundColor: 'rgba(243, 244, 246, 0)', // Gray-100 with opacity
                    mixBlendMode: 'multiply',
                  }}
                />
                
                {/* Reduced intensity blur layer with grayscale */}
                {/* <div 
                  className="absolute inset-0 z-0 rounded-xl overflow-hidden"
                  style={{
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    filter: 'saturate(20%) grayscale(60%) contrast(90%)', // Strong grayscale
                  }}
                /> */}
                
                {/* Grayscale cutoff boundary */}
                <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent z-20" />
                
                {/* Blurred content - maintains structure */}
                <div className="relative opacity-85">
                  <div className="space-y-8">
                    {renderActiveView()}
                  </div>
                </div>
                
                {/* Clear overlay for disabled state */}
                <div 
                  className="absolute inset-0 z-10 rounded-xl pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.5) 100%)',
                  }}
                />
              </div>
              
              {/* Unlock prompt with grayscale styling */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-8 z-30 relative"
              >
                <p className="font-inter text-sm text-gray-600 mb-3">
                  Complete your profile verification to unlock full dashboard access
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/registration')} // For testing
                  className="px-6 py-2 bg-[#0A2463] text-[#FFFFFF] sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Verify Profile
                </motion.button>
              </motion.div>
            </div>
          )}

          {/* Regular view when not locked */}
          {!isLocked && (
            <div className="space-y-8">
              {renderActiveView()}
            </div>
          )}
        </div>
        
      </main>
      <Footer />
    </div>
  );
}