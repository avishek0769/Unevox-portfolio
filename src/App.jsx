import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BookCallModal from './components/BookCallModal';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import About from './pages/About';
import Portfolio from './pages/Portfolio';

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
    <div className="min-h-[75vh] flex items-center justify-center pt-24 pb-16 dot-grid relative bg-[#f8f5f2]">
      <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
        <div className="section-badge mb-6 inline-flex animate-pulse-subtle">
          Page Under Construction
        </div>
        <h1 className="font-display text-5xl font-bold tracking-tight text-[#072541] mb-4">
          {title} Page
        </h1>
        <p className="text-[#4a5568] text-lg leading-relaxed mb-8">
          This section is currently under development. Please check back soon or book a free call to get in touch.
        </p>
        <Link
          to="/"
          className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-base"
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
          <Route path="/about" element={<About title="About" />} />
          <Route path="/services" element={<ComingSoonPlaceholder title="Services" />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/achievements" element={<ComingSoonPlaceholder title="Achievements" />} />
          <Route path="/blogs" element={<ComingSoonPlaceholder title="Blogs" />} />
          <Route path="/contact" element={<ComingSoonPlaceholder title="Contact" />} />

          {/* Fallback route */}
          <Route path="*" element={<ComingSoonPlaceholder title="Page Not Found" />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer onBookCall={handleOpenModal} />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918617228753"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 hover:scale-110 active:scale-95 transition-all duration-300 drop-shadow-lg whatsapp-shake"
        aria-label="Chat on WhatsApp"
      >
        <img
          src="/WhatsApp-logo.webp"
          alt="WhatsApp"
          className="w-full h-full object-contain"
        />
      </a>

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
