import React, { useState } from 'react';
import { Link } from "react-router-dom";
import DashboardHeader from '../../components/DashboardHeader';
import Footer from '../../components/Footer';
import { Search, Filter, Calendar, TrendingUp, Award, ChevronRight, ChevronLeft, Sparkles, Target, Users, FileText, Building, Percent, Shield, Zap, Clock, CheckCircle, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { filterScholarships, sortScholarships } from "../../utils/scholarshipFilterUtils";
import ScholarshipCard from '../../components/ScholarshipCard';
import { scholarships_data } from '../dashboard/scholarships.jsx';

const AllScholarships = () => {

const [allScholarships, setAllScholarships] = useState(scholarships_data);
// React.useEffect(() => {
//   const token = localStorage.getItem("token");

//   fetch("http://localhost:8000/scholarships", {
//     headers: token
//       ? {
//           Authorization: `Bearer ${token}`,
//         }
//       : {},
//   })
//     .then(res => res.json())
//     .then(data => {
//       setAllScholarships(data);
//     })
//     .catch(err => console.error(err));
// }, []);

// ================= FILTER STATE =================

// Remove this entire useEffect block:


// Replace it with this:
React.useEffect(() => {
  setAllScholarships(scholarships_data);
}, []);

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

const sortedScholarships = sortScholarships(
  filteredScholarships,
  filters.sortBy
);


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

const handleSaveScholarship = (scholarship_id, newState) => {
  setAllScholarships(prev =>
    prev.map(s =>
      s.scholarship_id === scholarship_id
        ? { ...s, is_saved: newState }
        : s
    )
  );
};

// ================= RESET PAGE WHEN FILTER CHANGES =================

React.useEffect(() => {
  setCurrentPage(1);
}, [filters]);


// ================= COUNTER ANIMATION =================

const [counters, setCounters] = useState({
  scholarships: 0,
  students: 0,
  success: 0
});

React.useEffect(() => {
  const interval = setInterval(() => {
    setCounters(prev => ({
      scholarships: Math.min(prev.scholarships + 5, sortedScholarships.length),
      students: Math.min(prev.students + 150, 12500),
      success: Math.min(prev.success + 1, 95)
    }));
  }, 40);

  return () => clearInterval(interval);
}, [sortedScholarships.length]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => ({
        scholarships: Math.min(prev.scholarships + 174, sortedScholarships.length),
        students: Math.min(prev.students + 250, 12500),
        success: Math.min(prev.success + 2.4, 95)
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [sortedScholarships.length]);


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30">

      <DashboardHeader />

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
                <span className="text-black block">
                  That Fit You
                </span>
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
            </motion.div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="-translate-y-[2cm]  py-6 lg:py-8 px-4 lg:px-8 bg-white/50 backdrop-blur-sm">
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
        <section className="-translate-y-[2cm] py-8 lg:py-12 px-4 lg:px-8 bg-gradient-to-b from-white to-blue-50/20">
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

                {/* Eligibility */}
                <div>
                  <label className="block font-inika font-normal text-sm leading-[140%] tracking-[-0.07px] text-[#475569] mb-2">
                    Eligibility
                  </label>
                  <select 
                    className="w-full px-4 py-2.5 border border-[#64748B] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A2463] focus:border-[#0A2463] text-slate-700 bg-white font-inika text-sm"
                    value={filters.eligibility}
                    onChange={(e) => setFilters({...filters, eligibility: e.target.value})}
                  >
                    <option value="">Select Eligibility</option>
                    <option value="first_gen">First Generation</option>
                    <option value="rural">Rural Students</option>
                    <option value="women">Women Only</option>
                    <option value="minority">Minority Category</option>
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
                  {/* Showing <span className="font-semibold text-[#0A2463]">{currentScholarships.length}</span> of{' '}
                  <span className="font-semibold">{sortedScholarships.length}</span> scholarships
                    */}
                  <button 
                  onClick={() => setFilters({
                      search: "",
                      state: "",
                      category: "",
                      gender: "",
                      incomeLimit: "",
                      branch: "",
                      providerType: "",
                      sortBy: ""
                  })}
                  className="inline-flex items-center bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] text-white font-poppins font-semibold text-sm leading-[140%] px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Reset Filters
                </button>
                </div>
                
              </div>
            </motion.div>
          </div>
        </section>

        {/* Scholarships Grid - 3x3 Matrix */}
        <section className="-translate-y-[4cm] py-8 lg:py-12 px-4 lg:px-8 bg-white">
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
                    providerType: '',
                    eligibility: '',
                    incomeLimit: '',
                    category: ''
                  })}
                  className="inline-flex items-center bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] text-white font-poppins font-semibold text-sm leading-[140%] px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Reset Filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {currentScholarships.map((scholarship, index) => (
                  <motion.div
                    key={scholarship.scholarship_id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ScholarshipCard 
                    scholarship={scholarship}
                    onSave={handleSaveScholarship} />
                  </motion.div>
                ))}
              </div>
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
      </main>

      <Footer />
    </div>
  );
};

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

export default AllScholarships;