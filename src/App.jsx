import "./global.css";

import { Toaster } from "./components/ui/toaster.jsx";
import { Toaster as Sonner } from "./components/ui/sonner.jsx";
import { TooltipProvider } from "./components/ui/tooltip.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "../src/pages/public/index.jsx";
import NotFound from "../src/pages/public/NotFound.jsx";
import PlaceholderPage from "../src/pages/public/PlaceholderPage.jsx";
import Login from "../src/pages/auth/Login.jsx";
import SignUpPage from "../src/pages/auth/Sign-up.jsx";
import AllScholarships from "../src/pages/public/all-scholarships.jsx";
import AllScholarshipsMain from "../src/pages/public/all-scholarships-dashboard.jsx";
import HomePage from "../src/pages/dashboard/home.jsx";
import UnlockedDashboard from "../src/pages/dashboard/dashboard.jsx";
import { isAuthenticated } from "./utils/auth";
import { Navigate } from "react-router-dom";
import ImmersiveRegistration from "../src/pages/dashboard/registration.jsx";
import CompleteProfile from "../src/pages/dashboard/complete_profile.jsx";
// import MahaDBTPDFCompressor from "../src/documents/compressor"

const queryClient = new QueryClient();

// Wrapper component to handle hash navigation
function HashHandler({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Only run on homepage
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure component is fully rendered
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
          
          // Clear hash from URL after scrolling
          window.history.replaceState(null, "", window.location.pathname);
        }, 100);
      }
    }
  }, [location]);

  return children;
}

// Homepage wrapper to pass scroll functions
function HomePageWrapper() {
  // Scroll functions for the homepage
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTopScholarships = () => {
    const element = document.getElementById("top-scholarships");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Index
      scrollToAbout={scrollToAbout}
      scrollToTopScholarships={scrollToTopScholarships}
      scrollToHowItWorks={scrollToHowItWorks}
    />
  );
}

// Scholarships page wrapper
function ScholarshipsPageWrapper() {
  // These functions won't be used on scholarships page, but we need to pass something
  // The Header component will handle navigation to homepage with hashes
  return <AllScholarships />;
}

// Placeholder pages wrapper (for consistency)
function PlaceholderPageWrapper({ title }) {
  return (
    <PlaceholderPage
      title={title}
      scrollToAbout={null}
      scrollToTopScholarships={null}
      scrollToHowItWorks={null}
    />
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <HashHandler>
            <Routes>
              <Route path="/" element={<HomePageWrapper />} />
              <Route path="/scholarships" element={<ScholarshipsPageWrapper />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/home" element={ isAuthenticated() ? <HomePage /> : <Navigate to="/login" />} />
              <Route path="/all-scholarships" element={ isAuthenticated() ? <AllScholarshipsMain /> : <Navigate to="/scholarships" />} />
              <Route path="/registration" element={isAuthenticated() ? <ImmersiveRegistration />: <Navigate to="/home"/>} />
              <Route path="/dashboard" element={isAuthenticated() ? <UnlockedDashboard />: <Navigate to="/home"/>} />
              {/* <Route path="/saved" element={<SavedScholarship />} /> */}
              <Route path="/profile-completion" element={<CompleteProfile />} />
              {/* <Route path="/compressor" element={<MahaDBTPDFCompressor />} /> */}
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}       
              {/* Placeholder pages */}
              <Route 
                path="/apply" 
                element={<PlaceholderPageWrapper title="Apply" />} 
              />
              <Route 
                path="/partners" 
                element={<PlaceholderPageWrapper title="Our Partners" />} 
              />
              <Route 
                path="/guide" 
                element={<PlaceholderPageWrapper title="Scholarship Guide" />} 
              />
              <Route 
                path="/checklist" 
                element={<PlaceholderPageWrapper title="Document Checklist" />} 
              />
              <Route 
                path="/tips" 
                element={<PlaceholderPageWrapper title="Application Tips" />} 
              />
              <Route 
                path="/success" 
                element={<PlaceholderPageWrapper title="Success Stories" />} 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashHandler>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}