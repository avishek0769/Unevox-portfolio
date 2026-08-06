import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BookCallModal from './components/BookCallModal';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

// Scroll to top helper on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// Beautiful Placeholder for unfinished pages
function ComingSoonPlaceholder({ title }) {
  return (
    <div className="min-h-[75vh] flex items-center justify-center pt-24 pb-16 sports-grid-pattern relative">
      <div className="absolute inset-0 radial-glow-green pointer-events-none" />
      <div className="absolute inset-0 radial-glow-cyan pointer-events-none" />
      
      <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-volt/30 bg-volt/10 text-volt font-display text-[10px] font-bold uppercase tracking-wider mb-6 animate-pulse-subtle">
          <Sparkles className="w-3.5 h-3.5" />
          Page Construction
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          {title} Page
        </h1>
        <p className="text-text-secondary text-base leading-relaxed mb-8">
          This section is currently under development as part of our incremental project plan. Please check back soon or book a free call to get in touch.
        </p>
        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-sm text-obsidian bg-volt hover:bg-volt-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-obsidian text-text-primary selection:bg-volt selection:text-obsidian">
      {/* Scroll reset */}
      <ScrollToTop />

      {/* Primary Sticky Header */}
      <Navbar onBookCall={handleOpenModal} />

      {/* Main Pages Outlet */}
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home onBookCall={handleOpenModal} />} />
          
          {/* Temporary placeholder pages */}
          <Route path="/about" element={<ComingSoonPlaceholder title="About" />} />
          <Route path="/services" element={<ComingSoonPlaceholder title="Services" />} />
          <Route path="/portfolio" element={<ComingSoonPlaceholder title="Portfolio" />} />
          <Route path="/achievements" element={<ComingSoonPlaceholder title="Achievements" />} />
          <Route path="/blogs" element={<ComingSoonPlaceholder title="Blogs" />} />
          <Route path="/contact" element={<ComingSoonPlaceholder title="Contact" />} />
          
          {/* Fallback route */}
          <Route path="*" element={<ComingSoonPlaceholder title="Page Not Found" />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer onBookCall={handleOpenModal} />

      {/* Consultation Request Modal */}
      <BookCallModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
