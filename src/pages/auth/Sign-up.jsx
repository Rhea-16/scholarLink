import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LoginHeader from "../../components/LoginHeader";
import { signup } from "../../services/authService";
import { setToken } from "../../utils/auth";

import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Eye, 
  EyeOff, 
  Award, 
  ChevronRight, 
  AlertCircle,
  CheckCircle,
  Sparkles
} from "lucide-react";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "" ,
    password: "",
    confirmPassword: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false
  });
  const [isRedirecting, setIsRedirecting] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/(?=.*[a-z])/.test(password)) return "Password must contain a lowercase letter";
    if (!/(?=.*[A-Z])/.test(password)) return "Password must contain an uppercase letter";
    if (!/(?=.*[0-9])/.test(password)) return "Password must contain a number";
    return "";
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }

    // Validate email in real-time
    if (field === 'email' && value) {
      if (!validateEmail(value)) {
        setFormErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
      }
    }

    // Validate phone in real-time
    if (field === 'phone' && value) {
      if (!validatePhone(value)) {
        setFormErrors(prev => ({ ...prev, phone: "Please enter a valid 10-digit phone number" }));
      }
    }

    // Validate password in real-time
    if (field === 'password' && value) {
      const error = validatePassword(value);
      setFormErrors(prev => ({ ...prev, password: error }));
    }

    // Validate confirm password
    if (field === 'confirmPassword' && value) {
      if (value !== formData.password) {
        setFormErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      } else {
        setFormErrors(prev => ({ ...prev, confirmPassword: "" }));
      }
    }

    // Validate password match when password changes
    if (field === 'password' && formData.confirmPassword) {
      if (value !== formData.confirmPassword) {
        setFormErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      } else {
        setFormErrors(prev => ({ ...prev, confirmPassword: "" }));
      }
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const errors = {};

  if (!formData.firstName.trim()) errors.firstName = "First name is required";
  if (!formData.lastName.trim()) errors.lastName = "Last name is required";

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  // if (formData.phone && !validatePhone(formData.phone)) {
  //   errors.phone = "Please enter a valid 10-digit phone number";
  // }

if (!formData.phone) {
  errors.phone = "Phone number is required";
} else if (!/^[0-9]{10}$/.test(formData.phone)) {
  errors.phone = "Enter a valid 10-digit phone number";
}

  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  setFormErrors(errors);

  if (Object.keys(errors).length !== 0) return;

  setIsSubmitting(true);

  try {
    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone.trim(),
      password: formData.password,
    };

    const response = await signup(payload);
    setIsRedirecting(true);
    setToken(response.access_token);
    console.log(response.access_token);
    navigate("/profile-completion");
    setIsRedirecting(false);
  } catch (err) {
    const message =
    err.response?.data?.detail ||
    err.response?.data?.message ||
    "Signup failed. Please try again.";
    alert(message);

  setFormErrors({ email: message });
  } finally {
    setIsSubmitting(false);
  }
};


  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "Contains lowercase letter", met: /(?=.*[a-z])/.test(formData.password) },
    { label: "Contains uppercase letter", met: /(?=.*[A-Z])/.test(formData.password) },
    { label: "Contains number", met: /(?=.*[0-9])/.test(formData.password) },
  ];

  if(isRedirecting){
    return <div>Redirecting to dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-blue-50/10 overflow-hidden">
      <LoginHeader backRedirect = "/"/>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-blue-100/20"
        />
        <motion.div 
          animate={{ y: [15, 0, 15] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/3 right-1/4 w-5 h-5 rounded-full bg-indigo-100/30"
        />
        <motion.div 
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-1/4 left-1/3 w-6 h-6 rounded-full bg-blue-200/15"
        />
      </div>

      {/* Main Content - Increased vertical spacing and container width */}
      <div className="min-h-screen flex items-center justify-center p-4 pt-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-xl" // Increased from max-w-lg to max-w-xl
        >
          {/* Form Container - Increased width and better spacing */}
          <motion.div
            whileHover={{ scale: 1.005 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl border border-blue-100 shadow-lg p-8 lg:p-10" // Increased padding
          >
            {/* Header - Slightly larger */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0A2463] to-[#1E3A8A] flex items-center justify-center shadow-md"
                >
                  <Award className="w-7 h-7 text-white" />
                </motion.div>
              </motion.div>
              <h1 className="font-poppins font-semibold text-2xl text-gray-900 mb-2">
                Create Your Account
              </h1>
              <p className="font-inter text-gray-600 text-sm">
                Join thousands of students finding their perfect scholarships
              </p>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-6"> {/* Increased spacing */}
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5"> {/* Increased gap */}
                {/* First Name */}
                <div className="space-y-2">
                  <label htmlFor="firstName" className="font-inter font-medium text-gray-700">
                    First Name *
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${
                      isFocused.firstName ? 'text-blue-500' : 'text-gray-400'
                    }`}>
                      <User className="h-5 w-5" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      onFocus={() => setIsFocused(prev => ({ ...prev, firstName: true }))}
                      onBlur={() => setIsFocused(prev => ({ ...prev, firstName: false }))}
                      className={`font-inter text-sm block w-full pl-10 pr-3 py-3 rounded-lg border ${
                        formErrors.firstName 
                          ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      } bg-white text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-200`}
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  <AnimatePresence>
                    {formErrors.firstName && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="font-inter text-xs text-red-600 mt-1 flex items-center gap-2"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.firstName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label htmlFor="lastName" className="font-inter font-medium text-gray-700">
                    Last Name *
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${
                      isFocused.lastName ? 'text-blue-500' : 'text-gray-400'
                    }`}>
                      <User className="h-5 w-5" />
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      onFocus={() => setIsFocused(prev => ({ ...prev, lastName: true }))}
                      onBlur={() => setIsFocused(prev => ({ ...prev, lastName: false }))}
                      className={`font-inter text-sm block w-full pl-10 pr-3 py-3 rounded-lg border ${
                        formErrors.lastName 
                          ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      } bg-white text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-200`}
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                  <AnimatePresence>
                    {formErrors.lastName && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="font-inter text-xs text-red-600 mt-1 flex items-center gap-2"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.lastName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="font-inter font-medium text-gray-700">
                  Email Address *
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${
                    formErrors.email ? 'text-red-500' : isFocused.email ? 'text-blue-500' : 'text-gray-400'
                  }`}>
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onFocus={() => setIsFocused(prev => ({ ...prev, email: true }))}
                    onBlur={() => setIsFocused(prev => ({ ...prev, email: false }))}
                    className={`font-inter text-sm block w-full pl-10 pr-3 py-3 rounded-lg border ${
                      formErrors.email 
                        ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    } bg-white text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-200`}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <AnimatePresence>
                  {formErrors.email && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="font-inter text-xs text-red-600 mt-1 flex items-center gap-2"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Phone Number - Optional */}
              <div className="space-y-2">
                <label htmlFor="phone" className="font-inter font-medium text-gray-700">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${
                    isFocused.phone ? 'text-blue-500' : 'text-gray-400'
                  }`}>
                    <Phone className="h-5 w-5" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    onFocus={() => setIsFocused(prev => ({ ...prev, phone: true }))}
                    onBlur={() => setIsFocused(prev => ({ ...prev, phone: false }))}
                    className={`font-inter text-sm block w-full pl-10 pr-3 py-3 rounded-lg border ${
                      formErrors.phone 
                        ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    } bg-white text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-200`}
                    placeholder="10-digit phone number"
                    required
                  />
                </div>
                <AnimatePresence>
                  {formErrors.phone && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="font-inter text-xs text-red-600 mt-1 flex items-center gap-2"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
                <p className="font-inter text-xs text-gray-500">
                  We'll use this to send important scholarship updates
                </p>
              </div>

              {/* Password Requirements */}
              <div className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Password */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="font-inter font-medium text-gray-700">
                      Password *
                    </label>
                    <div className="relative">
                      <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${
                        isFocused.password ? 'text-blue-500' : 'text-gray-400'
                      }`}>
                        <Lock className="h-5 w-5" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPasswords.password ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
                        onBlur={() => setIsFocused(prev => ({ ...prev, password: false }))}
                        className="font-inter text-sm block w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Create password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, password: !prev.password }))}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        {showPasswords.password ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <AnimatePresence>
                      {formErrors.password && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="font-inter text-xs text-red-600 mt-1 flex items-center gap-2"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          {formErrors.password}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="font-inter font-medium text-gray-700">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${
                        isFocused.confirmPassword ? 'text-blue-500' : 'text-gray-400'
                      }`}>
                        <Lock className="h-5 w-5" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPasswords.confirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        onFocus={() => setIsFocused(prev => ({ ...prev, confirmPassword: true }))}
                        onBlur={() => setIsFocused(prev => ({ ...prev, confirmPassword: false }))}
                        className={`font-inter text-sm block w-full pl-10 pr-10 py-3 rounded-lg border ${
                          formErrors.confirmPassword 
                            ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        } bg-white text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-200`}
                        placeholder="Confirm password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        {showPasswords.confirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <AnimatePresence>
                      {formErrors.confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="font-inter text-xs text-red-600 mt-1 flex items-center gap-2"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          {formErrors.confirmPassword}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="mt-4 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                  <p className="font-inter font-medium text-sm text-gray-700 mb-2">Password Requirements:</p>
                  <div className="space-y-2">
                    {passwordRequirements.map((req, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        {req.met ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-gray-300" />
                        )}
                        <span className={`font-inter text-sm ${req.met ? 'text-green-600' : 'text-gray-600'}`}>
                          {req.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </div>
                <label htmlFor="terms" className="font-inter text-sm text-gray-700">
                  I agree to the{" "}
                  <Link to="/terms" className="text-[#0A2463] hover:underline font-medium">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-[#0A2463] hover:underline font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`font-inter text-sm w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 relative overflow-hidden ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] hover:shadow-md hover:shadow-blue-500/20'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Create Account
                    </span>
                  )}
                </button>
              </motion.div>

              {/* Already have account */}
              <div className="text-center pt-4">
                <p className="font-inter text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-[#0A2463] hover:underline font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="font-inter text-xs text-gray-500">
              © {new Date().getFullYear()} ScholarLink. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
