import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { 
  Search, Filter, Calendar, ExternalLink, Bookmark, Info, 
  TrendingUp, Award, ChevronRight, ChevronLeft, Sparkles, 
  Target, Users, FileText, Building, Percent, Shield, Zap, 
  Clock, CheckCircle, Upload, X, Bell, Copy, CheckCheck, 
  Plus, Trash2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { scholarships_data } from '../dashboard/scholarships.jsx';

// ================= HELPER FUNCTIONS =================

const getDaysUntilDeadline = (deadlineDate) => {
  const today = new Date();
  const deadline = new Date(deadlineDate);
  const diffTime = deadline - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const getUrgencyLabel = (daysLeft) => {
  if (daysLeft <= 7) return 'Urgent';
  if (daysLeft <= 15) return 'Soon';
  if (daysLeft <= 30) return 'Upcoming';
  return 'Available';
};

const getUrgencyColor = (daysLeft) => {
  if (daysLeft <= 7) return 'bg-red-100 text-red-800 border-red-200';
  if (daysLeft <= 15) return 'bg-orange-100 text-orange-800 border-orange-200';
  if (daysLeft <= 30) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  return 'bg-green-100 text-green-800 border-green-200';
};

const getScholarshipStatusStyles = (status) => {
  const styles = {
    saved: 'bg-purple-100 text-purple-700',
    applied: 'bg-blue-100 text-blue-700',
    tracking: 'bg-orange-100 text-orange-700',
    completed: 'bg-green-100 text-green-700'
  };
  return styles[status] || 'bg-gray-100 text-gray-700';
};

// ================= FILTER FUNCTION =================

const filterScholarships = (scholarships, filters) => {
  return scholarships.filter(scholarship => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const nameMatch = scholarship.scholarship_name?.toLowerCase().includes(searchLower) || false;
      const providerMatch = scholarship.provider_name?.toLowerCase().includes(searchLower) || false;
      if (!nameMatch && !providerMatch) return false;
    }

    // State filter
    if (filters.state && scholarship.state !== filters.state) return false;

    // Category filter
    if (filters.category) {
      const eligibility = scholarship.eligibility || [];
      const hasCategory = eligibility.some(e => e.category === filters.category);
      if (!hasCategory) return false;
    }

    // Gender filter
    if (filters.gender) {
      const eligibility = scholarship.eligibility || [];
      const hasGender = eligibility.some(e => e.gender === filters.gender || e.gender === 'any');
      if (!hasGender) return false;
    }

    // Income filter
    if (filters.incomeLimit) {
      const incomeLimitNum = parseInt(filters.incomeLimit);
      const eligibility = scholarship.eligibility || [];
      const meetsIncome = eligibility.some(e => {
        const maxIncome = e.income_limit ? parseInt(e.income_limit.replace(/,/g, '')) : Infinity;
        return maxIncome >= incomeLimitNum;
      });
      if (!meetsIncome) return false;
    }

    // Branch filter
    if (filters.branch) {
      const eligibility = scholarship.eligibility || [];
      const hasBranch = eligibility.some(e => 
        e.course_stream === filters.branch || 
        (Array.isArray(e.course_stream) && e.course_stream.includes(filters.branch))
      );
      if (!hasBranch) return false;
    }

    // Provider type filter
    if (filters.providerType) {
      const providerTypeLower = filters.providerType.toLowerCase();
      const scholarshipProviderType = scholarship.provider_type?.toLowerCase() || '';
      if (scholarshipProviderType !== providerTypeLower) return false;
    }

    return true;
  });
};

const sortScholarships = (scholarships, sortBy) => {
  const sorted = [...scholarships];
  
  switch(sortBy) {
    case 'deadline':
      return sorted.sort((a, b) => 
        new Date(a.application_end_date) - new Date(b.application_end_date)
      );
    case 'amount':
      return sorted.sort((a, b) => 
        (b.benefit_amount || 0) - (a.benefit_amount || 0)
      );
    case 'relevance':
    default:
      return sorted;
  }
};

// ================= SCHOLARSHIP STATUS TRACKER =================

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
    { id: 'saved', label: 'Saved', icon: <Bookmark className="w-4 h-4" />, color: 'purple', description: 'Scholarship saved for later' },
    { id: 'applied', label: 'Applied', icon: <ExternalLink className="w-4 h-4" />, color: 'blue', description: 'Application submitted' },
    { id: 'tracking', label: 'Tracking', icon: <Bell className="w-4 h-4" />, color: 'green', description: 'Monitoring progress' },
    { id: 'completed', label: 'Done', icon: <CheckCircle className="w-4 h-4" />, color: 'gray', description: 'Process completed' }
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
    if (onClose) onClose();
  };
  
  const handleSave = () => {
    if (onStatusChange) {
      onStatusChange(scholarship.id, {
        status: status,
        notes,
        applicationId,
        dateApplied,
        reminderDate
      });
    }
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

      <AnimatePresence>
        {isOpen && (
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
                  <h3 className="font-poppins font-semibold text-lg mb-1">{scholarship.scholarship_name}</h3>
                  <p className="text-white/80 text-sm mb-3">{scholarship.provider_name}</p>
                  <div className="flex gap-4 text-sm">
                    <span>💰 ₹{scholarship.benefit_amount?.toLocaleString()}</span>
                    <span>📅 Due: {new Date(scholarship.application_end_date).toLocaleDateString()}</span>
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
                </div>
              </div>

              {/* Footer Actions */}
              <div className="border-t border-gray-200 p-6 bg-gray-50">
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ================= TRACKABLE SCHOLARSHIP CARD =================

function TrackableScholarshipCard({ scholarship, onSave, onStatusChange }) {
  const daysLeft = getDaysUntilDeadline(scholarship.application_end_date);
  const urgencyColor = getUrgencyColor(daysLeft);
  const statusColor = getScholarshipStatusStyles(scholarship.user_status);

  const handleApply = (link) => {
    window.open(link, "_blank");
  };

  const handleSave = () => {
    if (onSave) {
      onSave(scholarship.id);
    }
  };

  // Extract eligibility tags from the eligibility array
  const getEligibilityTags = () => {
    if (!scholarship.eligibility || !Array.isArray(scholarship.eligibility)) return [];
    
    const tags = [];
    scholarship.eligibility.forEach(elig => {
      if (elig.category && elig.category !== 'any') tags.push(elig.category.toUpperCase());
      if (elig.gender && elig.gender !== 'any') tags.push(elig.gender);
      if (elig.course_stream && elig.course_stream !== 'any') {
        if (Array.isArray(elig.course_stream)) {
          tags.push(...elig.course_stream.slice(0, 1));
        } else {
          tags.push(elig.course_stream);
        }
      }
    });
    return tags.slice(0, 3);
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
          {scholarship.user_status && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
              {scholarship.user_status === 'saved' && 'Saved'}
              {scholarship.user_status === 'applied' && 'Applied'}
              {scholarship.user_status === 'tracking' && 'Tracking'}
              {scholarship.user_status === 'completed' && 'Completed'}
            </span>
          )}
        </div>

        {/* Title & Amount */}
        <h3 className="font-poppins font-semibold text-base text-gray-900 mb-2 line-clamp-2">
          {scholarship.scholarship_name}
        </h3>
        
        <div className="flex items-baseline gap-1 mb-3">
          <span className="font-poppins font-bold text-xl text-[#0A2463]">
            ₹{scholarship.benefit_amount?.toLocaleString() || 'N/A'}
          </span>
          <span className="text-xs text-gray-500">total</span>
        </div>

        {/* Provider & Deadline */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building className="w-4 h-4" />
            {scholarship.provider_name}
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">
              Deadline: {new Date(scholarship.application_end_date).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Eligibility Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {getEligibilityTags().map((tag, idx) => (
            <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <button
            onClick={() => handleApply(scholarship.application_link)}
            className="flex-1 px-3 py-2 bg-[#0A2463] text-white text-sm font-medium rounded-lg hover:bg-[#1E3A8A] flex items-center justify-center gap-1"
          >
            Apply
            <ExternalLink className="w-3 h-3" />
          </button>
          
          <button
            onClick={handleSave}
            className={`p-2 rounded-lg border ${
              scholarship.is_saved 
                ? 'bg-purple-100 border-purple-300 text-purple-700' 
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Bookmark className="w-4 h-4" fill={scholarship.is_saved ? 'currentColor' : 'none'} />
          </button>

          <ScholarshipStatusTracker 
            scholarship={scholarship}
            onStatusChange={onStatusChange}
          />
        </div>

        {/* Quick Status Display */}
        {scholarship.application_id && (
          <div className="mt-3 p-2 bg-green-50 rounded-lg text-xs text-green-700 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            App ID: {scholarship.application_id}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ================= SCHOLARSHIPS VIEW =================

function ScholarshipsView({ scholarships, onSaveScholarship, onStatusChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Debug log to see what's being received
  console.log('ScholarshipsView received:', scholarships);
  console.log('Number of scholarships received:', scholarships?.length);
  
  const handleSave = (scholarshipId) => {
    if (onSaveScholarship) {
      onSaveScholarship(scholarshipId);
    }
  };

  // Only apply search and status filters, don't re-filter by eligibility
  const filteredScholarships = scholarships.filter(s => {
    // Skip if scholarship is undefined
    if (!s) return false;
    
    // Search filter - check if search term exists and matches
    const matchesSearch = !searchTerm || searchTerm.trim() === '' ? true :
      (s.scholarship_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (s.provider_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    if (!matchesSearch) return false;
    
    // Status filter
    if (filter === 'all') return true;
    if (filter === 'saved') return s.is_saved === true;
    if (filter === 'applied') return s.user_status === 'applied';
    if (filter === 'tracking') return s.user_status === 'tracking';
    
    return true;
  });

  console.log('Filtered scholarships in view:', filteredScholarships);

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
        {filteredScholarships && filteredScholarships.length > 0 ? (
          filteredScholarships.map((scholarship) => {
            console.log('Rendering scholarship:', scholarship?.id);
            return (
              <TrackableScholarshipCard
                key={scholarship?.id || Math.random()}
                scholarship={scholarship}
                onSave={handleSave}
                onStatusChange={onStatusChange}
              />
            );
          })
        ) : (
          <div className="col-span-full text-center py-10">
            <Info className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No scholarships match your current filters.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilter('all');
              }}
              className="mt-4 px-4 py-2 bg-[#0A2463] text-white rounded-lg hover:bg-[#1E3A8A]"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ================= STATS CARD =================

function StatsCard({ number, label, icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl shadow-md p-6 text-center border border-blue-100 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 mb-4">
        {icon}
      </div>
      <div className="font-poppins font-bold text-xl lg:text-2xl leading-[140%] tracking-[-0.12px] text-[#1E3A8A] mb-2">
        {number}
      </div>
      <div className="font-inika font-normal text-sm lg:text-base leading-[140%] tracking-[-0.07px] text-[#475569]">
        {label}
      </div>
    </motion.div>
  );
}

// ================= PROCESS STEP =================

function ProcessStep({ number, title, description, icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center relative"
    >
      <div className="relative mb-6">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] flex items-center justify-center shadow-lg mb-4 relative z-10"
        >
          <span className="font-poppins font-bold text-lg text-white">
            {number}
          </span>
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#0A2463]/20 to-[#1E3A8A]/20 blur-sm" />
        </motion.div>
        <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-[#3B82F6] bg-opacity-50 -z-10" />
        <div className="absolute top-8 left-0 text-blue-600">
          {icon}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6 flex-1 w-full border border-blue-100 hover:shadow-lg transition-all duration-300">
        <h3 className="font-poppins font-semibold text-lg leading-[140%] tracking-[-0.09px] text-[#1E293B] mb-3">
          {title}
        </h3>
        <p className="font-inika font-normal text-sm leading-[140%] tracking-[-0.07px] text-[#475569]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ================= MAIN ALL SCHOLARSHIPS COMPONENT =================

const AllScholarships = () => {
  const [allScholarships, setAllScholarships] = useState(scholarships_data || []);
  
  // ================= FILTER STATE =================
  const [filters, setFilters] = useState({
    search: "",
    state: "",
    category: "",
    gender: "",
    incomeLimit: "",
    branch: "",
    providerType: "",
    sortBy: "relevance"
  });

  // ================= PAGINATION =================
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // ================= APPLY FILTER + SORT =================
  const filteredScholarships = filterScholarships(allScholarships, filters);
  const sortedScholarships = sortScholarships(filteredScholarships, filters.sortBy);

  const handleStatusChange = (id, updates) => {
    setAllScholarships(prev => prev.map(s => 
      s.id === id ? { ...s, ...updates } : s
    ));
  };

  const handleSaveScholarship = (id) => {
    setAllScholarships(prev => prev.map(s => 
      s.id === id ? { ...s, is_saved: !s.is_saved } : s
    ));
  };

  // ================= PAGINATION CALC =================
  const totalPages = Math.ceil(sortedScholarships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentScholarships = sortedScholarships.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ================= HANDLE PAGE CHANGE =================
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ================= RESET PAGE WHEN FILTER CHANGES =================
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // ================= COUNTER ANIMATION =================
  const [counters, setCounters] = useState({
    scholarships: 0,
    students: 0,
    success: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => ({
        scholarships: Math.min(prev.scholarships + 5, sortedScholarships.length),
        students: Math.min(prev.students + 150, 12500),
        success: Math.min(prev.success + 1, 95)
      }));
    }, 40);

    return () => clearInterval(interval);
  }, [sortedScholarships.length]);

  // console.log('Loaded scholarships:', allScholarships);
  // console.log('Number of scholarships:', allScholarships.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30">
      <Header 
        scrollToAbout={null}
        scrollToTopScholarships={null}
        scrollToHowItWorks={null}
      />

      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative py-8 lg:py-12 px-4 lg:px-8 overflow-hidden">
          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/4 left-10 w-8 h-8 rounded-full bg-blue-100/50"
              />
              <motion.div 
                animate={{ y: [20, 0, 20] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-1/3 right-16 w-6 h-6 rounded-full bg-indigo-100/50"
              />
              <motion.div 
                animate={{ x: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute bottom-1/4 left-20 w-10 h-10 rounded-full bg-blue-200/30"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 text-blue-700 text-sm font-semibold shadow-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Discover 100+ Scholarships
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-poppins font-semibold text-3xl lg:text-4xl leading-[140%] tracking-[-0.15px] mb-4"
            >
              <span className="text-black block">Discover Scholarships</span>
              <span className="relative">
                <span className="text-black block">That Fit You</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-inika font-normal text-lg leading-[140%] tracking-[-0.1px] text-[#5E6B7C] max-w-3xl mx-auto mb-6"
            >
              Browse all scholarships or find opportunities matched to your eligibility. 
              Get personalized recommendations based on your profile.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <Link
                to="/Signup"
                className="group inline-flex items-center justify-center bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] text-white font-poppins font-semibold text-base leading-[140%] px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="mr-2">Find Scholarships Based on my Eligibility</span>
                <Target className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="py-6 lg:py-8 px-4 lg:px-8 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
            >
              <StatsCard 
                number={Math.round(counters.scholarships).toLocaleString() + "+"} 
                label="Scholarships Listed" 
                icon={<FileText className="w-6 h-6" />}
                delay={0}
              />
              <StatsCard 
                number={Math.round(counters.students).toLocaleString() + "+"} 
                label="Students Helped" 
                icon={<Users className="w-6 h-6" />}
                delay={0.1}
              />
              <StatsCard 
                number={Math.round(counters.success) + "%"} 
                label="Success Rate" 
                icon={<Percent className="w-6 h-6" />}
                delay={0.2}
              />
            </motion.div>
          </div>
        </section>

        {/* Search and Filters Section */}
        <section className="py-8 lg:py-12 px-4 lg:px-8 bg-gradient-to-b from-white to-blue-50/20">
          <div className="container mx-auto max-w-6xl">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search Scholarships by name..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                  className="w-full px-6 py-3.5 pl-14 bg-white border border-[#64748B] rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#0A2463] focus:border-[#0A2463] text-slate-700 placeholder-slate-400 font-inika text-base"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </motion.div>

            {/* Horizontal Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-[#64748B] p-6 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Filter className="w-5 h-5 text-[#0A2463]" />
                <h3 className="font-poppins font-semibold text-lg leading-[140%] tracking-[-0.09px] text-[#1E293B]">
                  Find Scholarships Based on my Eligibility
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* State */}
                <div>
                  <label className="block font-inika font-normal text-sm leading-[140%] tracking-[-0.07px] text-[#475569] mb-2">
                    State
                  </label>
                  <select 
                    value={filters.state}
                    onChange={(e) =>
                      setFilters({ ...filters, state: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-[#64748B] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A2463] focus:border-[#0A2463] text-slate-700 bg-white font-inika text-sm"
                  >
                    <option value="">Select State</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="delhi">Delhi</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="tamilnadu">Tamil Nadu</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block font-inika font-normal text-sm leading-[140%] tracking-[-0.07px] text-[#475569] mb-2">
                    Category
                  </label>
                  <select 
                    className="w-full px-4 py-2.5 border border-[#64748B] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A2463] focus:border-[#0A2463] text-slate-700 bg-white font-inika text-sm"
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                  >
                    <option value="">Select Category</option>
                    <option value="general">General</option>
                    <option value="OBC">(OBC) Other Backward Classes</option>
                    <option value="SC">(SC) Scheduled Caste</option>
                    <option value="ST">(ST) Scheduled Tribes</option>
                    <option value="NT">(NT) Nomadic Tribes</option>
                    <option value="SBC">(SBC) Special Backward Classes</option>
                    <option value="EBC">(EBC) Economically Backward Classes</option>
                    <option value="EWS">(EWS) Economically Weaker Sections</option>
                    <option value="SEBC">SEBC</option>
                    <option value="orphan">Orphan without Caste Category</option>
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label className="block font-inika font-normal text-sm leading-[140%] tracking-[-0.07px] text-[#475569] mb-2">
                    Gender
                  </label>
                  <select 
                    value={filters.gender}
                    onChange={(e) =>
                      setFilters({ ...filters, gender: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-[#64748B] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A2463] focus:border-[#0A2463] text-slate-700 bg-white font-inika text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Income Range */}
                <div>
                  <label className="block font-inika font-normal text-sm leading-[140%] tracking-[-0.07px] text-[#475569] mb-2">
                    Income Range
                  </label>
                  <select 
                    className="w-full px-4 py-2.5 border border-[#64748B] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A2463] focus:border-[#0A2463] text-slate-700 bg-white font-inika text-sm"
                    value={filters.incomeLimit}
                    onChange={(e) => setFilters({...filters, incomeLimit: e.target.value})}
                  >
                    <option value="">Select Range</option>
                    <option value="100000">Upto 1 lakh</option>
                    <option value="200000">Upto 2 lakhs</option>
                    <option value="300000">Upto 3 lakhs</option>
                    <option value="400000">Upto 4 lakhs</option>
                    <option value="500000">Upto 5 lakhs</option>
                    <option value="600000">Upto 6 lakhs</option>
                    <option value="700000">Upto 7 lakhs</option>
                    <option value="800000">Upto 8 lakhs</option>
                    <option value="900000">Upto 9 lakhs</option>
                    <option value="1000000">Upto 10 lakhs</option>
                  </select>
                </div>

                {/* Branch */}
                <div className="md:col-span-2">
                  <label className="block font-inika font-normal text-sm leading-[140%] tracking-[-0.07px] text-[#475569] mb-2">
                    Branch
                  </label>
                  <select 
                    value={filters.branch}
                    onChange={(e) =>
                      setFilters({ ...filters, branch: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-[#64748B] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A2463] focus:border-[#0A2463] text-slate-700 bg-white font-inika text-sm"
                  >
                    <option value="">Select Branch</option>
                    <option value="engineering">Engineering</option>
                    <option value="computer_science">Computer Science</option>
                    <option value="medical">Medical</option>
                    <option value="arts">Arts</option>
                    <option value="commerce">Commerce</option>
                    <option value="science">Science</option>
                  </select>
                </div>

                {/* Scholarship Type */}
                <div>
                  <label className="block font-inika font-normal text-sm leading-[140%] tracking-[-0.07px] text-[#475569] mb-2">
                    Scholarship Type
                  </label>
                  <select 
                    className="w-full px-4 py-2.5 border border-[#64748B] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A2463] focus:border-[#0A2463] text-slate-700 bg-white font-inika text-sm"
                    value={filters.providerType}
                    onChange={(e) => setFilters({...filters, providerType: e.target.value})}
                  >
                    <option value="">Select Type</option>
                    <option value="Government">Government</option>
                    <option value="Private">Private</option>
                    <option value="NGO">NGO</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Sort Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-poppins font-medium text-slate-700">Sort By</span>
                  <div className="flex gap-2">
                    {['Relevance', 'Deadline', 'Amount'].map((sortOption) => (
                      <button
                        key={sortOption}
                        onClick={() => setFilters({ ...filters, sortBy: sortOption.toLowerCase() })}
                        className={`px-4 py-2.5 font-inika text-sm leading-[140%] tracking-[-0.07px] rounded-lg transition-all duration-300 ${
                          filters.sortBy === sortOption.toLowerCase()
                            ? 'bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] text-white'
                            : 'bg-white text-slate-700 border border-[#64748B] hover:border-[#0A2463]'
                        }`}
                      >
                        {sortOption}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="font-inika text-sm text-[#64748B]">
                  Showing <span className="font-semibold text-[#0A2463]">{currentScholarships.length}</span> of{' '}
                  <span className="font-semibold">{sortedScholarships.length}</span> scholarships
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Scholarships Grid - 3x3 Matrix */}
        <section className="py-8 lg:py-12 px-4 lg:px-8 bg-white">
          <div className="container mx-auto max-w-6xl">
            {currentScholarships.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center py-20 bg-white rounded-2xl border border-[#64748B]"
              >
                <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="font-poppins font-semibold text-xl leading-[140%] tracking-[-0.1px] text-slate-900 mb-2">
                  No scholarships found
                </h3>
                <p className="font-inika text-slate-600 mb-6">Try adjusting your filters</p>
                <button 
                  onClick={() => setFilters({
                    search: "",
                    state: "",
                    category: "",
                    gender: "",
                    incomeLimit: "",
                    branch: "",
                    providerType: "",
                    sortBy: "relevance"
                  })}
                  className="inline-flex items-center bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] text-white font-poppins font-semibold text-sm leading-[140%] px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Reset Filters
                </button>
              </motion.div>
            ) : (
              <ScholarshipsView 
                scholarships={currentScholarships}
                onSaveScholarship={handleSaveScholarship}
                onStatusChange={handleStatusChange}
              />
            )}
          </div>
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <section className="py-8 lg:py-12 px-4 lg:px-8 bg-gradient-to-b from-white to-blue-50/30">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex justify-center items-center gap-4"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-5 py-2.5 rounded-lg font-inika font-medium transition-all duration-300 flex items-center gap-2 ${
                    currentPage === 1
                      ? 'text-slate-400 cursor-not-allowed border border-[#64748B]'
                      : 'text-[#0A2463] border border-[#64748B] hover:border-[#0A2463] hover:bg-gradient-to-r hover:from-[#0A2463] hover:to-[#1E3A8A] hover:text-white'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 rounded-lg font-inika font-medium transition-all duration-300 ${
                          currentPage === pageNum
                            ? 'bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] text-white'
                            : 'text-slate-700 border border-[#64748B] hover:border-[#0A2463]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-5 py-2.5 rounded-lg font-inika font-medium transition-all duration-300 flex items-center gap-2 ${
                    currentPage === totalPages
                      ? 'text-slate-400 cursor-not-allowed border border-[#64748B]'
                      : 'text-[#0A2463] border border-[#64748B] hover:border-[#0A2463] hover:bg-gradient-to-r hover:from-[#0A2463] hover:to-[#1E3A8A] hover:text-white'
                  }`}
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center mt-4 font-inika text-sm text-[#64748B]"
              >
                Page {currentPage} of {totalPages} • {sortedScholarships.length} total scholarships
              </motion.div>
            </div>
          </section>
        )}

        {/* How It Works Section */}
        <section className="py-12 lg:py-16 px-4 lg:px-8 bg-gradient-to-b from-white to-blue-50/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-poppins font-semibold text-2xl lg:text-3xl leading-[140%] tracking-[-0.15px] text-[#1E293B] mb-4">
                How to Apply for Scholarships
              </h2>
              <p className="font-inika font-normal text-base leading-[140%] tracking-[-0.08px] text-[#64748B] max-w-2xl mx-auto">
                Our simple 4-step process makes scholarship discovery and application effortless
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
              <ProcessStep
                number="1"
                title="Browse Scholarships"
                description="Explore our comprehensive database of verified scholarships from government and private organizations."
                icon={<Search className="w-8 h-8" />}
                delay={0}
              />
              <ProcessStep
                number="2"
                title="Check Eligibility"
                description="Use our smart filters to find scholarships that match your profile, academic background, and financial need."
                icon={<CheckCircle className="w-8 h-8" />}
                delay={0.1}
              />
              <ProcessStep
                number="3"
                title="Prepare Documents"
                description="Gather required documents like marksheets, income certificates, and identification proof."
                icon={<Upload className="w-8 h-8" />}
                delay={0.2}
              />
              <ProcessStep
                number="4"
                title="Apply & Track"
                description="Submit applications with guided assistance and track progress through your dashboard."
                icon={<Target className="w-8 h-8" />}
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-12 lg:py-16 px-4 lg:px-8 bg-white">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl border-2 border-blue-100 p-8 lg:p-12 shadow-lg">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="font-poppins font-semibold text-2xl lg:text-3xl leading-[140%] tracking-[-0.15px] text-black mb-6"
                >
                  Ready to Find Your Perfect Scholarship?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="font-inika font-normal text-base lg:text-lg leading-[140%] tracking-[-0.09px] text-[#64748B] max-w-2xl mx-auto mb-8"
                >
                  Join thousands of students who have already found financial support for their education
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Link
                    to="/signup"
                    className="group inline-flex items-center justify-center bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] text-white font-poppins font-semibold text-base leading-[140%] px-10 py-4 rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <span className="mr-2">Create Free Account</span>
                    <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-all duration-300" />
                  </Link>
                  <Link
                    to="/demo"
                    className="group inline-flex items-center justify-center border-2 border-[#0A2463] text-[#0A2463] font-poppins font-semibold text-base leading-[140%] px-10 py-4 rounded-xl hover:bg-[#0A2463] hover:text-white transition-all duration-300"
                  >
                    Watch Demo
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AllScholarships;