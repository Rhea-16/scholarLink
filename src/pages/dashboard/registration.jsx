import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Sparkles } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";
import LoginHeader from "../../components/LoginHeader"
import { 
  Send,
  ArrowRight,
  ArrowLeft,
  User,
  GraduationCap,
  DollarSign,
  HelpCircle,
  AlertCircle,
  CheckCircle
} from "lucide-react"; 

const ImmersiveRegistration = () => {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isRedirecting, setIsRedirecting] = useState(false);
  const containerRef = useRef(null);
  const planeRef = useRef(null);
  const navigate = useNavigate();
  
  // Form data state
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dob: '',
    religion: '',
    state: '',
    district: '',
    city: '',
    pincode: '',
    phone1: '',
    phone2: '',
    email: '',
    caste: '',
    category: '',
    isOrphan: false,
    hasDisability: false,
    isMinority: false,
    // specialCategory: '',
    nationality: '',
    
    // Academic Details
    schoolName: '',
    collegeName: '',
    tenthPassYear: '',
    twelfthPassYear: '',
    tenthPercentage: '',
    twelfthPercentage: '',
    isDiplomaStudent: false,
    
    // Financial Details
    annualIncome: '',
    familyMembers: '',
    
    // Others
    hasFarmerFamily: false,
    hasMilitaryFamily: false,
    hasCovidVictimFamily: false
  });

  // Validation rules for each step
  const validationRules = {
    1: [
      'firstName', 'lastName', 'gender', 'dob', 'religion', 'state','district','city','pincode',
      'phone1', 'email', 'nationality'
    ],
    2: [
      'schoolName', 'tenthPassYear', 'tenthPercentage'
    ],
    3: [
      'annualIncome', 'familyMembers'
    ],
    4: [] // All optional fields
  };

  // Check if current step is valid
  const isCurrentStepValid = () => {
    const requiredFields = validationRules[currentStep];
    return requiredFields.every(field => {
      const value = formData[field];
      if (typeof value === 'boolean') return true;
      return value !== null && value !== undefined && value.toString().trim() !== '';
    });
  };

  // Validate current step
  const validateCurrentStep = () => {
    const errors = {};
    const requiredFields = validationRules[currentStep];
    
    requiredFields.forEach(field => {
      const value = formData[field];
      if (typeof value === 'boolean') return;
      if (!value || value.toString().trim() === '') {
        errors[field] = 'This field is required';
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Dynamic paper plane flight path
  const getPlaneAnimationPath = () => {
    // Get viewport dimensions for dynamic path
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    return {
      x: [
        0,                            // Start bottom-left
        width * 0.3,                  // Curve up-left
        width * 0.15,                 // Loop back
        width * 0.4,                  // Diagonal
        width * 0.7,                  // Center curve
        width * 0.6,                  // Loop back
        width * 0.8,                  // Final approach
        width + 100                   // Exit right
      ],
      y: [
        height - 50,                  // Start from bottom
        height * 0.6,                 // First ascent
        height * 0.4,                 // Loop peak
        height * 0.5,                 // Dip
        height * 0.3,                 // Second ascent
        height * 0.2,                 // Peak
        height * 0.1,                 // Final ascent
        -100                          // Exit top
      ],
      rotate: [
        -45,                          // Starting angle
        0,                            // Level out
        45,                           // Bank right
        -15,                          // Adjust
        30,                           // Bank left
        -30,                          // Adjust
        15,                           // Final approach
        90                            // Exit angle
      ],
      scale: [
        1, 1.2, 1, 1.1, 0.9, 1, 1.2, 1
      ]
    };
  };

  const handleNext = () => {
    if (!isCurrentStepValid()) {
      // Show validation errors
      validateCurrentStep();
      setShowErrors(true);
      
      // Shake animation for invalid fields
      const invalidFields = Object.keys(validationErrors);
      invalidFields.forEach(field => {
        const element = document.querySelector(`[name="${field}"]`);
        if (element) {
          element.classList.add('animate-shake');
          setTimeout(() => element.classList.remove('animate-shake'), 500);
        }
      });
      
      return;
    }
    
    // Start animation
    setIsAnimating(true);
    setShowErrors(false);
    
    // Change step after animation completes
    setTimeout(() => {
      setCurrentStep(prev => {
        const nextStep = prev + 1;
        // Reset validation for new step
        setValidationErrors({});
        return nextStep;
      });
    }, 1500);
    
    // Reset animation after plane exits
    setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setValidationErrors({});
      setShowErrors(false);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  const payload = {
    first_name: formData.firstName,
    middle_name: formData.middleName,
    last_name: formData.lastName,
    gender: formData.gender,
    dob: formData.dob,
    religion: formData.religion,
    state: formData.state,
    district: formData.district,
    city: formData.city,
    taluka: null,
    pincode: formData.pincode,
    primary_phone: formData.phone1,
    secondary_phone: formData.phone2,
    email: formData.email,
    caste: formData.caste,
    category: formData.category,
    nationality: formData.nationality,

    is_orphan: formData.isOrphan ? 1 : 0,
    specially_abled: formData.hasDisability ? 1 : 0,
    is_minority: formData.isMinority ? 1 : 0,

    school_name: formData.schoolName,
    college_name: formData.collegeName,
    tenth_pass_year: Number(formData.tenthPassYear),
    twelfth_pass_year: Number(formData.twelfthPassYear),
    tenth_percentage: Number(formData.tenthPercentage),
    twelfth_percentage: Number(formData.twelfthPercentage),
    is_diploma_student: formData.isDiplomaStudent ? 1 : 0,

    family_income: Number(formData.annualIncome),
    family_members_count: Number(formData.familyMembers),

    family_farmer: formData.hasFarmerFamily ? 1 : 0,
    family_military: formData.hasMilitaryFamily ? 1 : 0,
    family_covid_victim: formData.hasCovidVictimFamily ? 1 : 0
  };
  console.log("Token being sent:", token);
  
  try {
    console.log("Sending payload:", payload);
    const response = await fetch("http://localhost:8000/profile/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(JSON.stringify(errorData, null, 2));
      return;
    }

    navigate("/dashboard");

    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };


  // Step definitions
  const steps = [
    { id: 1, title: "Personal Details", icon: User, color: "#0A2463" },
    { id: 2, title: "Academic Profile", icon: GraduationCap, color: "#0A2463" },
    { id: 3, title: "Financial Details", icon: DollarSign, color: "#0A2463" },
    { id: 4, title: "Additional Information", icon: HelpCircle, color: "#0A2463" }
  ];

  // Render form sections with improved spacing
  const renderFormSection = () => {
    switch(currentStep) {
      case 1:
        return (
          <motion.div
            key="personal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-0" style={{ fontFamily: "'Inika', serif" }}>
                Personal Information
              </h2>
              <p className="text-gray-600 font-poppins">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 gap-y-10">
              {/* Column 1 */}
              <div className="space-y-8">
                {/* Name Group */}
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 ${validationErrors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 font-poppins`}
                      required
                    />
                    {validationErrors.firstName && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-poppins">
                        <AlertCircle className="w-4 h-4" /> {validationErrors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 font-poppins"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 ${validationErrors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 font-poppins`}
                      required
                    />
                    {validationErrors.lastName && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-poppins">
                        <AlertCircle className="w-4 h-4" /> {validationErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Personal Details Group */}
                <div className="space-y-8 pt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 ${validationErrors.gender ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 appearance-none font-poppins`}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {validationErrors.gender && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-poppins">
                        <AlertCircle className="w-4 h-4" /> {validationErrors.gender}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 ${validationErrors.dob ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 font-poppins`}
                      required
                    />
                    {validationErrors.dob && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-poppins">
                        <AlertCircle className="w-4 h-4" /> {validationErrors.dob}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                        Primary Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone1"
                        value={formData.phone1}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 ${validationErrors.phone1 ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 font-poppins`}
                        required
                      />
                      {validationErrors.phone1 && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-poppins">
                          <AlertCircle className="w-4 h-4" /> {validationErrors.phone1}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                        Secondary Phone
                      </label>
                      <input
                        type="tel"
                        name="phone2"
                        value={formData.phone2}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 font-poppins"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 font-poppins`}
                      required
                    />
                    {validationErrors.email && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-poppins">
                        <AlertCircle className="w-4 h-4" /> {validationErrors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-8">
                {/* Contact Group */}
                <div className="space-y-8">
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full px-4 py-3 border-2 ${validationErrors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 resize-none font-poppins`}
                      required
                    />
                    {validationErrors.address && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-poppins">
                        <AlertCircle className="w-4 h-4" /> {validationErrors.address}
                      </p>
                    )}
                  </div> */}
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                      State *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 ${validationErrors.state ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 appearance-none font-poppins`}
                      required
                    >
                      <option value="">Select State</option>
                      <option value="maharashtra">Maharashtra</option>
                      {/* <option value="gujarat">Gujarat</option>
                      <option value="raja">Banglore</option> */}
                    </select>
                    {validationErrors.state && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-poppins">
                        <AlertCircle className="w-4 h-4" /> {validationErrors.state}
                      </p>
                    )}
                  </div>

                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                      District *
                    </label>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 ${validationErrors.district ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 appearance-none font-poppins`}
                      required
                    >
                      <option value="">Select District</option>
                      <option value="thane">Thane</option>
                    </select>
                    {validationErrors.district && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-poppins">
                        <AlertCircle className="w-4 h-4" /> {validationErrors.district}
                      </p>
                    )}
                  </div>

                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                      City *
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 ${validationErrors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 appearance-none font-poppins`}
                      required
                    >
                      <option value="">Select City</option>
                      <option value="thane">Thane</option>
                      <option value="navi_mumbai">Navi Mumbai</option>
                      <option value="kalyan">Kalyan</option>
                      <option value="badlapur">Badlapur</option>
                      <option value="ulhasnagar">Ulhasnagar</option>
                    </select>
                    {validationErrors.district && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-poppins">
                        <AlertCircle className="w-4 h-4" /> {validationErrors.district}
                      </p>
                    )}
                  </div>

                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        inputMode="numeric"
                        pattern="[0-9]{6}"
                        maxLength="6"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 ${validationErrors.pincode ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 font-poppins`}
                        required
                      />
                      {validationErrors.pincode && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-poppins">
                          <AlertCircle className="w-4 h-4" /> {validationErrors.pincode}
                        </p>
                      )}
                    </div>
                </div>

                {/* Background Group */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                    Religion *
                  </label>
                  <select
                      name="religion"
                      value={formData.religion}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 ${validationErrors.religion ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 appearance-none font-poppins`}
                      required
                   >
                      <option value="">Select Religion</option>
                      <option value="hinduism">Hinduism</option>
                      <option value="islam">Islam</option>
                      <option value="christianity">Christianity</option>
                      <option value="sikhism">Sikhism</option>
                      <option value="buddhism">Buddhism</option>
                      <option value="jainism">Jainism</option>
                      <option value="other">Other</option>
                    </select>
                    {validationErrors.religion && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-poppins">
                        <AlertCircle className="w-4 h-4" /> {validationErrors.religion}
                      </p>
                    )}
                </div>


                <div className="space-y-8 pt-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                        Caste
                      </label>
                      <input
                        type="text"
                        name="caste"
                        value={formData.caste}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 font-poppins"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 appearance-none font-poppins"
                      >
                        <option value="">Select Category</option>
                        <option value="general">General</option>
                        <option value="obc">OBC</option>
                        <option value="sc">SC</option>
                        <option value="st">ST</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                      Nationality *
                    </label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 ${validationErrors.nationality ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 font-poppins`}
                      required
                    />
                    {validationErrors.nationality && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-poppins">
                        <AlertCircle className="w-4 h-4" /> {validationErrors.nationality}
                      </p>
                    )}
                  </div>

                  {/* Checkbox Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        name="isOrphan"
                        checked={formData.isOrphan}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#0A2463] border-gray-300 rounded focus:ring-[#0A2463]"
                      />
                      <span className="text-sm text-gray-700 font-poppins">Orphan Student</span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        name="hasDisability"
                        checked={formData.hasDisability}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#0A2463] border-gray-300 rounded focus:ring-[#0A2463]"
                      />
                      <span className="text-sm text-gray-700 font-poppins">Specially Abled Student</span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        name="isMinority"
                        checked={formData.isMinority}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#0A2463] border-gray-300 rounded focus:ring-[#0A2463]"
                      />
                      <span className="text-sm text-gray-700 font-poppins">Minority</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="academic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Inika', serif" }}>
                Academic Profile
              </h2>
              <p className="text-gray-600 font-poppins">Your educational background</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 gap-y-10">
              {/* School Information */}
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                    School Name *
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 ${validationErrors.schoolName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 font-poppins`}
                    required
                  />
                  {validationErrors.schoolName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-poppins">
                      <AlertCircle className="w-4 h-4" /> {validationErrors.schoolName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                    College Name (if 12th pass)
                  </label>
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 font-poppins"
                  />
                </div>
              </div>

              {/* Academic Performance */}
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                      10th Pass Year *
                    </label>
                    <input
                      type="number"
                      name="tenthPassYear"
                      value={formData.tenthPassYear}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 ${validationErrors.tenthPassYear ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 font-poppins`}
                      required
                    />
                    {validationErrors.tenthPassYear && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-poppins">
                        <AlertCircle className="w-4 h-4" /> {validationErrors.tenthPassYear}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                      12th Pass Year
                    </label>
                    <input
                      type="number"
                      name="twelfthPassYear"
                      value={formData.twelfthPassYear}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 font-poppins"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                      10th Percentage *
                    </label>
                    <input
                      type="number"
                      name="tenthPercentage"
                      value={formData.tenthPercentage}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 ${validationErrors.tenthPercentage ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 font-poppins`}
                      step="0.01"
                      min="0"
                      max="100"
                      required
                    />
                    {validationErrors.tenthPercentage && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-poppins">
                        <AlertCircle className="w-4 h-4" /> {validationErrors.tenthPercentage}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                      12th Percentage
                    </label>
                    <input
                      type="number"
                      name="twelfthPercentage"
                      value={formData.twelfthPercentage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 font-poppins"
                      step="0.01"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <label className="flex items-center space-x-3 cursor-pointer group p-4 border-2 border-gray-300 rounded-lg hover:border-[#0A2463] hover:bg-blue-50 transition-all duration-300">
                    <div className="relative">
                      <input
                        type="checkbox"
                        name="isDiplomaStudent"
                        checked={formData.isDiplomaStudent}
                        onChange={handleInputChange}
                        className="w-6 h-6 opacity-0 absolute cursor-pointer"
                      />
                      <div className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all duration-300 ${
                        formData.isDiplomaStudent 
                          ? 'bg-[#0A2463] border-[#0A2463]' 
                          : 'border-gray-300 group-hover:border-[#0A2463]'
                      }`}>
                        {formData.isDiplomaStudent && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-gray-700 font-poppins font-medium group-hover:text-[#0A2463] transition-colors duration-300">
                      Already a diploma student?
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="financial"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Inika', serif" }}>
                Financial Details
              </h2>
              <p className="text-gray-600 font-poppins">Your family's financial information</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-3xl mx-auto">
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                    Annual Family Income (INR) *
                  </label>
                  <input
                    type="number"
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 border-2 ${validationErrors.annualIncome ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 text-xl font-bold font-poppins`}
                    required
                  />
                  {validationErrors.annualIncome && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-poppins">
                      <AlertCircle className="w-4 h-4" /> {validationErrors.annualIncome}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 font-poppins">
                    Number of Family Members *
                  </label>
                  <input
                    type="number"
                    name="familyMembers"
                    value={formData.familyMembers}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 border-2 ${validationErrors.familyMembers ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-[#0A2463] transition-all duration-300 text-xl font-bold font-poppins`}
                    min="1"
                    required
                  />
                  {validationErrors.familyMembers && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-poppins">
                      <AlertCircle className="w-4 h-4" /> {validationErrors.familyMembers}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-2xl p-8 text-center">
                  <DollarSign className="w-16 h-16 text-[#0A2463] mx-auto mb-4" />
                  <h3 className="font-poppins font-semibold text-gray-900 text-lg mb-2">
                    Financial Assistance
                  </h3>
                  <p className="text-gray-600 font-poppins">
                    Based on your financial details, we'll match you with suitable scholarship opportunities
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="others"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Inika', serif" }}>
                Just a few more questions
              </h2>
              <p className="text-gray-600 font-poppins">Help us understand your background better</p>
            </div>

            <div className="space-y-8 max-w-2xl mx-auto">
              {[
                {
                  name: 'hasFarmerFamily',
                  label: 'Is any of your family member a farmer?',
                  description: 'This helps identify agricultural scholarships'
                },
                {
                  name: 'hasMilitaryFamily',
                  label: 'Is any of your family member a military officer?',
                  description: 'Eligibility for defense-related scholarships'
                },
                {
                  name: 'hasCovidVictimFamily',
                  label: 'Is any of your family member a victim of COVID-19?',
                  description: 'Special consideration for pandemic-affected families'
                }
              ].map((question, index) => (
                <motion.div
                  key={question.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <label className="flex items-center justify-between p-6 border-2 border-gray-300 rounded-2xl cursor-pointer hover:border-[#0A2463] hover:bg-blue-50 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <HelpCircle className="w-5 h-5 text-[#0A2463]" />
                      </div>
                      <div>
                        <h3 className="font-poppins font-semibold text-gray-900 text-lg">
                          {question.label}
                        </h3>
                        <p className="text-sm text-gray-500 font-poppins mt-1">{question.description}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        name={question.name}
                        checked={formData[question.name]}
                        onChange={handleInputChange}
                        className="w-6 h-6 opacity-0 absolute cursor-pointer"
                      />
                      <div className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all duration-300 ${
                        formData[question.name] 
                          ? 'bg-[#0A2463] border-[#0A2463]' 
                          : 'border-gray-300 group-hover:border-[#0A2463]'
                      }`}>
                        {formData[question.name] && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </label>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

const animatePlane = () => {
    setIsAnimating(true);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 800);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setIsAnimating(false);
    }, 1200);
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20"
    >
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inika:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap');
        .font-inika { font-family: 'Inika', serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>

        {isAnimating && (
        <motion.div
          ref={planeRef}
          className="fixed z-50 pointer-events-none"
          initial={{ x: 0, y: "100vh", rotate: -45 }}
          animate={{
            x: ["0%", "50%", "100%"],
            y: ["100vh", "50vh", "0vh"],
            rotate: [-45, 0, 45]
          }}
          transition={{
            duration: 1.2,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        >
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 19L21 5M21 5L14 21L10 15L3 9L21 5Z"
              stroke="#0A2463"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        
      )}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        {/* Header */}
        <LoginHeader backRedirect = "/home" />
        <header className="mb-16 lex items-center justify-between">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-inika">
            <br></br>
            Ready, Set, Match!
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-[#0A2463]/20 to-transparent w-1/3"></div>
          <div className="font-inika font-normal text-lg lg:text-xl leading-[140%] tracking-[-0.1px] text-[#5E6B7C] max-w-3xl">
            <h6>It would just take a few minutes to help us know more about you!</h6>
          </div>
        </header>

        {/* Progress Steps */}
        <div className="mb-16">
          <div className="flex items-center justify-start space-x-16 relative">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;

              return (
                <motion.div
                  key={step.id}
                  whileHover={{ scale: isActive || isCompleted ? 1.05 : 1 }}
                  className="flex items-center space-x-4 relative z-10"
                >
                  <div className={`
                    w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 border-2
                    ${isCompleted ? 'bg-[#0A2463] text-white border-[#0A2463] shadow-lg' : ''}
                    ${isActive ? 'bg-white text-[#0A2463] border-[#0A2463] shadow-xl' : ''}
                    ${!isActive && !isCompleted ? 'bg-gray-100 text-gray-400 border-gray-300' : ''}
                  `}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <StepIcon className="w-6 h-6" />
                    )}
                  </div>
                  
                  <div>
                    <p className={`font-poppins font-medium transition-all duration-300 ${
                      isActive ? 'text-[#0A2463] text-lg' : 
                      isCompleted ? 'text-gray-900' : 
                      'text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                    <div className={`h-1 w-24 mt-2 rounded-full transition-all duration-500 ${
                      isCompleted ? 'bg-[#0A2463]' : 
                      isActive ? 'bg-[#0A2463]/50' : 
                      'bg-gray-200'
                    }`} />
                  </div>
                  
                  {/* Connection line */}
                  {index < steps.length - 1 && (
                    <div className={`
                      absolute left-28 top-7 w-20 h-0.5 -z-10 transition-all duration-500
                      ${step.id < currentStep ? 'bg-[#0A2463]' : 'bg-gray-200'}
                    `} />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Main Form Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <div className="bg-white/80 rounded-3xl border-2 border-gray-200 shadow-xl p-8 lg:p-12">
              {renderFormSection()}
            </div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <motion.div 
          className="mt-16 flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex items-center gap-3 px-8 py-4 rounded-xl transition-all font-poppins font-medium ${
              currentStep === 1 
                ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-lg'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </motion.button>

          {currentStep < steps.length ? (
            <motion.button
              whileHover={isCurrentStepValid() ? { scale: 1.05 } : {}}
              whileTap={isCurrentStepValid() ? { scale: 0.95 } : {}}
              onClick={handleNext}
              disabled={!isCurrentStepValid()}
              className={`group relative px-12 py-4 rounded-xl font-poppins font-semibold text-lg transition-all duration-300 overflow-hidden ${
                isCurrentStepValid()
                  ? 'bg-[#0A2463] text-white hover:shadow-2xl hover:shadow-[#0A2463]/30'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {/* Magnetic hover effect background */}
              {isCurrentStepValid() && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A2463] to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
              
              <span className="relative flex items-center gap-3">
                {isCurrentStepValid() ? 'Next Step' : 'Complete All Fields'}
                {isCurrentStepValid() && (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                )}
              </span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="px-12 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-poppins font-semibold text-lg hover:shadow-2xl hover:shadow-emerald-600/30 transition-all duration-300"
            >
              Complete Registration
            </motion.button>
          )}
        </motion.div>

        {/* Progress Indicator */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <p className="font-poppins text-gray-600">
              Step {currentStep} of {steps.length}
            </p>
            <span className="text-gray-400">•</span>
            <p className="font-poppins text-[#0A2463] font-semibold">
              {Math.round((currentStep / steps.length) * 100)}% Complete
            </p>
          </div>
          <div className="w-full max-w-2xl mx-auto bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-[#0A2463] to-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmersiveRegistration;