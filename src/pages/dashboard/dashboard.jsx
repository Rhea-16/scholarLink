import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import HeaderDashboard from '../../components/HeaderDashboard.jsx';
import Footer from '../../components/Footer.jsx';
import { getToken, logout } from "../../utils/auth.js";
import Loading  from '../../components/loading.jsx';
import { scholarships_data } from './scholarships.jsx'
import ScholarshipCard from "../../components/ScholarshipCard.jsx"
import { 
  Home, 
  Copy,
  CheckCheck,
  FileText, 
  Target, 
  Bookmark,
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
  Award as AwardIcon,
  ExternalLink,
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Calendar as CalendarIcon,
  AlertTriangle,
  HelpCircle,
  GraduationCap,
  File,
  School,
  BookOpen,
  Briefcase,
  Heart,
  Star,
  ThumbsUp,
  MessageCircle,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../utils/AuthContent.jsx"


// Helper function to calculate days until deadline
const getDaysUntilDeadline = (deadlineDate) => {
  const today = new Date();
  const deadline = new Date(deadlineDate);
  const diffTime = deadline - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};


// Helper to get urgency color based on days left
const getUrgencyColor = (daysLeft) => {
  if (daysLeft <= 7) return 'bg-red-100 text-red-800 border-red-200'; // Urgent
  if (daysLeft <= 15) return 'bg-orange-100 text-orange-800 border-orange-200'; // Soon
  if (daysLeft <= 30) return 'bg-yellow-100 text-yellow-800 border-yellow-200'; // Upcoming
  return 'bg-green-100 text-green-800 border-green-200'; // Plenty of time
};

// Helper to get urgency label
const getUrgencyLabel = (daysLeft) => {
  if (daysLeft <= 7) return 'Due Soon';
  if (daysLeft <= 15) return 'Due Soon';
  if (daysLeft <= 30) return 'Upcoming';
  return 'Plenty of Time';
};

// Helper to get status badge styles for scholarship
const getScholarshipStatusStyles = (status) => {
  switch(status) {
    case 'saved': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'applied': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'tracking': return 'bg-green-100 text-green-800 border-green-200';
    case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

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
              Matched just for you
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Per-Scholarship Status Tracker Component
function ScholarshipStatusTracker({ scholarship, onClose, onStatusChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState(scholarship.userNotes || '');
  const [applicationId, setApplicationId] = useState(scholarship.applicationId || '');
  const [dateApplied, setDateApplied] = useState(scholarship.dateApplied || '');
  const [reminderDate, setReminderDate] = useState(scholarship.reminderDate || '');
  const [newReminder, setNewReminder] = useState('');
  const [reminders, setReminders] = useState(scholarship?.reminders || []);
  const [showCopied, setShowCopied] = useState(false);
   const [status, setStatus] = useState(scholarship.userStatus || 'saved');

const handleCopyLink = () => {
  const link = `https://scholarships.gov/${scholarship.id}`;
  navigator.clipboard.writeText(link).then(() => {
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
};
  const statusOptions = [
    { id: 'saved', label: 'Saved', icon: <Bookmark className="w-4 h-4" />, color: 'purple',description: 'Scholarship saved for later' },
    { id: 'applied', label: 'Applied', icon: <ExternalLink className="w-4 h-4" />, color: 'blue',description: 'Application submitted'  },
    { id: 'tracking', label: 'Tracking', icon: <Bell className="w-4 h-4" />, color: 'green' ,description: 'Monitoring progress' },
    { id: 'completed', label: 'Done', icon: <CheckCircle className="w-4 h-4" />, color: 'gray' ,description: 'Process completed' }
  ];

  const addReminder = () => {
    if (newReminder.trim()) {
      setReminders([...reminders, { id: Date.now(), text: newReminder, completed: false }]);
      setNewReminder('');
    }
  };
  
  const toggleReminder = (id) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const closeModal = () => {
    setIsOpen(false);
    onClose?.(); // optional: only if parent needs to know
  };
  const handleSave = () => {
    onStatusChange(scholarship.id, {
      status: scholarship.userStatus || 'saved',
      // userStatus: status,
      notes,
      applicationId,
      dateApplied,
      reminderDate
    });
    setIsOpen(false);
  };

  return (
    <>
      <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();     
            setIsOpen(true);
          }}
        className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#0A2463]"
      >
        <Clock className="w-3 h-3" />
        Track Status
      </button>

      {/* <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => 
              
              
              (false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-poppins font-semibold text-lg text-gray-900">
                    Track Your Application
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <p className="font-inter text-sm text-gray-600 mt-1 line-clamp-2">
                  {scholarship.title}
                </p>
              </div>

              <div className="p-6 space-y-4">
                {/* Status Selection */}
                {/* <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-2">
                    Where are you?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {statuses.map((status) => (
                      <button
                        key={status.id}
                        onClick={() => onStatusChange(scholarship.id, { ...scholarship, userStatus: status.id })}
                        className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                          scholarship.userStatus === status.id
                            ? `bg-${status.color}-100 border-${status.color}-300`
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <span className={`text-${status.color}-600`}>{status.icon}</span>
                        <span className="text-sm font-medium">{status.label}</span>
                      </button>
                    ))}
                  </div>
                </div> */}

                {/* Application Details */}
                {/* <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-2">
                    Application ID (if you have it)
                  </label>
                  <input
                    type="text"
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                    placeholder="e.g., APP123456"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2463] focus:border-transparent"
                  />
                </div> */}

                {/* <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-2">
                    Date Applied
                  </label>
                  <input
                    type="date"
                    value={dateApplied}
                    onChange={(e) => setDateApplied(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2463] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-2">
                    Set Reminder
                  </label>
                  <input
                    type="date"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2463] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Add any notes about this scholarship..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2463] focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleSave}
                  className="w-full px-4 py-2 bg-[#0A2463] text-white text-sm font-medium rounded-lg hover:bg-[#1E3A8A]"
                >
                  Save Progress
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */} 
    <AnimatePresence>
      {isOpen && 
      (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            // onClick={() => setIsOpen(false)}
          >
            {/* Header with Scholarship Info */}
            <div className="bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-poppins font-semibold text-xl">Track Your Scholarship</h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <h3 className="font-poppins font-semibold text-lg mb-1">{scholarship.title}</h3>
                <p className="text-white/80 text-sm mb-3">{scholarship.provider}</p>
                <div className="flex gap-4 text-sm">
                  <span>💰 ₹{scholarship.amount?.toLocaleString()}</span>
                  <span>📅 Due: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Content Area - Scrollable */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Status Selection */}
              <div className="mb-6">
                <label className="block font-inter text-sm font-medium text-gray-700 mb-3">
                  Where are you with this scholarship?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {statusOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setStatus(option.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        status === option.id
                          ? `border-${option.color}-500 bg-${option.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-${option.color}-100 text-${option.color}-600`}>
                          {option.icon}
                        </div>
                        <div>
                          <p className="font-inter font-medium text-gray-900">{option.label}</p>
                          <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Application Details */}
              <div className="space-y-4 mb-6">
                <h3 className="font-poppins font-semibold text-lg text-gray-900">Application Details</h3>
                
                {/* Application ID with Copy */}
                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-2">
                    Application ID / Reference Number
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={applicationId}
                      onChange={(e) => setApplicationId(e.target.value)}
                      placeholder="e.g., APP2024XXXX"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0A2463] focus:border-transparent"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors relative"
                    >
                      {showCopied ? <CheckCheck className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Date Applied */}
                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-2">
                    Date Applied
                  </label>
                  <input
                    type="date"
                    value={dateApplied}
                    onChange={(e) => setDateApplied(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0A2463] focus:border-transparent"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-2">
                    Notes / Important Info
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Add any notes about this application..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0A2463] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Reminders Section */}
              <div className="space-y-4">
                <h3 className="font-poppins font-semibold text-lg text-gray-900">Set Reminders</h3>
                
                {/* Add Reminder */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newReminder}
                    onChange={(e) => setNewReminder(e.target.value)}
                    placeholder="e.g., Follow up on application"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0A2463] focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && addReminder()}
                  />
                  <button
                    onClick={addReminder}
                    className="px-4 py-3 bg-[#0A2463] text-white rounded-xl hover:bg-[#1E3A8A]"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Reminders List */}
                <div className="space-y-2">
                  {reminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <input
                        type="checkbox"
                        checked={reminder.completed}
                        onChange={() => toggleReminder(reminder.id)}
                        className="w-5 h-5 rounded border-gray-300 text-[#0A2463] focus:ring-[#0A2463]"
                      />
                      <span className={`flex-1 ${reminder.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {reminder.text}
                      </span>
                      <button 
                        onClick={() => deleteReminder(reminder.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Suggested Reminders */}
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Quick add:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Check status', 'Submit documents', 'Follow up', 'Check email'].map((text) => (
                      <button
                        key={text}
                        onClick={() => {
                          setNewReminder(text);
                          setTimeout(() => addReminder(), 100);
                        }}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
                      >
                        + {text}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-gray-200 p-6 bg-gray-50 shrink-0">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-[#0A2463] text-white rounded-xl text-sm font-medium hover:bg-[#1E3A8A]"
                    >
                      Save Progress
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

// Main Scholarship Card with Per-Scholarship Tracking
function TrackableScholarshipCard({ scholarship, onSave, onStatusChange }) {
  const daysLeft = getDaysUntilDeadline(scholarship.deadline);
  const urgencyColor = getUrgencyColor(daysLeft);
  const statusColor = getScholarshipStatusStyles(scholarship.userStatus);

  const handleApply = (link) => {
  window.open(link, "_blank"); // opens in new tab
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
    >
      <div className="p-5">
        {/* Header with Status */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${urgencyColor}`}>
            {getUrgencyLabel(daysLeft)}
          </span>
          {scholarship.userStatus && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
              {scholarship.userStatus === 'saved' && 'Saved'}
              {scholarship.userStatus === 'applied' && 'Applied'}
              {scholarship.userStatus === 'tracking' && 'Tracking'}
              {scholarship.userStatus === 'completed' && 'Completed'}
            </span>
          )}
        </div>

        {/* Title & Amount */}
        <h3 className="font-poppins font-semibold text-base text-gray-900 mb-2 line-clamp-2">
          {scholarship.title}
        </h3>
        
        <div className="flex items-baseline gap-1 mb-3">
          <span className="font-poppins font-bold text-xl text-[#0A2463]">
            ₹{scholarship.amount.toLocaleString()}
          </span>
          <span className="text-xs text-gray-500">total</span>
        </div>

        {/* Provider & Deadline */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building className="w-4 h-4" />
            {scholarship.provider}
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Eligibility Tags (Simplified for 10th pass) */}
        <div className="flex flex-wrap gap-2 mb-4">
          {scholarship.eligibilityTags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <button
            onClick={() => handleApply(scholarship.applicationLink)}
            className="flex-1 px-3 py-2 bg-[#0A2463] text-white text-sm font-medium rounded-lg hover:bg-[#1E3A8A] flex items-center justify-center gap-1"
          >
            Apply
            <ExternalLink className="w-3 h-3" />
          </button>
          
          <button
            onClick={() => onSave(scholarship.id)}
            className={`p-2 rounded-lg border ${
              scholarship.isSaved 
                ? 'bg-purple-100 border-purple-300 text-purple-700' 
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Bookmark className="w-4 h-4" fill={scholarship.isSaved ? 'currentColor' : 'none'} />
          </button>

          <ScholarshipStatusTracker 
            scholarship={scholarship}
            onClose = {null} 
            onStatusChange={onStatusChange}
          />
        </div>

        {/* Quick Status Display */}
        {scholarship.applicationId && (
          <div className="mt-3 p-2 bg-green-50 rounded-lg text-xs text-green-700 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            App ID: {scholarship.applicationId}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Simple 3-Step Roadmap for 10th Pass Students
function SimpleRoadmap({ onStepClick }) {
  const [selectedStep, setSelectedStep] = useState(null);

  const steps = [
    {
      id: 1,
      title: "Find Your Scholarships",
      description: "Browse and save scholarships you like",
      icon: <Search className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600",
      action: "Browse Now",
      link: "/scholarships"
    },
    {
      id: 2,
      title: "Get Your Documents Ready",
      description: "Keep your marksheets, ID card, and income certificate handy",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600",
      action: "See What's Needed",
      link: "/documents"
    },
    {
      id: 3,
      title: "Apply & Track",
      description: "Apply on the website, then come back to track your progress",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-green-100 text-green-600",
      action: "Learn How",
      link: "#"
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-4">
        Your Scholarship Journey in 3 Simple Steps
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Connector Line (except last) */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -z-10 transform -translate-x-8" />
            )}

            <div className="text-center">
              <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-3`}>
                {step.icon}
              </div>
              <h4 className="font-poppins font-semibold text-gray-900 mb-1">
                {step.title}
              </h4>
              <p className="font-inter text-sm text-gray-500 mb-3">
                {step.description}
              </p>
              <button
                onClick={() => {
                  if (step.link === '#') {
                    setSelectedStep(step);
                  } else {
                    window.location.href = step.link;
                  }
                }}
                className="text-[#0A2463] text-sm font-medium hover:underline"
              >
                {step.action} →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Simple Info Modal for Step 3 */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setSelectedStep(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2">
                How Tracking Works
              </h3>
              <p className="font-inter text-sm text-gray-600 mb-4">
                When you click "Apply" on any scholarship, you'll go to their website. 
                After applying, come back here and click "Track Status" on that scholarship 
                to save your application ID and set reminders. This helps you remember 
                where you applied and what's next!
              </p>
              <button
                onClick={() => setSelectedStep(null)}
                className="w-full px-4 py-2 bg-[#0A2463] text-white rounded-lg"
              >
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Quick Stats Bar (Simple numbers for students)
function QuickStatsBar({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <Target className="w-4 h-4 text-green-600" />
          </div>
          <span className="font-inter text-sm text-gray-600">Eligible</span>
        </div>
        <p className="font-poppins font-bold text-2xl text-gray-900">{stats.eligible}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <Bookmark className="w-4 h-4 text-purple-600" />
          </div>
          <span className="font-inter text-sm text-gray-600">Saved</span>
        </div>
        <p className="font-poppins font-bold text-2xl text-gray-900">{stats.saved}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <ExternalLink className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-inter text-sm text-gray-600">Applied</span>
        </div>
        <p className="font-poppins font-bold text-2xl text-gray-900">{stats.applied}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
            <Bell className="w-4 h-4 text-amber-600" />
          </div>
          <span className="font-inter text-sm text-gray-600">Tracking</span>
        </div>
        <p className="font-poppins font-bold text-2xl text-gray-900">{stats.tracking}</p>
      </div>
    </div>
  );
}

// Simple Help Section for 10th Students
function HelpfulTips() {
  const tips = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Documents you'll need",
      items: ["10th Marksheet", "Aadhaar Card", "Income Certificate (if needed)"]
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Don't miss deadlines",
      items: ["Apply at least 1 week before deadline", "Set reminders for each scholarship"]
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: "Need help?",
      items: ["Ask your school counselor", "Call the scholarship helpdesk", "Read the instructions carefully"]
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
      <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-4">
        Helpful Tips for You
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="bg-white rounded-lg p-4">
            <div className="w-10 h-10 rounded-full bg-[#0A2463]/10 flex items-center justify-center mb-3">
              {tip.icon}
            </div>
            <h4 className="font-inter font-semibold text-gray-900 mb-2">{tip.title}</h4>
            <ul className="space-y-1">
              {tip.items.map((item, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-[#0A2463]">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Scholarships View with Per-Scholarship Tracking
function ScholarshipsView({ scholarships, onSaveScholarship, onStatusChange }) {

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, saved, applied, tracking
  
  const handleSave = (scholarshipId, updatedData) => {
    onSaveScholarship(scholarshipId, updatedData);
  }

  const filteredScholarships = scholarships.filter(s => {
    // Search filter
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.provider.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    if (filter === 'all') return matchesSearch;
    if (filter === 'saved') return matchesSearch && s.isSaved;
    if (filter === 'applied') return matchesSearch && s.userStatus === 'applied';
    if (filter === 'tracking') return matchesSearch && s.userStatus === 'tracking';
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search scholarships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2463] focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-[#0A2463] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('saved')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'saved' 
                  ? 'bg-[#0A2463] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Saved
            </button>
            <button
              onClick={() => setFilter('applied')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'applied' 
                  ? 'bg-[#0A2463] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Applied
            </button>
          </div>
        </div>
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScholarships.length > 0 ? (
          filteredScholarships.map((scholarship) => (
            <TrackableScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              onSave={handleSave}
              onStatusChange={onStatusChange}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <Info className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No scholarships match your current profile filters.</p>
          </div>
        )}
      </div>

      {/* {filteredScholarships.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2">
            No scholarships found
          </h3>
          <p className="font-inter text-sm text-gray-600">
            Try searching with different words
          </p>
        </div> */}
      {/* )} */}
    </div>
  );
}

// Documents View (Simplified for 10th)
function DocumentsView() {
  const documents = [
    { name: "10th Marksheet", status: "required", icon: <GraduationCap className="w-5 h-5" /> },
    { name: "12th Marksheet", status: "optional", icon: <GraduationCap className="w-5 h-5" /> },
    { name: "Aadhaar Card", status: "required", icon: <CreditCard className="w-5 h-5" /> },
    { name: "Income Certificate", status: "required", icon: <DollarSign className="w-5 h-5" /> },
    { name: "Birth Certificate", status: "required", icon: <File className="w-5 h-5" /> },
    { name: "Caste Certificate (if applicable)", status: "optional", icon: <Shield className="w-5 h-5" /> }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-poppins font-semibold text-xl text-gray-900 mb-2">
          Documents You'll Need
        </h2>
        <p className="font-inter text-sm text-gray-600 mb-6">
          Keep these documents ready before you start applying
        </p>

        <div className="space-y-3">
          {documents.map((doc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0A2463]/10 flex items-center justify-center">
                  {doc.icon}
                </div>
                <div>
                  <p className="font-inter font-medium text-gray-900">{doc.name}</p>
                  <p className="text-xs text-gray-500">
                    {doc.status === 'required' && '✓ Ready to upload'}
                    {doc.status === 'need' && 'Need to arrange'}
                    {doc.status === 'optional' && 'Only if applicable'}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                doc.status === 'required' ? 'bg-green-100 text-green-700' :
                doc.status === 'need' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {doc.status === 'required' ? 'Required' :
                 doc.status === 'need' ? 'Get this' :
                 'Optional'}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-medium">💡 Tip:</span> Keep scanned copies or clear photos of these documents on your phone. You'll need to upload them when applying.
          </p>
        </div>
      </div>
    </div>
  );
}

// Overview View (Dashboard Home)
function OverviewView({ 
  stats, 
  scholarships, 
  onSaveScholarship, 
  onStatusChange,
  eligibilityData,
  expandedEligibility,
  setExpandedEligibility 
}) {
  // Get 3 priority scholarships to show
  const priorityScholarships = scholarships.slice(0, 3);

  return (
    <>
      <EligibilityCounter 
        data={eligibilityData}
        expanded={expandedEligibility}
        onToggle={() => setExpandedEligibility(!expandedEligibility)}
      />

      <QuickStatsBar stats={stats} />

      {/* Simple Roadmap */}
      <SimpleRoadmap />

      {/* Top Matches */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-poppins font-semibold text-xl text-gray-900">
            Top Scholarships for You
          </h2>
          <Link
            to="/scholarships"
            className="text-[#0A2463] text-sm font-medium hover:underline flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {priorityScholarships.map((scholarship) => (
            <TrackableScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              onSave={onSaveScholarship}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      </section>

      {/* Helpful Tips Section */}
      <section className="mt-8">
        <HelpfulTips />
      </section>
    </>
  );
}

export default function UnlockedDashboard() {
  const [activeView, setActiveView] = useState('overview');
  const [expandedEligibility, setExpandedEligibility] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();
  const token = getToken();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true); 
  const {user, setUser} = useAuth();   
  // Inside your main component:

const filteredScholarships = scholarships_data.filter(scholarship => {
  // 1. Category Filter (e.g., Government, Private)
  // const categoryMatch = scholarship.category === 'any' || 
  //                       profile?.category === 'any' || 
  //                       scholarship.category === profile?.category;
    const categoryMatch = 'obc'
  // 2. Caste Filter (e.g., SC, ST, OBC, General)
  // Logic: Matches if scholarship is for 'All' or matches profile's specific caste
  const casteMatch = scholarship.caste === 'All' || 
                     profile?.caste === 'any' || 
                     scholarship.caste.includes(profile?.caste);
  console.log(casteMatch)
  // 3. Gender Filter
  const genderMatch = scholarship.gender === 'All' || 
                      profile?.gender === 'any' || 
                      scholarship.gender === profile?.gender;

  // 4. Income Filter
  // Logic: profile income must be less than or equal to scholarship limit
  const incomeMatch = !scholarship.incomeLimit || 
                      profile?.income === 'any' || 
                      Number(profile?.income) <= scholarship.incomeLimit;

  // 5. Academic Percentage Filter (10th & 12th)
  // Logic: profile percentage must be >= scholarship requirement
  const marks10Match = !scholarship.min10thPercent || 
                       profile?.percent10th === 'any' || 
                       Number(profile?.percent10th) >= scholarship.min10thPercent;

  const marks12Match = !scholarship.min12thPercent || 
                       profile?.percent12th === 'any' || 
                       Number(profile?.percent12th) >= scholarship.min12thPercent;

  return categoryMatch && casteMatch && genderMatch && incomeMatch && marks10Match && marks12Match;
});

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  fetch("http://localhost:8000/profile/me", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch profile");
      return res.json();
    })
    .then(profile => setProfile(profile))
    .catch(err => console.error(err));
}, []);

  console.log(profile)

  // Scholarship data with per-scholarship tracking
  const [scholarships, setScholarships] = useState(scholarships_data);

  // Eligibility data
  const eligibilityData = {
    total: filteredScholarships.length,
    categories: [
      { name: "Government", count: 0, match: 0 },
      { name: "Private", count: 0, match: 0},
      { name: "NGO", count: 0, match: 0 },
      { name: "Others", count: 0, match: 0 }
    ]
  };

  // Calculate stats
  const stats = {
    eligible: filteredScholarships.length,
    saved: scholarships.filter(s => s.isSaved).length,
    applied: scholarships.filter(s => s.userStatus === 'applied').length,
    tracking: scholarships.filter(s => s.userStatus === 'tracking').length
  };
    //  console.log(eligible)

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    
    async function fetchUser() {
      try {
        const token = getToken();
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

      } catch (err) {
        console.error(err);
        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [token, navigate]);

  const handleSaveScholarship = (id) => {
    setScholarships(prev => prev.map(s => 
      s.id === id ? { ...s, isSaved: !s.isSaved } : s
    ));
  };

  const handleStatusChange = (id, updates) => {
    setScholarships(prev => prev.map(s => 
      s.id === id ? { ...s, ...updates } : s
    ));
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'scholarships':
        return <ScholarshipsView 
          scholarships={scholarships}
          onSaveScholarship={handleSaveScholarship}
          onStatusChange={handleStatusChange}
        />;
      case 'eligible-scholarships':
      return <ScholarshipsView 
        scholarships={filteredScholarships} // Use filtered scholarships
        onSaveScholarship={handleSaveScholarship}
        onStatusChange={handleStatusChange}
      />;
      case 'documents':
        return <DocumentsView />;
      default:
        return <OverviewView 
          stats={stats}
          scholarships={scholarships}
          onSaveScholarship={handleSaveScholarship}
          onStatusChange={handleStatusChange}
          eligibilityData={eligibilityData}
          expandedEligibility={expandedEligibility}
          setExpandedEligibility={setExpandedEligibility}
        />;
    }
  };

  if(loading){
    return <Loading />
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <HeaderDashboard />
      <main className="pt-7 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 pt-10">
          {/* Welcome Section */}
          <div className="mb-8 pt-6">
            <h1 className="font-poppins font-semibold text-2xl text-gray-900 mb-2">
              Hey {user?.full_name?.trim()?.split(" ")[0] || 'Student'}! 
            </h1>
            <p className="font-inter text-gray-600">
              Find scholarships that match you!
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveView('overview')}
              className={`px-4 py-2 font-inter text-sm font-medium transition-colors relative ${
                activeView === 'overview' 
                  ? 'text-[#0A2463]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Home
              {activeView === 'overview' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A2463]"
                />
              )}
            </button>
            <button
              onClick={() => setActiveView('eligible-scholarships')}
              className={`px-4 py-2 font-inter text-sm font-medium transition-colors relative ${
                activeView === 'eligible-scholarships' // Fixed to match the view
                  ? 'text-[#0A2463]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Eligible Scholarships
              {activeView === 'eligible-scholarships' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A2463]"
                />
              )}
            </button>
            <button
              onClick={() => setActiveView('scholarships')}
              className={`px-4 py-2 font-inter text-sm font-medium transition-colors relative ${
                activeView === 'scholarships' 
                  ? 'text-[#0A2463]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All Scholarships
              {activeView === 'scholarships' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A2463]"
                />
              )}
            </button>
            <button
              onClick={() => setActiveView('documents')}
              className={`px-4 py-2 font-inter text-sm font-medium transition-colors relative ${
                activeView === 'documents' 
                  ? 'text-[#0A2463]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Documents
              {activeView === 'documents' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A2463]"
                />
              )}
            </button>
          </div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}