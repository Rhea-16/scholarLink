import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { CheckCircle, Search, Upload, Target, Award, Users, Building, Percent, ChevronRight, Sparkles, Shield, Zap, Clock, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Index({ 
  scrollToAbout, 
  scrollToTopScholarships, 
  scrollToHowItWorks 
}) {
  const [counters, setCounters] = useState({
    students: 0,
    scholarships: 0,
    institutions: 0,
    success: 0
  });

  // Create refs for each section
  const aboutRef = useRef(null);
  const topScholarshipsRef = useRef(null);
  const howItWorksRef = useRef(null);
  const whyChooseRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => ({
        students: Math.min(prev.students + 250, 12500),
        scholarships: Math.min(prev.scholarships + 174, 8700),
        institutions: Math.min(prev.institutions + 8, 320),
        success: Math.min(prev.success + 2.4, 95)
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Scroll functions that will be passed to Header
  const handleScrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToTopScholarships = () => {
    topScholarshipsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30">
      {/* Pass scroll functions to Header */}
      <Header 
        scrollToAbout={handleScrollToAbout}
        scrollToTopScholarships={handleScrollToTopScholarships}
        scrollToHowItWorks={handleScrollToHowItWorks}
      />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-12 lg:py-16 px-4 lg:px-8 overflow-hidden">
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

          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 text-blue-700 text-sm font-semibold mb-6 shadow-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Trusted by 12,500+ Students
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-poppins font-semibold text-3xl lg:text-5xl leading-[140%] tracking-[-0.25px] mb-6"
            >
              <span className="text-black block">Find the Right Scholarship</span>
              <span className="relative">
                <span className="text-[#0A2463] bg-gradient-to-r from-blue-600/10 to-indigo-600/10 px-4 py-1 rounded-xl">
                  for Your Future
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-inika font-normal text-lg lg:text-xl leading-[140%] tracking-[-0.1px] text-[#5E6B7C] max-w-3xl mx-auto mb-8"
            >
              Unified Scholarship Discovery & Application Portal for Financially Needy Students.
              Discover, apply, and track scholarships from government bodies, 
              NGOs, CSR programs, and private organizations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <Link
                to="./Signup"
                className="group inline-flex items-center justify-center bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] text-white font-inter font-bold text-base lg:text-lg leading-[140%] px-10 py-4 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="mr-2">Get Started Today</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section 
          ref={aboutRef} 
          id="about"
          className="scroll-mt-16 py-12 lg:py-16 px-4 lg:px-8 bg-white/50 backdrop-blur-sm"
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div>
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="font-poppins font-semibold text-2xl lg:text-3xl leading-[140%] tracking-[-0.15px] text-[#1E293B] mb-6"
                >
                  About ScholarLink
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="font-inter font-normal text-base lg:text-lg leading-[140%] tracking-[-0.08px] text-[#475569] mb-8"
                >
                  We are a comprehensive scholarship discovery and application platform dedicated to helping financially needy students access educational opportunities. Our mission is to bridge the gap between deserving students and available funding sources.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to="/scholarships"
                    className="group inline-flex items-center border-3 border-[#1E293B] text-[#0A2463] font-inter font-bold text-base lg:text-lg leading-[140%] px-8 py-3 rounded-xl hover:bg-[#1E293B] hover:text-white transition-all duration-300"
                  >
                    Find Scholarships
                    <Target className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4 lg:gap-6"
              >
                <StatsCard 
                  number={Math.round(counters.students).toLocaleString() + "+"} 
                  label="Students Helped" 
                  icon={<Users className="w-6 h-6" />}
                  delay={0}
                />
                <StatsCard 
                  number={Math.round(counters.scholarships).toLocaleString() + "+"} 
                  label="Scholarships Listed" 
                  icon={<FileText className="w-6 h-6" />}
                  delay={0.1}
                />
                <StatsCard 
                  number={Math.round(counters.institutions)} 
                  label="Partner Institutions" 
                  icon={<Building className="w-6 h-6" />}
                  delay={0.2}
                />
                <StatsCard 
                  number={Math.round(counters.success) + "%"} 
                  label="Success Rate" 
                  icon={<Percent className="w-6 h-6" />}
                  delay={0.3}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section 
          ref={whyChooseRef}
          id="why-choose"
          className="py-12 lg:py-16 px-4 lg:px-8 bg-gradient-to-b from-white to-blue-50/20"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <motion.div 
                className="order-2 lg:order-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <FeatureList />
              </motion.div>
              <motion.div 
                className="order-1 lg:order-2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="font-poppins font-semibold text-2xl lg:text-3xl leading-[140%] tracking-[-0.15px] text-[#1E293B] mb-6">
                  Why Choose ScholarLink?
                </h2>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <p className="font-inter font-normal text-base text-[#475569] mb-4">
                    We combine cutting-edge technology with human expertise to deliver the best scholarship matching experience.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-blue-600">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span>AI-Powered Matching</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>Secure & Verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Top Scholarships Section */}
        <section 
          ref={topScholarshipsRef}
          id="top-scholarships"
          className="scroll-mt-16 py-12 lg:py-16 px-4 lg:px-8 bg-white"
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="font-poppins font-semibold text-2xl lg:text-3xl leading-[140%] tracking-[-0.15px] text-[#1E293B] mb-4">
                Top Scholarships We've Helped Secure
              </h2>
              <p className="font-inter font-normal text-base leading-[140%] tracking-[-0.08px] text-[#64748B] max-w-2xl mx-auto">
                These are some of the most successful scholarships our students
                have received through our platform
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
              <ScholarshipCard
                foundation="Infosys Foundation"
                type="Corporate Scholarship"
                amount="₹ 1,00,000"
                title="Infosys Merit Scholarship"
                description="For engineering & computer science students
Minimum 85% in previous year
Preference to economically weaker sections"
                studentsHelped="1,240+ students helped"
                icon={<Building className="w-6 h-6" />}
                delay={0}
              />
              <ScholarshipCard
                foundation="National Scholarship Portal"
                type="Government of India"
                amount="₹ 50,000/year"
                title="Post Matric Scholarship for SC/ST"
                description="For SC/ST students pursuing higher education
Family income below ₹2.5 lakhs
Covers tuition fees + maintenance allowance"
                studentsHelped="1,240+ students helped"
                icon={<Shield className="w-6 h-6" />}
                delay={0.1}
              />
              <ScholarshipCard
                foundation="Reliance Foundation"
                type="NGO Scholarship"
                amount="₹ 75,000/year"
                title="Education for All"
                description="For students from low-income families
Minimum 75% marks required
All courses eligible (UG/PG/Diploma)"
                studentsHelped="1,240+ students helped"
                icon={<Award className="w-6 h-6" />}
                delay={0.2}
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link
                to="/scholarships"
                className="group inline-flex items-center bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] text-white font-inter font-bold text-base lg:text-lg leading-[140%] px-10 py-4 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Browse All Scholarships
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section 
          ref={howItWorksRef}
          id="how-it-works"
          className="scroll-mt-16 py-12 lg:py-16 px-4 lg:px-8 bg-gradient-to-b from-white to-blue-50/30"
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-poppins font-semibold text-2xl lg:text-3xl leading-[140%] tracking-[-0.15px] text-[#1E293B] mb-4">
                How ScholarLink Works
              </h2>
              <p className="font-inter font-normal text-base leading-[140%] tracking-[-0.08px] text-[#64748B] max-w-2xl mx-auto">
                Our simple 4-step process makes scholarship discovery and
                application effortless
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden lg:block absolute top-12 left-20 right-20 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-200" />
              
              <ProcessStep
                number="1"
                title="Create Profile"
                description="Fill in your academic details, category, income, and other eligibility criteria in our secure platform."
                icon={<Users className="w-8 h-8" />}
                delay={0}
              />
              <ProcessStep
                number="2"
                title="Get Matched"
                description="Our AI algorithm matches you with scholarships that fit your profile and eligibility criteria."
                icon={<Target className="w-8 h-8" />}
                delay={0.1}
              />
              <ProcessStep
                number="3"
                title="Upload Documents"
                description="Securely upload required documents like marksheets, income certificates, and identification proof."
                icon={<Upload className="w-8 h-8" />}
                delay={0.2}
              />
              <ProcessStep
                number="4"
                title="Apply and Track"
                description="Submit applications with guided assistance and track your progress through our dashboard."
                icon={<CheckCircle className="w-8 h-8" />}
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 blur-2xl rounded-3xl" />
              
              <div className="relative bg-white rounded-2xl border-2 border-blue-100 p-8 lg:p-12 shadow-lg">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="font-inter font-semibold text-2xl lg:text-3xl leading-[140%] tracking-[-0.15px] text-black mb-6"
                >
                  Ready to Find Your Perfect Scholarship?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="font-inter font-normal text-base lg:text-lg leading-[140%] tracking-[-0.09px] text-[#64748B] max-w-2xl mx-auto mb-8"
                >
                  Join thousands of students who have already found financial
                  support for their education
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
                    className="group inline-flex items-center justify-center bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] text-white font-inter font-bold text-base lg:text-lg leading-[140%] px-10 py-4 rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Join ScholarLink
                    <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-180 transition-all duration-300" />
                  </Link>
                  <Link
                    to="/demo"
                    className="group inline-flex items-center justify-center border-2 border-[#0A2463] text-[#0A2463] font-inter font-bold text-base lg:text-lg leading-[140%] px-10 py-4 rounded-xl hover:bg-[#0A2463] hover:text-white transition-all duration-300"
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
}

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
      <div className="font-inter font-bold text-xl lg:text-2xl leading-[140%] tracking-[-0.12px] text-[#1E3A8A] mb-2">
        {number}
      </div>
      <div className="font-inter font-normal text-sm lg:text-base leading-[140%] tracking-[-0.07px] text-[#475569]">
        {label}
      </div>
    </motion.div>
  );
}

function FeatureList() {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Scholarships",
      description: "All scholarships are verified from authentic government and organizational sources"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Smart Matching",
      description: "AI-powered recommendations based on your profile and eligibility criteria"
    },
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Document Management",
      description: "Secure document storage with easy upload and verification process"
    }
  ];

  return (
    <div className="space-y-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ x: 5 }}
          className="flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300"
        >
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600">
              {feature.icon}
            </div>
          </div>
          <div>
            <h3 className="font-inter font-semibold text-lg leading-[140%] text-[#1E293B] mb-1">
              {feature.title}
            </h3>
            <p className="font-inter font-normal text-base leading-[140%] tracking-[-0.08px] text-[#475569]">
              {feature.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ScholarshipCard({ foundation, type, amount, title, description, studentsHelped, icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="border border-[#64748B] rounded-2xl p-6 flex flex-col h-full bg-white hover:shadow-xl hover:border-blue-300 transition-all duration-300"
    >
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 mb-2">
          <div className="text-blue-600">
            {icon}
          </div>
          <h3 className="font-inter font-semibold text-base leading-[140%] tracking-[-0.08px] text-[#0A2463]">
            {foundation}
          </h3>
        </div>
        <p className="font-inter font-normal text-sm leading-[140%] tracking-[-0.07px] text-[#64748B]">
          {type}
        </p>
      </div>
      <div className="border-t border-[#64748B]/30 pt-4 mb-6 flex-grow">
        <div className="font-inter font-bold text-xl leading-[140%] tracking-[-0.1px] text-[#0A2463] text-center mb-4">
          {amount}
        </div>
        <h4 className="font-inter font-medium text-lg leading-[140%] tracking-[-0.09px] text-[#1E293B] mb-4">
          {title}
        </h4>
        <p className="font-inter font-medium text-sm leading-[140%] tracking-[-0.07px] text-[#475569] whitespace-pre-line">
          {description}
        </p>
      </div>
      <div className="mt-auto">
        <motion.div 
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-green-50 rounded-lg p-3 mb-4"
        >
          <p className="font-inter font-semibold text-sm leading-[140%] tracking-[-0.07px] text-[#10B981] text-center">
            {studentsHelped}
          </p>
        </motion.div>
        <Link
          to="/apply"
          className="group block w-full bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] text-white font-inter font-semibold text-sm leading-[140%] tracking-[-0.07px] text-center py-3 rounded-lg hover:shadow-lg transition-all duration-300"
        >
          <span className="flex items-center justify-center">
            Apply Now
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
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
          <span className="font-inter font-bold text-lg text-white">
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
        <p className="font-inter font-normal text-sm leading-[140%] tracking-[-0.07px] text-[#475569]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}