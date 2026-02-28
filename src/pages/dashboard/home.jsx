import React, { useState, useEffect } from "react";
import DashboardHeader from '../../components/DashboardHeader';
import { useAuth } from "../../utils/AuthContent.jsx";
import { getToken, logout } from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import Footer from '../../components/Footer'

// ==================== Main Component ====================
const HomePage = () => {

  const [bannerVisible, setBannerVisible] = useState(true);
  const [visibleItems, setVisibleItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = getToken();

  const {user, setUser} = useAuth();   

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
  const firstName = user.full_name.trim().split(" ")[0];
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...prev, entry.target.dataset.id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Statistics cards data
  const stats = [
    { 
      icon: "🎓", 
      label: "Scholarships Available", 
      value: "125",
      trend: "+12 this week",
      bgColor: "from-[#0A2463]/5 to-[#2A3F7A]/5",
      borderColor: "border-[#0A2463]/20",
      iconBg: "bg-[#0A2463]/10"
    },
    { 
      icon: "💰", 
      label: "Total Funding", 
      value: "₹2.5 Cr",
      trend: "From across India",
      bgColor: "from-[#1E3A6F]/5 to-[#3A558A]/5",
      borderColor: "border-[#1E3A6F]/20",
      iconBg: "bg-[#1E3A6F]/10"
    },
    { 
      icon: "🤝", 
      label: "Trusted Providers", 
      value: "40+",
      trend: "Including govt.",
      bgColor: "from-[#2A4A7A]/5 to-[#4A6A9A]/5",
      borderColor: "border-[#2A4A7A]/20",
      iconBg: "bg-[#2A4A7A]/10"
    },
    { 
      icon: "📅", 
      label: "Closing This Month", 
      value: "18",
      trend: "deadline soon",
      bgColor: "from-[#355F8A]/5 to-[#557FAA]/5",
      borderColor: "border-[#355F8A]/20",
      iconBg: "bg-[#355F8A]/10"
    },
  ];

  // Scholarship data with external links
  const scholarships = [
    {
      id: 1,
      name: "Merit cum Means Scholarship",
      provider: "AICTE",
      amount: "₹30,000/year",
      deadline: "15 June 2025",
      desc: "For diploma in engineering & technology. Open to 10th pass with 60%+.",
      color: "#0A2463",
      category: "Merit Based",
      applyLink: "https://www.aicte-india.org/scholarships"
    },
    {
      id: 2,
      name: "Women in STEM Diploma",
      provider: "NavGurukul Foundation",
      amount: "₹45,000 total",
      deadline: "30 July 2025",
      desc: "Supporting female students in technical fields. Special mentorship included.",
      color: "#1E3A6F",
      category: "Girls Only",
      applyLink: "https://navgurukul.org/scholarships"
    },
    {
      id: 3,
      name: "State Merit Scholarship",
      provider: "Directorate of Technical Ed",
      amount: "₹20,000/year",
      deadline: "10 May 2025",
      desc: "Based on 10th marks, renewable each year. State government initiative.",
      color: "#2A4A7A",
      category: "Merit Based",
      applyLink: "https://www.dte.gov.in/scholarships"
    },
    // {
    //   id: 4,
    //   name: "Pragati Scholarship (Girls)",
    //   provider: "Ministry of Education",
    //   amount: "₹50,000",
    //   deadline: "31 Aug 2025",
    //   desc: "For girl students pursuing technical diploma. Includes skill development.",
    //   color: "#355F8A",
    //   category: "Girls Only",
    //   applyLink: "https://www.education.gov.in/scholarships"
    // },
    // {
    //   id: 5,
    //   name: "SC/ST Diploma Scholarship",
    //   provider: "Social Welfare Dept",
    //   amount: "₹35,000/year",
    //   deadline: "20 June 2025",
    //   desc: "Special scholarship for SC/ST students. Covers tuition & books.",
    //   color: "#0A2463",
    //   category: "Special Category",
    //   applyLink: "https://socialwelfare.gov.in/scholarships"
    // },
    // {
    //   id: 6,
    //   name: "Merit-cum-Means (Minority)",
    //   provider: "Minority Affairs",
    //   amount: "₹40,000/year",
    //   deadline: "5 July 2025",
    //   desc: "For minority community students with financial need.",
    //   color: "#1E3A6F",
    //   category: "Minority",
    //   applyLink: "https://www.minorityaffairs.gov.in/scholarships"
    // },
  ];

  // Benefits cards data - ALL 6 CARDS RESTORED
  const benefits = [
    {
      icon: "✓",
      title: "Personalized eligibility results",
      desc: "See exactly what you qualify for based on your 10th marks & category.",
      gradient: "from-[#0A2463] to-[#1E3A6F]"
    },
    {
      icon: "★",
      title: "Save scholarships for later",
      desc: "Build your shortlist and get deadline reminders.",
      gradient: "from-[#1E3A6F] to-[#2A4A7A]"
    },
    {
      icon: "📊",
      title: "Track applications",
      desc: "Deadlines, status & documents, all in one dashboard.",
      gradient: "from-[#2A4A7A] to-[#355F8A]"
    },
    {
      icon: "📝",
      title: "Document checklist",
      desc: "Get personalized list of required documents for each scholarship.",
      gradient: "from-[#355F8A] to-[#4A6A9A]"
    },
    {
      icon: "🤝",
      title: "Mentorship support",
      desc: "Connect with past scholars for guidance.",
      gradient: "from-[#0A2463] to-[#2A4A7A]"
    },
    {
      icon: "⚡",
      title: "Priority alerts",
      desc: "Get notified about new scholarships matching your profile.",
      gradient: "from-[#1E3A6F] to-[#355F8A]"
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Priya K.",
      achievement: "Got AICTE Scholarship",
      quote: "Completed registration and found 5 scholarships I was eligible for. Saved ₹1.2L!",
      image: "👩‍🎓"
    },
    {
      name: "Rahul M.",
      achievement: "State Merit Scholar",
      quote: "The personalized results saved me hours of searching. Highly recommended!",
      image: "👨‍🎓"
    },
  ];

  // Handler for apply button
  const handleApply = (link) => {
    window.open(link, "_blank", "noopener noreferrer");
  };

  return (
    
    <div className="bg-white text-gray-800 font-poppins min-h-screen">
      <DashboardHeader />
      {/* Spacer for fixed header */}
      <div className="h-20" />

      {/* ===== Enhanced Sticky Banner ===== */}
      <div
        className={`sticky top-20 z-40 w-full transform transition-all duration-500 ${
          bannerVisible ? "translate-y-[-0.20cm] opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="bg-gradient-to-r from-[#0A2463] via-[#1E3A6F] to-[#2A4A7A] text-white py-3 px-6 md:px-8 flex flex-wrap items-center justify-between gap-2 text-sm md:text-base shadow-xl">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="font-medium">✨ Complete registration to unlock personalized scholarships & eligibility checker</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/registration")}
              className="bg-white text-[#0A2463] px-6 py-1.5 rounded-lg font-medium hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2 group"
            >
              Complete Now
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={() => setBannerVisible(false)}
              className="text-white/60 hover:text-white transition-colors text-xl"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      <section className="px-6 md:px-8 pt-4 pb-8 max-w-7xl mx-auto">
        <br></br>
        <div className="mb-3 text-3xl md:text-4xl text-gray-700 flex items-center gap-3 animate-fadeIn">
          <span className="font-inika font-bold">Hi {firstName}!</span>
        </div>
        
        <h1 className="font-inika text-3xl md:text-4xl font-bold text-[#0A2463] leading-tight mb-4 animate-slideIn">
          <span className="bg-gradient-to-r from-[#0A2463] to-[#2A4A7A] bg-clip-text text-transparent">
            Discover Scholarships You’re Eligible For!
          </span>
        </h1>
        
        <p className="text-base text-gray-600 max-w-2xl mb-8 animate-fadeInUp">
          You can browse all scholarships below. Complete your registration to
          check which ones you qualify for.
        </p>
        
        <div className="flex flex-wrap gap-4 animate-fadeInUp animation-delay-200">
          <button
            onClick={() => navigate("/registration")}
            className="group relative bg-gradient-to-r from-[#0A2463] to-[#2A4A7A] text-white font-medium px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3 text-lg">
              Find My Eligible Scholarships
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#2A4A7A] to-[#0A2463] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button 
            onClick={() => navigate("/all-scholarships")}
            className="group relative bg-transparent border-2 border-[#0A2463] text-[#0A2463] font-medium px-8 py-3 rounded-xl hover:bg-[#0A2463]/5 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <span className="relative z-10 flex items-center gap-3 text-lg">
              Continue Exploring
              <span className="inline-block transition-transform group-hover:translate-x-1"></span>
            </span>
          </button>
        </div>
      </section>

      {/* ===== 2️⃣ Scholarship Ecosystem Overview ===== */}
      <br></br>
      <br></br>
      <section className="px-6 md:px-8 max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              data-id={`stat-${index}`}
              className={`relative bg-gradient-to-br ${stat.bgColor} rounded-2xl shadow-sm border ${stat.borderColor} p-6 flex flex-col items-start transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group cursor-pointer ${
                visibleItems.includes(`stat-${index}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000`}
              />
              
              <span className={`text-3xl mb-3 ${stat.iconBg} p-3 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                {stat.icon}
              </span>
              
              <span className="text-2xl font-semibold text-[#0A2463] transition-all duration-300 group-hover:scale-105">
                {stat.value}
              </span>
              
              <span className="text-sm text-gray-500 transition-colors duration-300 group-hover:text-[#0A2463]">
                {stat.label}
              </span>
              
              <span className="text-xs text-[#0A2463]/60 mt-2 font-medium">
                {stat.trend}
              </span>
              
              <div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#0A2463] to-[#2A4A7A] transition-all duration-500 ${
                  visibleItems.includes(`stat-${index}`) ? "w-full" : "w-0"
                }`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ===== 3️⃣ Scholarship Listing ===== */}
      <br></br>
      <section className="px-6 md:px-8 max-w-7xl mx-auto mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-inika text-2xl md:text-3xl font-bold text-[#0A2463] flex items-center gap-3">
            Featured Scholarships
            <span className="inline-block w-1 h-6 bg-gradient-to-b from-[#0A2463] to-transparent animate-pulse" />
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships.slice(0, 6).map((scholar, index) => (
            <div
              key={scholar.id}
              data-id={`scholar-${scholar.id}`}
              className={`group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden ${
                visibleItems.includes(`scholar-${scholar.id}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r from-[${scholar.color}]/5 to-transparent transition-opacity duration-500 ${
                  visibleItems.includes(`scholar-${scholar.id}`) ? "opacity-100" : "opacity-0"
                }`}
              />
              
              <div className="absolute top-0 right-0 w-24 h-24">
                <div
                  className={`absolute inset-0 bg-gradient-to-bl from-[${scholar.color}]/10 to-transparent transition-all duration-500 ${
                    visibleItems.includes(`scholar-${scholar.id}`) ? "scale-150" : "scale-100"
                  }`}
                />
              </div>
              
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-[#0A2463]/10 text-[#0A2463] text-xs font-medium rounded-full">
                  {scholar.category}
                </span>
                <span className="text-sm font-medium text-[#0A2463]">
                  ⏳ {scholar.deadline}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#0A2463] transition-colors">
                {scholar.name}
              </h3>
              
              <p className="text-[#0A2463] font-medium text-sm mb-3 flex items-center gap-1">
                <span>🏛️</span> {scholar.provider}
              </p>
          
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                {scholar.desc}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className="text-lg font-bold text-[#0A2463]">
                  {scholar.amount}
                </span>
                
                <button
                  onClick={() => handleApply(scholar.applyLink)}
                  className="group/btn relative bg-gradient-to-r from-[#0A2463] to-[#2A4A7A] text-white text-sm font-medium px-5 py-2.5 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Apply Now
                    <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2A4A7A] to-[#0A2463] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Browse All CTA */}
        <div className="mt-12 text-center">
          
          <button 
            onClick={() => navigate("/all-scholarships")}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#0A2463] to-[#2A4A7A] text-white font-medium px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <span className="relative z-10 flex items-center gap-3 text-lg">
              <span className="text-2xl">🔍</span>
              Browse All 125+ Scholarships
              <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#2A4A7A] to-[#0A2463] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          
          <p className="text-sm text-gray-400 mt-4 flex items-center justify-center gap-2">
            <span className="inline-block w-1 h-1 bg-green-500 rounded-full animate-pulse" />
            Including 45 new scholarships added this month
          </p>
        </div>
      </section>

      {/* ===== 4️⃣ Why Complete Registration Section - ALL 6 CARDS WITH PROPER SPACING ===== */}
      <section className="px-6 md:px-8 max-w-7xl mx-auto mb-20">
        <h2 className="font-inika text-2xl md:text-3xl font-bold text-[#0A2463] mb-10 text-center relative">
          Why complete your registration?
          <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#0A2463] to-transparent animate-pulse" />
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              data-id={`benefit-${idx}`}
              className={`group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-start transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden ${
                visibleItems.includes(`benefit-${idx}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />
              
              <span className={`w-14 h-14 bg-gradient-to-br ${benefit.gradient} text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-5 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl`}>
                {benefit.icon}
              </span>
              
              <h3 className="font-semibold text-xl text-gray-800 mb-3 group-hover:text-[#0A2463] transition-colors">
                {benefit.title}
              </h3>
              
              <p className="text-gray-500 text-base leading-relaxed">
                {benefit.desc}
              </p>
              
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#0A2463] to-[#2A4A7A] group-hover:w-16 transition-all duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* ===== 5️⃣ Testimonials Section ===== */}
      <section className="px-6 md:px-8 max-w-7xl mx-auto mb-20">
        <h2 className="font-inika text-2xl md:text-3xl font-bold text-[#0A2463] mb-10 text-center">
          Trusted by students like you
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              data-id={`testimonial-${idx}`}
              className={`bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 transition-all duration-500 hover:shadow-xl ${
                visibleItems.includes(`testimonial-${idx}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-start gap-5">
                <span className="text-5xl">{testimonial.image}</span>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg text-gray-800">{testimonial.name}</h3>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                      ✓ Verified
                    </span>
                  </div>
                  <p className="text-[#0A2463] font-medium text-base mb-2">{testimonial.achievement}</p>
                  <p className="text-gray-600 text-base">"{testimonial.quote}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 6️⃣ Final CTA Section ===== */}
      <section className="px-6 md:px-8 max-w-7xl mx-auto mb-24">
        <div className="bg-gradient-to-r from-[#0A2463] to-[#2A4A7A] rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 translate-y-full hover:translate-y-0 transition-transform duration-700" />
          
          <h2 className="font-inika text-3xl md:text-4xl font-bold mb-6 relative z-10">
            Ready to find your scholarship?
          </h2>
          
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Join 50,000+ students who found their perfect scholarship. Complete registration in 2 minutes.
          </p>
          
          <button
            onClick={() => navigate("/registration")}
            className="group relative bg-white text-[#0A2463] font-medium px-10 py-4 rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden inline-flex items-center gap-3 text-lg"
          >
            <span className="relative z-10 flex items-center gap-3">
              Complete Registration Now
              <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
            </span>
            <div className="absolute inset-0 bg-gray-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          
          <p className="text-white/70 text-sm mt-8 relative z-10">
            ✨ No credit card required • Free for all students • 2 minutes only
          </p>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <Footer />

      {/* Custom animations CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  );
};

export default HomePage;