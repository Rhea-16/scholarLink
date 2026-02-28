import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from "../../utils/AuthContent.jsx";
import { getToken, logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const CompleteProfile = ({ onComplete, onSkip }) => {
  const navigate = useNavigate();
  const token = getToken();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:8000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        logout(); navigate("/login");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [token, navigate, setUser]);

  if (loading || !user) return null;
  const firstName = user.full_name?.trim().split(" ")[0] || "Student";

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] font-['Poppins'] flex items-center justify-center overflow-hidden p-4">
      
      {/* 1. HIGH-VISIBILITY TOP PROGRESS LINE (GLOW EFFECT) */}
      <div className="fixed top-0 left-0 w-full h-[4px] bg-gray-200/50 z-50">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="h-full w-2/5 bg-[#0A2463] shadow-[0_0_15px_rgba(10,36,99,0.8)]"
        />
      </div>

      {/* 2. PREMIUM BACKGROUND ANIMATION */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, ease: "linear" }}
          className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] border-[1px] border-[#0A2463]/10 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 10,  ease: "linear" }}
          className="absolute -bottom-[5%] -left-[5%] w-[400px] h-[400px] border-[1px] border-[#0A2463]/5 rounded-full"
        />
      </div>

      {/* 3. CENTERED CONTENT CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-lg w-full bg-white border border-gray-100 p-8 md:p-14 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] text-center"
      >
        <header className="space-y-6">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="inline-block px-4 py-1.5 bg-[#0A2463]/5 text-[#0A2463] text-[10px] font-bold uppercase tracking-widest rounded-full"
          >
           Account Created
          </motion.span>
          
          <div className="space-y-3">
            <h2 className="text-gray-500 font-['Outfit']  text-3xl md:text-4xl font-light tracking-tight">
              Hello, {firstName}
            </h2>
            <h1 className="font-['Outfit'] text-2xl md:text-3xl font-semibold text-[#0A2463] leading-[1.1] tracking-tight">
              One Step Away from Your Scholarships
            </h1>
          </div>
          
          <p className="text-[13px] text-gray-500 leading-relaxed px-4">
            Add your academic and personal details to check which scholarships you qualify for.
          </p>
        </header>

        {/* 4. CALL TO ACTION AREA */}
        <div className="mt-10 mb-12 flex flex-col items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#06163a" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/registration")}
            className="group relative w-full py-4 bg-[#0A2463] text-white rounded-2xl font-['Inika'] font-medium text-base tracking-wide shadow-2xl shadow-blue-900/30 transition-all overflow-hidden"
          >
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
            Complete Registration
          </motion.button>

          <button 
            onClick={() => navigate("/home")}
            className="text-sm text-gray-400 font-medium hover:text-[#0A2463] transition-colors"
          >
            Skip for now
          </button>
        </div>

        {/* 5. MINIMALIST METRICS GRID */}
        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-50">
          <div className="space-y-1">
            <p className="font-['Outfit'] text-2xl font-bold text-[#0A2463]">125+</p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">Programs</p>
          </div>
          <div className="space-y-1 border-l border-gray-100">
            <p className="font-['Outfit'] text-2xl font-bold text-[#0A2463]">₹2.5Cr</p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">Total Pool</p>
          </div>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 w-full text-center pointer-events-none">
        <p className="text-[10px] text-gray-300 font-medium tracking-[0.3em] uppercase">
          Secure Academic Environment • 2026
        </p>
      </div>
    </div>
  );
};

export default CompleteProfile;