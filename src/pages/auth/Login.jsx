import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LoginHeader from "../../components/LoginHeader";
import { Mail, Lock, Eye, EyeOff, Award, ChevronRight, AlertCircle, CheckCircle, Sparkles, Users, Building } from "lucide-react";
import { login } from "../../services/authService";
import { setToken } from "../../utils/auth";
import Loading from "../../components/loading";
import { useAuth } from "../../utils/AuthContent";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { setUser, setIsAuthenticated } = useAuth();
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false
  });
  const [shake, setShake] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   if (!validateEmail(email)) {
  //     setEmailError("Please enter a valid email address");
  //     setShake(true);
  //     setTimeout(() => setShake(false), 500);
  //     return;
  //   }
    
  //   if (!password) {
  //     setShake(true);
  //     setTimeout(() => setShake(false), 500);
  //     return;
  //   }
    
  //   setIsSubmitting(true);
    
  //   // Simulate API call
  //   setTimeout(() => {
  //     console.log("Login attempted with:", { email, password });
  //     setIsSubmitting(false);
  //   }, 1500);
  // };

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateEmail(email) || !password) {
    setShake(true);
    setTimeout(() => setShake(false), 500);
    return;
  }

  try {
    setIsSubmitting(true);
    const data = await login(email, password);
    setToken(data.access_token);
    localStorage.setItem("token", data.access_token);
    setIsAuthenticated(true);

    setIsRedirecting(true);
    // Redirect directly to dashboard
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // if(isRegistered())
      navigate("/home");
    // else 
    //   navigate("/dashboard");
    setIsRedirecting(false);

  } catch (error) {
    setShake(true);
    setTimeout(() => setShake(false), 500);
    alert("Invalid email or password");
    console.error("LOGIN ERROR:", error);
    alert(
    error.response.data.detail ||
    error?.message ||
    "Login failed"
  );
  } finally {
    setIsSubmitting(false);
  }
};

  const floatingElements = [
    { id: 1, top: "15%", left: "10%", delay: 0 },
    { id: 2, top: "25%", right: "15%", delay: 0.3 },
    { id: 3, bottom: "20%", left: "20%", delay: 0.6 },
    { id: 4, bottom: "30%", right: "10%", delay: 0.9 }
  ];
  
  if(isRedirecting){
    <Loading/>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-blue-50/10 overflow-hidden">
      <LoginHeader backRedirect = "/"/>
      
      {/* Reduced top padding to avoid overlap */}
      <div className="flex min-h-screen pt-16">
        {/* Left Side - 60% for Image/Visuals */}
        <div className="hidden lg:flex lg:w-3/5 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A2463]/5 via-blue-50/30 to-[#1E3A8A]/5 backdrop-blur-[1px]">
            {/* Interactive Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#0A2463_0%,transparent_50%),radial-gradient(circle_at_70%_80%,#1E3A8A_0%,transparent_50%)]" />
            </div>

            {/* Animated Hero Content - Reduced padding */}
            <div className="relative h-full flex flex-col justify-center p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0A2463] to-[#1E3A8A] flex items-center justify-center shadow-lg shadow-blue-500/20"
                  >
                    <Award className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h1 className="font-poppins font-bold text-2xl lg:text-3xl text-gray-900">ScholarLink</h1>
                    <p className="font-inter text-gray-600 text-sm">Your Gateway to Scholarships</p>
                  </div>
                </div>

                {/* Interactive Stats Cards - Reduced size */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-blue-100 shadow-md"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-poppins font-bold text-lg text-gray-900">12,500+</div>
                        <div className="font-inter text-xs text-gray-600">Students Helped</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3 }}
                    className="bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-blue-100 shadow-md"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Building className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <div className="font-poppins font-bold text-lg text-gray-900">320+</div>
                        <div className="font-inter text-xs text-gray-600">Partners</div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Interactive Features - Reduced spacing */}
                <div className="space-y-3">
                  {[
                    { icon: Sparkles, text: "AI-Powered Scholarship Matching" },
                    { icon: CheckCircle, text: "Verified Opportunities" },
                    { icon: Award, text: "95% Success Rate" }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 group cursor-pointer"
                    >
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex items-center justify-center group-hover:shadow-sm transition-all duration-300"
                      >
                        <feature.icon className="w-5 h-5 text-blue-600" />
                      </motion.div>
                      <span className="font-inter text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Animated Call to Action - Smaller */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200">
                  <Sparkles className="w-3 h-3 text-blue-600 animate-pulse" />
                  <span className="font-inter text-xs text-blue-700">New scholarships added daily</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Side - 40% for Login Form */}
        <div className="w-full lg:w-2/5 flex items-center justify-center p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm"
          >
            {/* Form Container - Reduced padding */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl border border-blue-100 shadow-lg p-6 lg:p-8"
            >
              {/* Header - Smaller */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center gap-3 mb-4"
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0A2463] to-[#1E3A8A] flex items-center justify-center shadow-md"
                  >
                    <Lock className="w-5 h-5 text-white" />
                  </motion.div>
                </motion.div>
                <h1 className="font-poppins font-semibold text-xl text-gray-900 mb-2">
                  Welcome Back
                </h1>
                <p className="font-inter text-gray-600 text-sm">
                  Sign in to access your scholarships
                </p>
              </div>

              {/* Login Form */}
              <AnimatePresence>
                <motion.form
                  key="login-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className={`space-y-4 ${shake ? 'animate-shake' : ''}`}
                >
                  {/* Email Field */}
                  <motion.div
                    whileFocus={{ scale: 1.01 }}
                    className="space-y-1.5"
                  >
                    <label htmlFor="email" className="font-inter font-medium text-gray-700 text-sm">
                      Email Address
                    </label>
                    <div className="relative">
                      <motion.div
                        animate={{ scale: isFocused.email ? 1.05 : 1 }}
                        className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${
                          emailError ? 'text-red-500' : isFocused.email ? 'text-blue-500' : 'text-gray-400'
                        }`}
                      >
                        <Mail className="h-4 w-4" />
                      </motion.div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        onFocus={() => setIsFocused(prev => ({ ...prev, email: true }))}
                        onBlur={() => setIsFocused(prev => ({ ...prev, email: false }))}
                        className={`font-inter text-sm block w-full pl-10 pr-3 py-3 rounded-lg border ${
                          emailError 
                            ? 'border-red-300 focus:ring-1 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                        } bg-white text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-200 hover:border-blue-300`}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <AnimatePresence>
                      {emailError && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="font-inter text-xs text-red-600 mt-1 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {emailError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Password Field */}
                  <motion.div
                    whileFocus={{ scale: 1.01 }}
                    className="space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="font-inter font-medium text-gray-700 text-sm">
                        Password
                      </label>
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Link 
                          to="/forgot-password" 
                          className="font-inter text-xs font-medium text-[#0A2463] hover:text-[#1E3A8A] transition-colors duration-200"
                        >
                          Forgot password?
                        </Link>
                      </motion.div>
                    </div>
                    <div className="relative">
                      <motion.div
                        animate={{ scale: isFocused.password ? 1.05 : 1 }}
                        className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${
                          isFocused.password ? 'text-blue-500' : 'text-gray-400'
                        }`}
                      >
                        <Lock className="h-4 w-4" />
                      </motion.div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
                        onBlur={() => setIsFocused(prev => ({ ...prev, password: false }))}
                        className="font-inter text-sm block w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                        placeholder="Enter your password"
                        required
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="pt-1"
                  >
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting || !!emailError || !email || !password}
                      className={`font-inter text-sm w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 relative overflow-hidden ${
                        isSubmitting || emailError || !email || !password
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] hover:shadow-md hover:shadow-blue-500/20'
                      }`}
                    >
                      {isSubmitting && (
                        <motion.div
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                      )}
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing in...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </span>
                    </motion.button>
                  </motion.div>
                </motion.form>
              </AnimatePresence>

              {/* Create Account Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6"
              >
                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="font-inter text-xs px-2 bg-white text-gray-500">
                      New to ScholarLink?
                    </span>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.01 }}>
                  <Link
                    to="/signup"
                    className="group flex items-center justify-center w-full py-3 px-4 rounded-lg border border-[#0A2463] text-[#0A2463] font-inter text-sm font-semibold hover:bg-[#0A2463] hover:text-white transition-all duration-200 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Create New Account
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </motion.span>
                    </span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Terms & Privacy */}
              <div className="mt-6 text-center">
                <p className="font-inter text-xs text-gray-500">
                  By signing in, you agree to our{" "}
                  <motion.span whileHover={{ scale: 1.05 }}>
                    <Link to="/terms" className="text-[#0A2463] hover:underline font-medium">
                      Terms
                    </Link>
                  </motion.span>{" "}
                  and{" "}
                  <motion.span whileHover={{ scale: 1.05 }}>
                    <Link to="/privacy" className="text-[#0A2463] hover:underline font-medium">
                      Privacy Policy
                    </Link>
                  </motion.span>
                </p>
              </div>
            </motion.div>

            {/* Mobile Stats - Smaller */}
            <div className="lg:hidden mt-6 grid grid-cols-2 gap-3">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-blue-100">
                <div className="font-poppins font-bold text-lg text-gray-900">12.5K+</div>
                <div className="font-inter text-xs text-gray-600">Students</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-blue-100">
                <div className="font-poppins font-bold text-lg text-gray-900">8.7K+</div>
                <div className="font-inter text-xs text-gray-600">Scholarships</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Floating Elements - Reduced size */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
              y: [0, -15, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: element.delay
            }}
            className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-blue-200/20 to-indigo-200/10"
            style={{
              top: element.top,
              left: element.left,
              right: element.right,
              bottom: element.bottom
            }}
          />
        ))}
      </div>

      {/* Add custom animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}