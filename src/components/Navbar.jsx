import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PhoneCall } from 'lucide-react';

export default function Navbar({ onBookCall }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav
      className="sticky top-0 z-40 bg-white border-b border-[#e2dbd3] shadow-sm py-1"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/unevox_logo.png"
            alt="Unevox Logo"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-display text-sm font-semibold tracking-wide transition-colors duration-200 ${isActive(link.path)
                ? 'text-primary border-b-2 border-primary pb-0.5'
                : 'text-[#072541] hover:text-primary'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={onBookCall}
            className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2 cursor-pointer shadow-md shadow-primary/20"
          >
            <PhoneCall className="w-4 h-4" />
            Book Free Call
          </button>
        </div>

        {/* Mobile controls */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={onBookCall}
            className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            aria-label="Book Call"
          >
            <PhoneCall className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-secondary border border-[#e2dbd3] bg-white hover:bg-[#f1ede8] transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-[280px] z-50 bg-white border-l border-[#e2dbd3] shadow-2xl p-6 transition-transform duration-300 lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#e2dbd3]">
          <img src="/unevox_logo.png" alt="Unevox" className="h-9 w-auto" />
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-[#f1ede8] text-[#4a5568]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`font-display text-base font-semibold transition-all py-1 ${isActive(link.path)
                ? 'text-primary border-l-2 border-primary pl-3'
                : 'text-secondary hover:text-primary hover:pl-2'
                }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-5 mt-4 border-t border-[#e2dbd3]">
            <button
              onClick={() => { setIsOpen(false); onBookCall(); }}
              className="btn-primary w-full py-3 flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              Book Free Call
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
